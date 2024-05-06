import React, { useState, useEffect, useRef, useCallback } from "react";
import JobCard from "./JobCard";
import FilterBar from "./FilterBar";
import Modal from "./Modal";

function JobsComponent() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({});
    const limit = 30;

    const loader = useRef(null);
    const [selectedJob, setSelectedJob] = useState(null);

    const toggleModal = () => {
        setSelectedJob(null);
    };

    useEffect(() => {
        setPage(1);
    }, [filters]);

    useEffect(() => {
        fetchData();
    }, [filters, page]);

    useEffect(() => {
        fetchData();
    }, []); 

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
                    ...filters
                })
            });
            const result = await response.json();
            let filteredJobs = result.jdList || [];

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

            if (page === 1) {
                setJobs(filteredJobs);
            } else {
                setJobs(prevJobs => [...prevJobs, ...filteredJobs]);
            }
            
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = useCallback(() => {
        if (!loading && window.innerHeight + window.scrollY >= document.body.scrollHeight) {
            setPage(prevPage => prevPage + 1);
        }
    }, [loading]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const applyFilters = (newFilters) => {
        setFilters(newFilters);
        setPage(1);
    };

    return (
        <div>
            <FilterBar setFilters={applyFilters} />

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
