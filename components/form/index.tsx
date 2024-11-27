"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import fetchVehiclesMakes from "@/services/getVehiclesMakes";

export interface IMakes {
  MakeId: string;
  MakeName: string;
}

const FilterForm = () => {
  const [makes, setMakes] = useState<IMakes[]>([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const currentYear = new Date().getFullYear();

  const fetchData = async () => {
    const data = await fetchVehiclesMakes();
    setMakes(data.Results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white border-[4px] border-gray-700 p-8 md:h-fit h-[100vh] md:rounded-xl shadow-2xl w-full max-w-md mx-auto flex flex-col flex-wrap gap-2">
    <h2 className="text-4xl text-gray-700 font-bold mb-6 text-center">Filter Cars</h2>
    
    <div className="mb-6">
      <label htmlFor="vehicle-make" className="block text-sm font-semibold text-gray-700 mb-2">
        Vehicle Make
      </label>
      <select
        id="vehicle-make"
        className="block w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 px-4 py-2 text-gray-800"
        value={selectedMake}
        onChange={(e) => setSelectedMake(e.target.value)}
      >
        <option value="" disabled>
          Select Make
        </option>
        {makes.map((make) => (
          <option key={make.MakeId} value={make.MakeId}>
            {make.MakeName}
          </option>
        ))}
      </select>
    </div>
  
    {/* Select Model Year */}
    <div className="mb-6">
      <label htmlFor="model-year" className="block text-sm font-semibold text-gray-700 mb-2">
        Model Year
      </label>
      <select
        id="model-year"
        className="block w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 px-4 py-2 text-gray-800"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        <option value="" disabled>
          Select Year
        </option>
        {Array.from({ length: currentYear - 2015 + 1 }, (_, i) => (
          <option key={i} value={2015 + i}>
            {2015 + i}
          </option>
        ))}
      </select>
    </div>
  
    <Link href={selectedMake && selectedYear ? `/result/${selectedMake}/${selectedYear}` : "#"}>
      <button
        className={`w-full py-3 rounded-lg font-semibold text-white ${
          selectedMake && selectedYear ? "bg-black hover:scale-110" : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!selectedMake || !selectedYear}
      >
        Next
      </button>
    </Link>
  </div>
  
  );
};

export default FilterForm;
