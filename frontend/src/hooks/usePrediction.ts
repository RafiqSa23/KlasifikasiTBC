import { useState, useCallback } from "react";
import api from "../services/api";
import { PredictionResult } from "@/types";

interface UsePredictionReturn {
  result: PredictionResult | null;
  loading: boolean;
  error: string | null;
  predict: (file: File) => Promise<void>;
  reset: () => void;
}

export const usePrediction = (): UsePredictionReturn => {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const predict = useCallback(async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const data = await api.predict(file);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Prediction failed");
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setLoading(false);
  }, []);

  return { result, loading, error, predict, reset };
};
