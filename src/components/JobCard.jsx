import React from "react";

function JobCard({ job, onSelectJob }) {
  const openJobLink = (link) => {
    window.open(link, "_blank");
  };

  return (
    <div className="job-card">
      <div className="job-top">
        <div>
          <img className="company-logo" src={job.logoUrl || ''} alt={job.companyName || 'Company Logo'} />
        </div>
        <div className="info-container">
          <h2 className="company-name" onClick={() => openJobLink(job.jdLink || '#')}>{job.companyName || 'Not Mentioned'}</h2>
          <p className="job-role">{job.jobRole || 'Not Mentioned'}</p>
          <p className="job-location">{job.location || 'Not Mentioned'}</p>
        </div>
      </div>

      <div className="details-container">
          <p className="job-salary">
            Estimated Salary: {job.minJdSalary || 'Not Mentioned'} - {job.maxJdSalary || 'Not Mentioned'} {job.salaryCurrencyCode || ''}
          </p>
        <div className="salary-description-container">
          <p className="about-company">About Company:</p>
          <p className="about-us">Abous us</p>
          <p className="job-description">{job.jobDetailsFromCompany || 'Not Mentioned'}</p>
          <p className="modal" onClick={() => onSelectJob(job)}>Show more</p> 
        </div>
        <div>
          <p className="min-exp">Minimum Experience<br />{job.minExp || 'Not Mentioned'}</p>
        </div>
        <div>
          <button className="apply-button">⚡ Easy Apply</button>
        </div>
        <div>
          <button className="referral-button">Unlock referral asks</button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
