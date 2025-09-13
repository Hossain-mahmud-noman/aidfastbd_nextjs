'use client';
import React, { useEffect, useState } from 'react';
import { MdCancel } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import Image from 'next/image';
import DiagnosticCenterCard from '../DiagnosticCenterCard';
import { useI18n } from '../../context/i18n';
import { base_endpoint } from '../../utils/constants';

// Reusable Dropdown
const SearchableDropdown = ({ label, options, value, onChange, slug }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const i18n = useI18n();

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
        onClick={() => setIsOpen(!isOpen)}
      >
        <span style={{ inlineSize: "100%" }}>
          {value?.text || `${label.toLowerCase()} ${i18n.t("Select")}`}
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

const SearchDiagnostic = () => {
  const i18n = useI18n();
  const [filters, setFilters] = useState({
    name: null,
    emergency: null,
    icu: null,
    ot: null,
    rating: null,
    rank: null
  });

  const [searchResult, setSearchResult] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [nameOptions, setNameOptions] = useState([]);

  useEffect(() => {
    fetch(`https://api.aidfastbd.com/api/Dropdown/GetDropDownList?type=DiagnosticCenter`)
      .then(res => res.json())
      .then(data => setNameOptions(data))
      .catch(err => console.error("Fetch name options failed", err));
  }, []);

  const handleSearch = async (customFilters = filters) => {
    const queryParams = new URLSearchParams();
    if (customFilters.name?.value) queryParams.append("userId", customFilters.name.value);
    if (customFilters.emergency?.value) queryParams.append("emergency", customFilters.emergency.value);
    if (customFilters.icu?.value) queryParams.append("emergencyICU", customFilters.icu.value);
    if (customFilters.ot?.value) queryParams.append("emergencyOT", customFilters.ot.value);
    if (customFilters.rating?.value) queryParams.append("rating", customFilters.rating.value);
    if (customFilters.rank?.value) queryParams.append("popularity", customFilters.rank.value);

    try {
      const res = await fetch(`${base_endpoint}/GeneralWeb/GetAllDiagnosticCenterCardInfo?${queryParams}`);
      const data = await res.json();
      setSearchResult(data?.data || []);
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
            slug="name"
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
                setSearchResult([]);
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
            <h2 className="text-center text-lg font-semibold mb-2">{i18n.t("Search Diagnostic")}</h2>
            <p className="text-center text-red-500 mb-4 text-sm">** {i18n.t("search by one or multiple criteria")} **</p>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
                setIsFilterOpen(false);
              }}
            >
              <SearchableDropdown label={i18n.t("Rating")} options={[1, 2, 3, 4, 5].map(v => ({ value: v, text: `${v} Star` }))} value={filters.rating} onChange={(val) => setFilters(f => ({ ...f, rating: val }))} />
              <SearchableDropdown label={i18n.t("Popularity Rank")} options={[1, 2, 3, 4].map(v => ({ value: v, text: `Rank ${v}` }))} value={filters.rank} onChange={(val) => setFilters(f => ({ ...f, rank: val }))} />
              <SearchableDropdown label={i18n.t("Emergency")} options={[{ value: 'yes', text: 'Yes' }, { value: 'no', text: 'No' }]} value={filters.emergency} onChange={(val) => setFilters(f => ({ ...f, emergency: val }))} />
              <SearchableDropdown label={i18n.t("Emergency ICU")} options={[{ value: 'yes', text: 'Yes' }, { value: 'no', text: 'No' }]} value={filters.icu} onChange={(val) => setFilters(f => ({ ...f, icu: val }))} />
              <SearchableDropdown label={i18n.t("Emergency OT")} options={[{ value: 'yes', text: 'Yes' }, { value: 'no', text: 'No' }]} value={filters.ot} onChange={(val) => setFilters(f => ({ ...f, ot: val }))} />

              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600">
                {i18n.t("Search")}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Search Results */}
      {hasSearched && (
        <div className="mb-10">
          <h3 className="text-lg ml-3 mb-2">{i18n.t("Search Results")}</h3>
          {searchResult.length === 0 ? (
            <p className="text-center text-gray-500">{i18n.t("No diagnostic centers found")}</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4 xl:gap-5">
              {searchResult.map((item, index) => (
                <DiagnosticCenterCard key={index} diagnostic={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchDiagnostic;
