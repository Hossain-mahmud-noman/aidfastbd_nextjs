'use client';
import React, { useEffect, useState } from 'react';
import { MdCancel } from 'react-icons/md';
import { FaAngleDown } from 'react-icons/fa6';
import BloodBankCard from '../BloodBankCard';
import { useI18n } from '../../context/i18n'; 
import { base_endpoint } from '../../utils/constants'; 
import Image from 'next/image';


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

const SearchBlood = () => {
  const i18n = useI18n();

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

  useEffect(() => {
    fetch(`${base_endpoint}/Dropdown/GetDropDownList?type=BloodBank`)
      .then((res) => res.json())
      .then((data) => setNameOptions(data))
      .catch((err) => {
        console.error('BloodBank dropdown fetch error', err);
        setNameOptions([]);
      });
  }, []);

  const handleSearch = async (customFilters = filters) => {
    const query = new URLSearchParams();
    if (customFilters.name?.value)
      query.append('bloodBankInformationId', customFilters.name.value);
    if (customFilters.rank?.value) query.append('popularity', customFilters.rank.value);
    if (customFilters.rating?.value) query.append('rating', customFilters.rating.value);
    if (customFilters.emergency?.value) query.append('emergency', customFilters.emergency.value);

    try {
      const res = await fetch(
        `${base_endpoint}/GeneralWeb/GetAllBloodBankList?${query.toString()}`
      );
      const data = await res.json();
      setResults(data?.data || []);
      setHasSearched(true);
    } catch (err) {
      console.error('BloodBank search error', err);
      setResults([]);
    }
  };

  // Immediate search on Name dropdown selection or clear
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
            >
              &times;
            </button>
            <h2 className="text-center text-lg font-semibold mb-2">
              {i18n.t("Search Blood Banks")}
            </h2>
            <p className="text-center text-red-500 mb-4 text-sm">
              ** {i18n.t('search by one or multiple criteria')} **
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
            <p className="text-center text-gray-500">
              {i18n.t('No blood banks found')}
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-3">
              {results.map((item, index) => (
                <BloodBankCard key={index} data={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchBlood;
