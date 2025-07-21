import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const [documents, setDocuments] = useState([]);

  const fetchDocs = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/documentslist/");
    setDocuments(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/delete/${id}/`);
    fetchDocs();
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "verified":
        return "status verified";
      case "pending":
        return "status pending";
      case "failed":
        return "status failed";
      default:
        return "status";
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Uploaded Documents</h2>
      <table className="document-table">
        <thead>
          <tr>
            <th>File</th>
            <th>Uploaded</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id} className="table-row">
              <td>{doc.file.split("/").pop()}</td>
              <td>{new Date(doc.uploaded_at).toLocaleString()}</td>
              <td>
                <span className={getStatusClass(doc.status)}>{doc.status}</span>
              </td>
              <td className="action-cell">
                <div className="action-buttons">
                  <a
                    href={`http://127.0.0.1:8000/api/download/${doc.id}/`}
                    className="btn download"
                  >
                    Download
                  </a>
                  <Link to={`/details/${doc.id}`} className="btn view">
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="btn delete"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
