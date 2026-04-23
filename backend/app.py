import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from flask import Flask, request, jsonify
from flask_cors import CORS 
from werkzeug.utils import secure_filename
import cv2
import json
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Konfigurasi dari .env
app.config['MAX_CONTENT_LENGTH'] = int(os.getenv('MAX_CONTENT_LENGTH', 16 * 1024 * 1024))
app.config['UPLOAD_FOLDER'] = os.getenv('UPLOAD_FOLDER', 'uploads')
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif'}

# Port dan host dari .env
PORT = int(os.getenv('FLASK_PORT', 5000))
HOST = os.getenv('FLASK_HOST', '0.0.0.0')
DEBUG = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'

# Buat folder upload
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Load model
print("Loading model...")
model_path = os.getenv('MODEL_PATH', 'model/mobilenetv2_tb_final.h5')
model = load_model(model_path)
print("✅ Model loaded successfully!")
# Load class indices
with open('class_indices.json', 'r') as f:
    class_indices = json.load(f)
idx_to_class = {v: k for k, v in class_indices.items()}

print(f"Classes: {class_indices}")

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

def preprocess_image(image_path, target_size=(224, 224)):
    """Preprocessing gambar untuk prediksi"""
    img = cv2.imread(image_path)
    if img is None:
        return None
    
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img_resized = cv2.resize(img_rgb, target_size)
    img_normalized = img_resized / 255.0
    img_batch = np.expand_dims(img_normalized, axis=0)
    
    return img_batch

@app.route('/')
def home():
    return jsonify({
        'message': 'TB Detection API',
        'status': 'running',
        'endpoints': ['/predict', '/health', '/model-info']
    })

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({'error': 'File type not allowed. Please upload JPG, PNG, or JPEG'}), 400
    
    try:
        # Simpan file
        filename = secure_filename(file.filename)
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        unique_filename = f"{timestamp}_{filename}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
        file.save(filepath)
        
        # Preprocessing
        img_batch = preprocess_image(filepath)
        if img_batch is None:
            return jsonify({'error': 'Failed to process image'}), 500
        
        # Prediksi
        predictions = model.predict(img_batch, verbose=0)[0]
        predicted_idx = np.argmax(predictions)
        predicted_class = idx_to_class[predicted_idx]
        confidence = float(predictions[predicted_idx])
        
        # Probabilities
        probabilities = {}
        for i, prob in enumerate(predictions):
            probabilities[idx_to_class[i]] = float(prob)
        
        # Hapus file
        os.remove(filepath)
        
        return jsonify({
            'success': True,
            'filename': filename,
            'predicted_class': predicted_class,
            'confidence': confidence,
            'confidence_percentage': f"{confidence:.2%}",
            'probabilities': probabilities
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'model_loaded': True,
        'classes': list(class_indices.keys())
    })

@app.route('/model-info', methods=['GET'])
def model_info():
    return jsonify({
        'model': 'MobileNetV2',
        'classes': list(class_indices.keys()),
        'input_size': '224x224',
        'framework': 'TensorFlow'
    })

if __name__ == '__main__':
    print("="*60)
    print("🚀 TB Detection API Server")
    print("="*60)
    print(f"\n📊 Model: MobileNetV2")
    print(f"📁 Classes: {class_indices}")
    print(f"\n🌐 Server running on: http://{HOST}:{PORT}")
    print(f"🔗 API Endpoints:")
    print(f"   - GET  /          : API Info")
    print(f"   - GET  /health    : Health check")
    print(f"   - GET  /model-info : Model info")
    print(f"   - POST /predict   : Prediction")
    print("\n⚠️  Press Ctrl+C to stop")
    print("="*60)
    
    app.run(debug=DEBUG, host=HOST, port=PORT)