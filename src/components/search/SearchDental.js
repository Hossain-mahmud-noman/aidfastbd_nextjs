'use client';
import React, { useEffect, useState } from 'react';
import { MdCancel } from 'react-icons/md';
import { FaAngleDown } from 'react-icons/fa6';
import { useI18n } from '../../context/i18n';  
import { base_endpoint } from '../../utils/constants'; 
import Image from 'next/image';
import ServiceCard from '../ServiceCard';

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
    setSearchTerm('');
  };

  return (
    <div className="relative w-full">
      {slug !== 'name' && <label className="text-gray-700">{label}</label>}
      <div
        className="border border-gray-300 rounded-lg px-3 py-2 flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span style={{ inlineSize: '100%' }}>
          {value?.text || `${label.toLowerCase()} ${i18n.t('Select')}`}
        </span>
        <span className="text-gray-500">
          {value ? (
            <MdCancel
              onClick={(e) => {
                e.stopPropagation();
                handleOptionClick(null);
              }}
              className="cursor-pointer"
            />
          ) : (
            <FaAngleDown />
          )}
        </span>
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg max-h-72 overflow-y-auto z-10">
          <input
            type="text"
            className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none"
            placeholder={i18n.t('Search...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          <ul className="max-h-72 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, idx) => (
                <li
                  key={idx}
                  onClick={() => handleOptionClick(option)}
                  className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {option.text}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500">{i18n.t('No results found')}</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

const SearchDental = () => {
  const i18n = useI18n();

  // Single filters object for all filter fields
  const [filters, setFilters] = useState({
    name: null,
    rating: null,
    rank: null,
    emergency: null,
  });

  const [nameOptions, setNameOptions] = useState([]);
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Load dropdown options once
  useEffect(() => {
    fetch(`${base_endpoint}/Dropdown/GetDropDownList?type=DentalClinic`)
      .then((res) => res.json())
      .then((data) => setNameOptions(data))
      .catch((err) => {
        console.error('Dental dropdown fetch error', err);
        setNameOptions([]);
      });
  }, []);

  const handleSearch = async (customFilters = filters) => {
    const query = new URLSearchParams();
    query.append('serviceType', '1'); 

    query.append('pageNumber', '1');
    query.append('pageSize', '20');

    if (customFilters.name?.value) query.append('userId', customFilters.name.value);
    if (customFilters.rank?.value) query.append('popularity', customFilters.rank.value);
    if (customFilters.rating?.value) query.append('rating', customFilters.rating.value);
    if (customFilters.emergency?.value) query.append('emergency', customFilters.emergency.value);

    try {
      const res = await fetch(
        `${base_endpoint}/GeneralInformation/GetAllGenericServiceList?${query.toString()}`
      );
      const data = await res.json();
      setResults(data?.data || []);
      setHasSearched(true);
    } catch (err) {
      console.error('Dental search error', err);
      setResults([]);
      setHasSearched(true);
    }
  };

  // Immediate search when selecting or clearing Name dropdown
  const onNameChange = (val) => {
    const updatedFilters = { ...filters, name: val };
    setFilters(updatedFilters);
    if (val) {
      handleSearch(updatedFilters);
    } else {
      setHasSearched(false);
      setResults([]);
    }
  };

  return (
    <>
      {/* Top Name Search */}
      <div className="flex items-center gap-2 md:gap-3 lg:gap-6 w-full">
        <div className="w-[70%] md:w-[90%] relative flex items-center mb-3 mt-2">
          <SearchableDropdown
            slug="name"
            label={i18n.t('Name')}
            options={nameOptions}
            value={filters.name}
            onChange={onNameChange}
          />
        </div>

        {/* Filter Button */}
        <div
          onClick={() => setIsFilterOpen(true)}
          className="w-[30%] md:w-[10%] cursor-pointer flex items-center gap-1 lg:gap-2 border rounded-md justify-center -mt-1"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setIsFilterOpen(true)}
        >
          <Image src="/filter.png" width={40} height={40} alt="Filter" />
          <p>{i18n.t('Filter')}</p>
        </div>
      </div>

      {/* Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-[10000]">
          <div className="bg-white rounded-lg w-11/12 max-w-md p-6 shadow-lg overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-gray-500 float-right text-xl"
              aria-label={i18n.t('Close filter modal')}
            >
              &times;
            </button>
            <h2 className="text-center text-lg font-semibold mb-2">{i18n.t("Search Dental Clinics")}</h2>
            <p className="text-center text-red-500 mb-4 text-sm">
              ** {i18n.t("search by one or multiple criteria")} **
            </p>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
                setIsFilterOpen(false);
              }}
            >
              <SearchableDropdown
                label={i18n.t('Rating')}
                options={[1, 2, 3, 4, 5].map((v) => ({
                  value: v,
                  text: `${v} Star`,
                }))}
                value={filters.rating}
                onChange={(val) => setFilters((f) => ({ ...f, rating: val }))}
              />
              <SearchableDropdown
                label={i18n.t('Popularity Rank')}
                options={[1, 2, 3, 4].map((v) => ({
                  value: v,
                  text: `Rank ${v}`,
                }))}
                value={filters.rank}
                onChange={(val) => setFilters((f) => ({ ...f, rank: val }))}
              />
              <SearchableDropdown
                label={i18n.t('Emergency')}
                options={[
                  { value: 'yes', text: i18n.t('Yes') },
                  { value: 'no', text: i18n.t('No') },
                ]}
                value={filters.emergency}
                onChange={(val) => setFilters((f) => ({ ...f, emergency: val }))}
              />

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600"
              >
                {i18n.t('Search')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Search Results */}
      {hasSearched && (
        <div className="mb-10">
          <h3 className="text-lg ml-3 mb-2">{i18n.t('Search Results')}</h3>
          {results.length === 0 ? (
            <p className="text-center text-gray-500">{i18n.t('No Dental Clinic found')}</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-3">
              {results.map((item, index) => (
                <ServiceCard key={index} data={item} slug='dental' />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchDental;
