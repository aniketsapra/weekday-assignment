// FilterBar.jsx
import React, { useState } from 'react';
import Select from 'react-select';
import '../App.css';

function FilterBar({ setFilters }) {
    const [filters, setLocalFilters] = useState({
        jobRole: null,
        minExp: null,
        location: [],
        minSalary: null,
        companyName: ''
    });

    const handleChange = (key, value) => {
        const updatedFilters = { ...filters, [key]: value };
        setLocalFilters(updatedFilters);
        setFilters(updatedFilters);
    };
    

    const roleOptions = [
        { value: 'android', label: 'Android' },
        { value: 'frontend', label: 'Frontend' },
        { value: 'backend', label: 'Backend' },
        { value: 'ios', label: 'iOS' },
        { value: 'tech lead', label: 'Tech Lead' },
    ];

    const minExpOptions = Array.from({ length: 10 }, (_, index) => ({ value: index + 1, label: `${index + 1}` }));

    const locationOptions = [
        { value: 'banglore', label: 'Banglore' },
        { value: 'chennai', label: 'Chennai' },
        { value: 'delhi ncr', label: 'Delhi NCR' },
        { value: 'mumbai', label: 'Mumbai' },
        { value: 'remote', label: 'Remote' },
    ];

    const minBasePayOptions = Array.from({ length: 150 }, (_, index) => ({ value: index + 1, label: `${index + 1}` }));

    return (
        <div className='filtersection'>
            <Select
                className="select"
                options={roleOptions}
                placeholder="Roles"
                value={filters.jobRole}
                onChange={(selectedOption) => handleChange('jobRole', selectedOption)}
                isClearable
            />
            <Select
                className="select"
                options={minExpOptions}
                placeholder="Min Experience"
                value={filters.minExp}
                onChange={(selectedOption) => handleChange('minExp', selectedOption)}
            />
            <Select
                className="select"
                options={locationOptions}
                placeholder="Location"
                value={filters.location}
                onChange={(selectedOptions) => handleChange('location', selectedOptions)}
                isMulti
            />
            <Select
                className="select"
                options={minBasePayOptions}
                placeholder="Minimum Base Pay"
                value={filters.minSalary}
                onChange={(selectedOption) => handleChange('minSalary', selectedOption)}
            />
            <input
                className="custom-input"
                type="text"
                value={filters.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                placeholder="Enter company name"
            />
        </div>
    );
}

export default FilterBar;
