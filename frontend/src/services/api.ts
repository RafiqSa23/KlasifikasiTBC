import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '30000');

export interface PredictionResult {
  success: boolean;
  filename: string;
  predicted_class: string;
  confidence: number;
  confidence_percentage: string;
  probabilities: Record<string, number>;
}

export interface HealthCheck {
  status: string;
  model_loaded: boolean;
  classes: string[];
}

export interface ModelInfo {
  model: string;
  classes: string[];
  input_size: string;
  framework: string;
}

const api = axios.create({
  baseURL: API_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Interceptor untuk menangani error
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      throw new Error(error.response.data.error || 'Server error');
    } else if (error.request) {
      throw new Error('Cannot connect to server. Please check if backend is running.');
    } else {
      throw new Error('An error occurred. Please try again.');
    }
  }
);

export const ApiService = {
  // Health check
  healthCheck: async (): Promise<HealthCheck> => {
    const response = await api.get('/health');
    return response.data;
  },

  // Get model info
  getModelInfo: async (): Promise<ModelInfo> => {
    const response = await api.get('/model-info');
    return response.data;
  },

  // Predict image
  predict: async (file: File): Promise<PredictionResult> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/predict', formData);
    return response.data;
  },

  // Get base URL
  getBaseUrl: (): string => {
    return API_URL;
  }
};

export default ApiService;