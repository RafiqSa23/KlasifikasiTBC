// Tipe untuk hasil prediksi
export interface PredictionResult {
  success: boolean;
  filename: string;
  predicted_class: string;
  confidence: number;
  confidence_percentage: string;
  probabilities: Record<string, number>;
}

// Tipe untuk response API
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
}

// Tipe untuk health check
export interface HealthCheck {
  status: string;
  model_loaded: boolean;
  classes: string[];
}

// Tipe untuk model info
export interface ModelInfo {
  model: string;
  classes: string[];
  input_size: string;
  framework: string;
}

// Tipe untuk error
export interface ApiError {
  error: string;
}
