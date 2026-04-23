import React from "react";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { PredictionResult } from "../types";
import "./ResultCard.css";

interface ResultCardProps {
  result: PredictionResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const { predicted_class, confidence, probabilities } = result;
  const isNormal = predicted_class.toLowerCase() === "normal";

  const confidencePercentage = (confidence * 100).toFixed(1);

  return (
    <div className="result-container">
      <h3>Analysis Results</h3>

      <div className={`result-card ${isNormal ? "normal" : "tb"}`}>
        <div className="prediction-badge">
          {isNormal ? <FiCheckCircle size={24} /> : <FiAlertCircle size={24} />}
          <span>{predicted_class}</span>
        </div>

        <div className="confidence-section">
          <h4>Confidence Level</h4>
          <div className="confidence-bar-container">
            <div
              className="confidence-bar"
              style={{ width: `${confidencePercentage}%` }}
              role="progressbar"
              aria-valuenow={confidencePercentage}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
          <p className="confidence-text">{confidencePercentage}%</p>
        </div>

        <div className="probabilities-section">
          <h4>Detailed Probabilities</h4>
          {Object.entries(probabilities).map(([className, prob]) => {
            const probPercentage = (prob * 100).toFixed(1);
            return (
              <div key={className} className="probability-item">
                <span className="probability-label">{className}</span>
                <div className="probability-bar-container">
                  <div
                    className="probability-bar"
                    style={{ width: `${probPercentage}%` }}
                  ></div>
                </div>
                <span className="probability-value">{probPercentage}%</span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="disclaimer">
        * Hasil ini untuk tujuan penelitian. Selalu konsultasikan dengan tenaga
        medis profesional.
      </p>
    </div>
  );
};

export default ResultCard;
