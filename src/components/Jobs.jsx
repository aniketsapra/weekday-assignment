// JobsComponent.jsx
import React, { useState, useEffect, useRef } from "react";
import JobCard from "./JobCard";
import FilterBar from "./FilterBar";
import Modal from "./Modal";

function JobsComponent() {
    const [jobs, setJobs] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({});
    const limit = 6;

    const loader = useRef(null);

    const [selectedJob, setSelectedJob] = useState(null);

    const toggleModal = () => {
        setSelectedJob(null); // Close the modal
    };

    useEffect(() => {
        setPage(1); // Reset page number when filters change
    }, [filters]);

    useEffect(() => {
        fetchData();
    }, [filters, page]); // Fetch data when filters or page change

    const fetchData = async () => {
      if (loading) return;
  
      setLoading(true);
  
      try {
          const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  limit,
                  offset: (page - 1) * limit,
                  ...filters // Pass filters here
              })
          });
          const result = await response.json();
          let filteredJobs = result.jdList || [];
  
          // Filter jobs based on filters
          if (filters.jobRole) {
              filteredJobs = filteredJobs.filter(job => job.jobRole === filters.jobRole.value);
          }
          if (filters.minExp) {
              filteredJobs = filteredJobs.filter(job => job.minExp >= filters.minExp.value);
          }
          if (filters.minJdSalary) {
              filteredJobs = filteredJobs.filter(job => parseFloat(job.minJdSalary) >= parseFloat(filters.minJdSalary.value));
          }
          if (filters.location && filters.location.length > 0) {
              filteredJobs = filteredJobs.filter(job =>
                  filters.location.some(location =>
                      job.location.toLowerCase().includes(location.value.toLowerCase())
                  )
              );
          }
          if (filters.companyName) {
              filteredJobs = filteredJobs.filter(job =>
                  job.companyName.toLowerCase().includes(filters.companyName.toLowerCase())
              );
          }
  
          // Set filtered jobs
          setJobs(page === 1 ? filteredJobs : prevJobs => [...prevJobs, ...filteredJobs]);
          setTotalCount(result.totalCount || 0);
      } catch (error) {
          console.error("Error fetching data:", error);
      } finally {
          setLoading(false);
      }
  };
  
  

    const handleScroll = () => {
        if (loader.current && window.innerHeight + window.scrollY >= loader.current.offsetTop) {
            setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, filters, page]); // Listen to changes in loading, filters, and page

    return (
        <div>
            <FilterBar setFilters={setFilters} />

            <div className="job-grid">
                {jobs.map((job, index) => (
                    <JobCard key={index} job={job} onSelectJob={() => setSelectedJob(job)} />
                ))}
            </div>
            {loading && (
                <div className="loading">
                    <div className="loading-buffer"></div>
                    <p>Loading...</p>
                </div>
            )}
            <div ref={loader} />
            {selectedJob && (
                    <Modal job={selectedJob} onClose={toggleModal} />
                )}
        </div>
    );
}

export default JobsComponent;
