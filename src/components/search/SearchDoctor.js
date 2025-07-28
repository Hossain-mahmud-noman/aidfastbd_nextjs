'use client';
import React, { useEffect, useState } from 'react';
import { FiSearch } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import DoctorCard from '../DoctorCard';
import { base_endpoint } from '../../utils/constants';
import { useI18n } from '../../context/i18n';
import Image from 'next/image';

// Reusable dropdown
const SearchableDropdown = ({ label, options, value, onChange, slug }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const toggleDropdown = () => setIsOpen(!isOpen);
  const i18n = useI18n()

  const filteredOptions = options.filter((option) =>
    option.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      {slug !== 'name' && <label className="text-gray-700">{label}</label>}
      <div
        className="border border-gray-300 rounded-lg px-3 py-2 flex items-center justify-between cursor-pointer"
        onClick={toggleDropdown}
      >
        <span style={{ inlineSize: "100%" }}>
          {value?.text || `${label.toLowerCase()} ${i18n.t("Select")} `}
        </span>
        <span className="text-gray-500">
          {value ? <MdCancel onClick={(e) => { e.stopPropagation(); handleOptionClick(null); }} /> : <FaAngleDown />}
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
              <li className="px-3 py-2 text-gray-500">{i18n.t("No results found")}</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

const SearchDoctor = ({ specialityData = [] }) => {
  const i18n = useI18n();

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
  const [hasSearched, setHasSearched] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [nameOptions, setNameOptions] = useState([]);
  const [experienceOptions, setExperienceOptions] = useState([]);
  const [feeOptions, setFeeOptions] = useState([]);
  const [specialityOptions, setSpecialityOptions] = useState(specialityData);

  useEffect(() => {
    fetchDropdowns();
    setSpecialityOptions(specialityData);
  }, [specialityData]);

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
      console.error('Dropdown fetch error:', err);
    }
  };

  const handleSearch = async (customFilters = filters) => {
    const queryParams = new URLSearchParams();

    if (customFilters.name?.value) queryParams.append("DoctorId", customFilters.name.value);
    if (customFilters.speciality?.text) queryParams.append("Specialty", customFilters.speciality.text);
    if (customFilters.emergency?.value) queryParams.append("Emergency", customFilters.emergency.value);
    if (customFilters.fee?.text) queryParams.append("Fee", customFilters.fee.text);
    if (customFilters.experience?.text) queryParams.append("Experience", customFilters.experience.text);
    if (customFilters.rating?.value) queryParams.append("Rating", customFilters.rating.value);
    if (customFilters.rank?.value) queryParams.append("Rank", customFilters.rank.value);
    if (customFilters.bmdc) queryParams.append("BMDC", customFilters.bmdc);

    try {
      const res = await fetch(`${base_endpoint}/GeneralWeb/GetDoctorSearchList?pageNumber=1&pageSize=20&${queryParams}`);
      const data = await res.json();
      setDoctorList(data?.data || []);
      setHasSearched(true);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <>
      {/* Top Search Bar */}
      <div className='flex items-center gap-2 md:gap-3 lg:gap-6 w-full'>
        <div className="w-[70%] md:w-[90%] relative flex items-center mb-3 mt-2">
          <SearchableDropdown
            slug='name'
            label={i18n.t("Name")}
            options={nameOptions}
            value={filters.name}
            onChange={(val) => {
              const updated = { ...filters, name: val };
              setFilters(updated);
              if (val) {
                handleSearch(updated);
              } else {
                setHasSearched(false);
                setDoctorList([]);
              }
            }}
          />
        </div>

        <div
          onClick={() => setIsFilterOpen(true)}
          className='w-[30%] md:w-[10%] cursor-pointer flex items-center gap-1 lg:gap-2 border rounded-md justify-center -mt-1'
        >
          <Image src="/filter.png" width={40} height={40} alt='Filter' />
          <p>{i18n.t("Filter")}</p>
        </div>
      </div>

      {/* Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-[10000]">
          <div className="bg-white rounded-lg w-11/12 max-w-md p-6 shadow-lg overflow-y-auto max-h-[90vh]">
            <button onClick={() => setIsFilterOpen(false)} className="text-gray-500 float-right text-xl">&times;</button>
            <h2 className="text-center text-lg font-semibold mb-2">{i18n.t("Search Doctor")}</h2>
            <p className="text-center text-red-500 mb-4 text-sm">** {i18n.t("search by one or multiple criteria")} **</p>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
                setIsFilterOpen(false);
              }}
            >
              <SearchableDropdown label={i18n.t("Speciality")} options={specialityOptions} value={filters.speciality} onChange={val => setFilters(f => ({ ...f, speciality: val }))} />
              <SearchableDropdown label={i18n.t("Experience")} options={experienceOptions} value={filters.experience} onChange={val => setFilters(f => ({ ...f, experience: val }))} />
              <SearchableDropdown label={i18n.t("Fee")} options={feeOptions} value={filters.fee} onChange={val => setFilters(f => ({ ...f, fee: val }))} />
              <SearchableDropdown label={i18n.t("Rating")} options={[1, 2, 3, 4, 5].map(v => ({ value: v, text: `${v} Star` }))} value={filters.rating} onChange={val => setFilters(f => ({ ...f, rating: val }))} />
              <SearchableDropdown label={i18n.t("Popularity Rank")} options={[1, 2, 3, 4].map(v => ({ value: v, text: `Rank ${v}` }))} value={filters.rank} onChange={val => setFilters(f => ({ ...f, rank: val }))} />
              <div>
                <label className="text-gray-700">{i18n.t("Membership")}</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                  placeholder="BMDC Number"
                  onChange={e => setFilters(f => ({ ...f, bmdc: e.target.value }))}
                />
              </div>
              <SearchableDropdown label={i18n.t("Emergency")} options={[{ value: 'yes', text: 'Yes' }, { value: 'no', text: 'No' }]} value={filters.emergency} onChange={val => setFilters(f => ({ ...f, emergency: val }))} />
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600">{i18n.t("Search")}</button>
            </form>
          </div>
        </div>
      )}

      {/* Search Results */}
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
