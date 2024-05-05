import React, { useState, useEffect, useRef } from "react";
import JobCard from "./JobCard";

function JobsComponent() {
  const [jobs, setJobs] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 6; // Number of jobs to fetch at a time

  const loader = useRef(null);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (loader.current && window.innerHeight + window.scrollY >= loader.current.offsetTop) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

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
          offset
        })
      });
      const result = await response.json();
      setJobs(prevJobs => [...prevJobs, ...(result.jdList || [])]);
      setTotalCount(result.totalCount || 0);
      setOffset(offset + limit);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="job-grid">
        {jobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
      {loading && (
        <div className="loading">
          <div className="loading-buffer"></div>
          <p>Loading...</p>
        </div>
      )}
      <div ref={loader} />
    </div>
  );
}

export default JobsComponent;
