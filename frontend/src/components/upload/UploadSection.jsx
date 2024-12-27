import React, { useState } from "react";
import "./uploadSection.css";

const LoadingOverlay = () => (
  <div className="loading-overlay">
    <div className="loader-container">
      <div className="loader"></div>
      <p className="loading-text">Processing PDF, This might take a while...</p>
    </div>
  </div>
);

const UploadSection = ({ onFileUpload }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (file) => {
    if (!file) return;
    setLoading(true);
    setError(null);

    try {
      await onFileUpload(file);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {loading && <LoadingOverlay />}
      <div className="upload-section-container">
        <h2>Upload PDF</h2>
        <div className="mt-4">
          <label className="upload-label">
            <div>
              <p>
                <span>Click to upload</span> or drag and drop
              </p>
              <p>PDF files only</p>
            </div>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileUpload(e.target.files[0])}
            />
          </label>
        </div>
        {error && <div className="upload-error">{error}</div>}
      </div>
    </div>
  );
};

export default UploadSection;
