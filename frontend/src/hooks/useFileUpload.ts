import { useState, useCallback } from "react";

interface UseFileUploadReturn {
  file: File | null;
  preview: string | null;
  error: string | null;
  handleFileSelect: (file: File) => void;
  handleRemove: () => void;
  validateFile: (file: File) => boolean;
}

const MAX_FILE_SIZE = 16 * 1024 * 1024; // 16MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const useFileUpload = (): UseFileUploadReturn => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateFile = useCallback((file: File): boolean => {
    // Check file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Invalid file type. Please upload JPG, JPEG, or PNG.");
      return false;
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setError("File too large. Maximum size is 16MB.");
      return false;
    }

    return true;
  }, []);

  const handleFileSelect = useCallback(
    (selectedFile: File) => {
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        setError(null);
      }
    },
    [validateFile]
  );

  const handleRemove = useCallback(() => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setFile(null);
    setPreview(null);
    setError(null);
  }, [preview]);

  return {
    file,
    preview,
    error,
    handleFileSelect,
    handleRemove,
    validateFile,
  };
};
