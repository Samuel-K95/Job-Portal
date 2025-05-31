// components/jobs/FilterPanel.tsx
"use client";

import CheckInput from "./CheckInput";
import Image from "next/image";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import { JobFilters } from "@/types/job";

interface FilterProps {
  onFilterChange: (filters: JobFilters) => void;
}

function valuetext(value: number) {
  return `${value} ETB`;
}

const Filter = ({ onFilterChange }: FilterProps) => {
  const [salaryRange, setSalaryRange] = useState<number[]>([20, 2000]);
  const [filters, setFilters] = useState<JobFilters>({
    job_type: undefined,
    location: "",
    experience_level: undefined,
    salary_min: 20,
    salary_max: 2000,
  });

  const handleFilterChange = (key: keyof JobFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSalaryChange = (event: Event, newValue: number | number[]) => {
    const range = newValue as number[];
    setSalaryRange(range);
    handleFilterChange('salary_min', range[0]);
    handleFilterChange('salary_max', range[1]);
  };

  const handleReset = () => {
    const resetFilters = {
      job_type: undefined,
      location: "",
      experience_level: undefined,
      salary_min: 20,
      salary_max: 2000,
    };
    setFilters(resetFilters);
    setSalaryRange([20, 2000]);
    onFilterChange(resetFilters);
  };

  return (
    <div className="w-full p-5 rounded-2xl bg-white flex flex-col items-center font-light gap-5 shadow-lg">
      <p className="text-2xl font-bold">Filter</p>

      <div className="flex flex-col items-start justify-start w-full">
        <p className="text-sm font-medium mb-1">Date Posted</p>
        <select
          name="posted-name"
          id="posted-id"
          className="border border-gray-300 pl-3 py-2 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          defaultValue="Last 24 Hrs"
        >
          <option value="Last 24 Hrs">Last 24 Hrs</option>
          <option value="less than a week">Less than a week</option>
          <option value="less than a month">Less than a month</option>
          <option value="less than a year">Less than a year</option>
          <option value="more than a year">More than a year</option>
        </select>
      </div>

      <div className="flex flex-col items-start justify-start w-full">
        <p className="text-sm font-medium mb-1">Job Type</p>
        <select
          className="border border-gray-300 pl-3 py-2 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filters.job_type || ""}
          onChange={(e) => handleFilterChange('job_type', e.target.value)}
        >
          <option value="">All Types</option>
          <option value="full_time">Full-time</option>
          <option value="part_time">Part-time</option>
          <option value="contract">Contract</option>
        </select>
      </div>

      <div className="flex flex-col items-start justify-start w-full">
        <p className="text-sm font-medium mb-1">Location</p>
        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 w-full focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
          <Image
            src={"/Location.svg"}
            alt={"location"}
            width={20}
            height={20}
          />
          <input
            type="text"
            placeholder="Enter your location"
            className="w-full outline-none text-sm"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col items-start justify-start w-full">
        <p className="text-sm font-medium mb-1">Experience Level</p>
        <select
          className="border border-gray-300 pl-3 py-2 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filters.experience_level || ""}
          onChange={(e) => handleFilterChange('experience_level', e.target.value)}
        >
          <option value="">All Levels</option>
          <option value="entry">Entry Level</option>
          <option value="mid">Mid-Level</option>
          <option value="senior">Senior Level</option>
        </select>
      </div>

      <div className="flex flex-col items-start justify-start w-full">
        <p className="text-sm font-medium mb-1">Salary Range</p>
        <Box sx={{ width: "100%", paddingX: "5px" }}>
          <Slider
            getAriaLabel={() => "Salary range"}
            value={salaryRange}
            onChange={handleSalaryChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={0}
            max={5000}
            sx={{
              color: "#2563EB",
              "& .MuiSlider-thumb": {
                backgroundColor: "#2563EB",
              },
              "& .MuiSlider-valueLabel": {
                backgroundColor: "#2563EB",
              },
            }}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{valuetext(salaryRange[0])}</span>
            <span>{valuetext(salaryRange[1])}</span>
          </div>
        </Box>
      </div>

      <button
        onClick={handleReset}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Reset all filters
      </button>
    </div>
  );
};

export default Filter;
