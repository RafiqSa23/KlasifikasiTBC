import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud, FiX } from "react-icons/fi";
import "./UploadArea.css";

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
  onRemove: () => void;
  preview: string | null;
  error: string | null;
}

const UploadArea: React.FC<UploadAreaProps> = ({
  onFileSelect,
  onRemove,
  preview,
  error,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
    maxSize: 16 * 1024 * 1024, // 16MB
  });

  return (
    <div className="upload-container">
      {!preview ? (
        <div
          {...getRootProps()}
          className={`dropzone ${isDragActive ? "active" : ""} ${
            error ? "error" : ""
          }`}
        >
          <input {...getInputProps()} />
          <FiUploadCloud className="upload-icon" />
          <h3>Click to Upload or Drag & Drop</h3>
          <p>Supported formats: JPG, PNG, JPEG (Max 16MB)</p>
          {error && <div className="upload-error">{error}</div>}
        </div>
      ) : (
        <div className="preview-container">
          <div className="preview-header">
            <h4>Image Preview</h4>
            <button className="btn-reset" onClick={onRemove} type="button">
              <FiX /> Remove
            </button>
          </div>
          <img src={preview} alt="Preview" className="preview-image" />
        </div>
      )}
    </div>
  );
};

export default UploadArea;
