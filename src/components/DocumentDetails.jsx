import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./DocumentDetails.css";

export default function DocumentDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await axios.get(`http://127.0.0.1:8000/api/details/${id}/`);
      setDetails(res.data);
    };
    fetchDetails();
  }, [id]);

  if (!details) return <div className="loading">Loading...</div>;

  return (
    <div className="details-container">
      <h2 className="details-title">📄 Document Details</h2>
      <div className="details-card">
        <div className="detail-row">
          <strong>File:</strong>
          <a href={details.file} target="_blank" rel="noopener noreferrer">
            {details.file?.split("/").pop()}
          </a>
        </div>
        <div className="detail-row">
          <strong>Status:</strong>
          <span className={`status-tag ${details.status.toLowerCase()}`}>
            {details.status}
          </span>
        </div>
        <div className="detail-row">
          <strong>Name:</strong> {details.name}
        </div>
        <div className="detail-row">
          <strong>DOB:</strong> {details.dob}
        </div>
        <div className="detail-row">
          <strong>Document Number:</strong> {details.doc_number}
        </div>
        <div className="detail-row">
          <strong>Expiry Date:</strong> {details.expiry_date}
        </div>

        <div className="file-preview-box">
          <center>{details.file?.endsWith(".pdf") ? (
            <iframe
              src={details.file}
              width="100%"
              height="500px"
              title="PDF Preview"
            />
          ) : (
            <img
              src={details.file}
              alt="Uploaded Document"
              className="document-preview-image"
            />
          )}</center>
        </div>
      </div>
    </div>
  );
}
