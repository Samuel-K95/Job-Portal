// components/jobs/FilterPanel.tsx
"use client";

import CheckInput from "./CheckInput"; // Adjusted path
import Image from "next/image";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useState } from "react";

function valuetext(value: number) {
  return `${value} ETB`;
}

const Filter = () => {
  const [value, setValue] = useState<number[]>([20, 2000]); // Updated range from image

  const handleChange = (event: Event, newValue: number | number[]) => {
    // MUI type for newValue
    setValue(newValue as number[]);
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

      <div className="flex flex-col items-start justify-start w-full ">
        <p className="text-sm font-medium mb-1">Job Type</p>
        <div className="w-full border border-gray-300 rounded-lg p-3 text-sm space-y-1">
          <CheckInput value={"Full-time"} />
          <CheckInput value={"Part-time"} />
          <CheckInput value={"Contract"} />
          <CheckInput value={"Volunteer"} />
          <CheckInput value={"Internship"} />
          <CheckInput value={"Remote"} />
          <CheckInput value={"Hybrid"} />
          <CheckInput value={"On-Site"} />
        </div>
      </div>

      <div className="flex flex-col items-start justify-start w-full">
        <p className="text-sm font-medium mb-1">Location</p>
        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 w-full focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
          <Image
            src={"/Location.svg"} // Assuming Location.svg is in public folder
            alt={"location"}
            width={20}
            height={20}
          />
          <input
            type="text"
            placeholder="Enter your location"
            className="w-full outline-none text-sm"
          />
        </div>
      </div>

      <div className="flex flex-col items-start justify-start w-full">
        <p className="text-sm font-medium mb-1">Experience Level</p>
        <select
          name="experience-name"
          id="experience-id"
          className="border border-gray-300 pl-3 py-2 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          defaultValue="Intermediate"
        >
          <option value="Intermediate">Intermediate</option>
          <option value="Entry">Entry Level</option>
          <option value="Medium">Mid-Level</option>
          <option value="Advanced">Senior / Advanced</option>
        </select>
      </div>

      <div className="flex flex-col items-start justify-start w-full">
        <p className="text-sm font-medium mb-1">Salary Range</p>
        <Box sx={{ width: "100%", paddingX: "5px" }}>
          {" "}
          {/* Added padding for thumb overflow */}
          <Slider
            getAriaLabel={() => "Salary range"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={0}
            max={5000} // Example max, adjust as needed
            sx={{
              color: "#2563EB", // Blue color for slider
              "& .MuiSlider-thumb": {
                backgroundColor: "#2563EB",
              },
              "& .MuiSlider-valueLabel": {
                backgroundColor: "#2563EB",
              },
            }}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{valuetext(value[0])}</span>
            <span>{valuetext(value[1])}</span>
          </div>
        </Box>
      </div>

      <div className="flex flex-col items-start justify-start w-full">
        <p className="text-sm font-medium mb-1">Input Manually</p>
        <div className="flex items-center justify-between w-full gap-2 text-sm">
          <span className="text-gray-600">From</span>
          <input
            type="text"
            className="w-1/3 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 500"
          />
          <span className="text-gray-600">To</span>
          <input
            type="text"
            className="w-1/3 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 1500"
          />
        </div>
      </div>

      <div className="flex flex-col items-start justify-start w-full">
        <p className="text-sm font-medium mb-1">Currency</p>
        <select
          name="currency-name"
          id="currency-id"
          className="border border-gray-300 pl-3 py-2 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          defaultValue="Dollar"
        >
          <option value="Dollar">USD</option>
          <option value="Euro">EUR</option>
          <option value="ETB">ETB</option>
        </select>
      </div>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Reset all filter
      </button>
    </div>
  );
};
export default Filter;
