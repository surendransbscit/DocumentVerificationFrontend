import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FileUpload from "./components/FileUpload";
import Dashboard from "./components/Dashboard";
import DocumentDetails from "./components/DocumentDetails";
import "./App.css"; 

export default function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="navbar">
          <Link to="/">Upload</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
        <Routes>
          <Route path="/" element={<FileUpload />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/details/:id" element={<DocumentDetails />} />
        </Routes>
      </div>
    </Router>
  );
}
