'use client';
import React, { useEffect, useState } from 'react';
import { FiSearch } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import DoctorCard from '../DoctorCard';
import { base_endpoint } from '../../utils/constants';
import { useI18n } from '../../context/i18n';
import Image from 'next/image';

const SearchableDropdown = ({ label, options, value, onChange, slug }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const toggleDropdown = () => setIsOpen(!isOpen);

  const filteredOptions = options.filter((option) =>
    option.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {
        slug != 'name' && (
          <label className="text-gray-700">{label}</label>
        )
      }
      <div className="border border-gray-300 rounded-lg px-3 py-2 flex items-center justify-between cursor-pointer">
        <span onClick={toggleDropdown} style={{ inlineSize: "100%" }}>
          {value?.text || `Select ${label.toLowerCase()}`}
        </span>
        <span className="text-gray-500">
          {value ? <MdCancel onClick={() => handleOptionClick(null)} /> : <FaAngleDown />}
        </span>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg max-h-40 overflow-y-auto z-10">
          <input
            type="text"
            className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul className="max-h-32 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {option.text}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

const SearchDoctor = ({ specialityData = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const i18n = useI18n()
  const [filters, setFilters] = useState({
    name: null,
    speciality: null,
    experience: null,
    fee: null,
    rating: null,
    rank: null,
    emergency: null,
    bmdc: null,
  });

  const [doctorList, setDoctorList] = useState([]);
  const [nameOptions, setNameOptions] = useState([]);
  const [experienceOptions, setExperienceOptions] = useState([]);
  const [feeOptions, setFeeOptions] = useState([]);
  const [specialityOptions, setSpecialityOptions] = useState(specialityData);

  const togglePopup = () => setIsOpen(!isOpen);

  const fetchDropdowns = async () => {
    try {
      const [nameRes, feeRes, expRes] = await Promise.all([
        fetch(`https://api.aidfastbd.com/api/GeneralWeb/GetAllDoctorList`),
        fetch(`https://api.aidfastbd.com/api/Dropdown/GetDropDownList?type=Fee`),
        fetch(`https://api.aidfastbd.com/api/Dropdown/GetDropDownList?type=Experience`)
      ]);

      const nameData = await nameRes.json();
      const feeData = await feeRes.json();
      const expData = await expRes.json();

      setNameOptions(nameData.map(d => ({ value: d.id, text: d.name })));
      setFeeOptions(feeData);
      setExperienceOptions(expData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDropdowns();
    setSpecialityOptions(specialityData);
  }, [specialityData]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setHasSearched(true);

    const queryParams = new URLSearchParams();
    if (filters.name?.value) queryParams.append("DoctorId", filters.name.value);
    if (filters.speciality?.text) queryParams.append("Specialty", filters.speciality.text);
    if (filters.emergency?.value) queryParams.append("Emergency", filters.emergency.value);
    if (filters.fee?.text) queryParams.append("Fee", filters.fee.text);
    if (filters.experience?.text) queryParams.append("Experience", filters.experience.text);
    if (filters.rating?.value) queryParams.append("Rating", filters.rating.value);
    if (filters.rank?.value) queryParams.append("Rank", filters.rank.value);
    if (filters.bmdc) queryParams.append("BMDC", filters.bmdc);

    const res = await fetch(`${base_endpoint}/GeneralWeb/GetDoctorSearchList?pageNumber=1&pageSize=20&${queryParams}`);
    const data = await res.json();
    setDoctorList(data?.data || []);
    togglePopup();
  };

  return (
    <>
      {/* Search Button */}
      <div className='flex items-center gap-2 md:gap-3 lg:gap-6'>

        <div className="w-[70%] md:w-[90%] relative flex items-center mb-3 mt-2">
          <form className="w-full" onSubmit={handleSearch}>
            <SearchableDropdown slug='name' label="Name" options={nameOptions} value={filters.name} onChange={val => setFilters(f => ({ ...f, name: val }))} />
          </form>
        </div>

        <div onClick={togglePopup} className='w-[30%] md:w-[10%] cursor-pointer flex items-center gap-1 lg:gap-2 border rounded-md justify-center -mt-1'>
          <Image
            src="/filter.png"
            width={40}
            height={40}
            alt='Filter'
          />
          <p>Filter</p>
        </div>
      </div>

      {/* Popup */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-[10000]">
          <div className="bg-white rounded-lg w-11/12 max-w-md p-6 shadow-lg overflow-y-auto max-h-[90vh]">
            <button onClick={togglePopup} className="text-gray-500 float-right text-xl">&times;</button>
            <h2 className="text-center text-lg font-semibold mb-2">Search Doctor</h2>
            <p className="text-center text-red-500 mb-4 text-sm">** search by one or multiple criteria **</p>
            <form className="space-y-4" onSubmit={handleSearch}>
              <SearchableDropdown label="Name" options={nameOptions} value={filters.name} onChange={val => setFilters(f => ({ ...f, name: val }))} />
              <SearchableDropdown label="Speciality" options={specialityOptions} value={filters.speciality} onChange={val => setFilters(f => ({ ...f, speciality: val }))} />
              <SearchableDropdown label="Experience" options={experienceOptions} value={filters.experience} onChange={val => setFilters(f => ({ ...f, experience: val }))} />
              <SearchableDropdown label="Fee" options={feeOptions} value={filters.fee} onChange={val => setFilters(f => ({ ...f, fee: val }))} />
              <SearchableDropdown label="Rating" options={[1, 2, 3, 4, 5].map(v => ({ value: v, text: `${v} Star` }))} value={filters.rating} onChange={val => setFilters(f => ({ ...f, rating: val }))} />
              <SearchableDropdown label="Popularity Rank" options={[1, 2, 3, 4].map(v => ({ value: v, text: `Rank ${v}` }))} value={filters.rank} onChange={val => setFilters(f => ({ ...f, rank: val }))} />
              <div>
                <label className="text-gray-700">Membership</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                  placeholder="BMDC Number"
                  onChange={e => setFilters(f => ({ ...f, bmdc: e.target.value }))}
                />
              </div>
              <SearchableDropdown label="Emergency" options={[{ value: 'yes', text: 'Yes' }, { value: 'no', text: 'No' }]} value={filters.emergency} onChange={val => setFilters(f => ({ ...f, emergency: val }))} />
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600">Search</button>
            </form>
          </div>
        </div>
      )}

      {/* Results - shown only after search */}
      {hasSearched && (
        <div className="mb-10">
          <h3 className="text-lg ml-3 mb-2">{i18n.t("Search Results")}</h3>
          {doctorList.length === 0 ? (
            <p className="text-center text-gray-500">{i18n.t("No doctors found")}</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 px-3">
              {doctorList.map((doctor, index) => (
                <DoctorCard key={index} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchDoctor;
