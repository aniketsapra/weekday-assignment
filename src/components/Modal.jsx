import React from "react";

function Modal({ job, onClose }) {
  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>{job.companyName}</h2>
        <h3>About Us</h3>
        <p>{job.jobDetailsFromCompany}</p>
        <p>Minimum Experience: {job.minExp || 'Not Mentioned'}</p>
        <p>Salary: {job.minJdSalary} - {job.maxJdSalary} USD</p>
        <p>Job Role: {job.jobRole}</p>
        
        <p>Location: {job.location}</p>
      </div>
    </div>
  );
}

export default Modal;
