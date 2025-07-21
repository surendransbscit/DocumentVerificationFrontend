import React, { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [llmVerdict, setLlmVerdict] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    setFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setStatus("Uploading...");
    setUploadProgress(0);
    setLlmVerdict("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },
      });

      setStatus("✅ Upload successful!");
      const verdict = response.data?.extracted_data?.llm_verdict;
      if (verdict) setLlmVerdict(verdict);
    } catch (error) {
      console.error("Upload error:", error);
      setStatus("❌ Upload failed!");
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-container">
        <h2> AI Document Validator</h2>
        <div
          className={`drop-zone ${dragOver ? "drag-over" : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {file ? (
            <p>Selected: {file.name}</p>
          ) : (
            <p>Drag & drop your file here, or click to select</p>
          )}
          <input
            type="file"
            className="file-input"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button className="upload-btn" onClick={handleUpload}>
          Upload
        </button>

        {status && (
          <div className="status-box">
            <div className="status-text">{status}</div>
            {status.includes("Uploading") && (
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${uploadProgress}%` }} />
              </div>
            )}
          </div>
        )}

        {llmVerdict && <div className="llm-verdict"> {llmVerdict}</div>}
      </div>
    </div>
  );
}
