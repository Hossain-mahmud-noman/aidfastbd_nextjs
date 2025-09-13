'use client';
import React, { useEffect, useState } from 'react';
import { MdCancel } from 'react-icons/md';
import { FaAngleDown } from 'react-icons/fa6';
import { FiSearch } from 'react-icons/fi';
import ServiceCard from '../ServiceCard';
import Image from 'next/image';
import { useI18n } from '../../context/i18n'; 

const SearchableDropdown = ({ label, options, value, onChange, slug }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useI18n();

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
      {slug !== 'name' && <label className="text-gray-700">{t(label)}</label>}
      <div
        className="border border-gray-300 rounded-lg px-3 py-2 flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span style={{ inlineSize: '100%' }}>
          {value?.text || `${label.toLowerCase()} ${t('Select')}`}
        </span>
        <span className="text-gray-500">
          {value ? (
            <MdCancel
              onClick={(e) => {
                e.stopPropagation();
                handleOptionClick(null);
              }}
              className="cursor-pointer"
              aria-label={t(`Clear ${label}`)}
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
            placeholder={t('Search...')}
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
              <li className="px-3 py-2 text-gray-500">{t('No results found')}</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

const SearchNurse = () => {
  const { t } = useI18n();

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
    const fetchDropdownList = async () => {
      try {
        const response = await fetch(
          'https://api.aidfastbd.com/api/Dropdown/GetDropDownList?type=Nurse'
        );
        if (response.ok) {
          const data = await response.json();
          setNameOptions(data);
        } else {
          setNameOptions([]);
        }
      } catch (error) {
        console.error(error);
        setNameOptions([]);
      }
    };
    fetchDropdownList();
  }, []);

  const fetchResults = async (filterValues) => {
    let query = '&pageNumber=1&pageSize=20';
    if (filterValues.rank) query += `&popularity=${filterValues.rank.value}`;
    if (filterValues.emergency) query += `&emergency=${filterValues.emergency.value}`;
    if (filterValues.rating) query += `&rating=${filterValues.rating.value}`;
    if (filterValues.name) query += `&userId=${filterValues.name.value}`;

    try {
      const response = await fetch(
        `https://api.aidfastbd.com/api/GeneralInformation/GetAllGenericServiceList?serviceType=6${query}`
      );
      const data = await response.json();
      setResults(data?.data || []);
      setHasSearched(true);
    } catch (error) {
      console.error(error);
      setResults([]);
      setHasSearched(true);
    }
  };

  const onNameChange = (val) => {
    const updatedFilters = { ...filters, name: val };
    setFilters(updatedFilters);
    if (val) {
      fetchResults(updatedFilters);
    } else {
      setResults([]);
      setHasSearched(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchResults(filters);
    setIsFilterOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-2 md:gap-3 lg:gap-6 w-full px-3 mt-3">
        <div className="w-[70%] md:w-[90%] relative">
          <SearchableDropdown
            slug="name"
            label={t('Name')}
            options={nameOptions}
            value={filters.name}
            onChange={onNameChange}
          />
        </div>
        <div
          className="w-[30%] md:w-[10%] cursor-pointer flex items-center gap-1 lg:gap-2 border rounded-md justify-center"
          onClick={() => setIsFilterOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setIsFilterOpen(true)}
          aria-label={t('Open filters')}
        >
          <Image src="/filter.png" width={40} height={40} alt={t('Filter')} />
          <span>{t('Filter')}</span>
        </div>
      </div>

      {isFilterOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-[10000]">
          <div className="bg-white rounded-lg w-11/12 max-w-md p-6 shadow-lg overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-gray-500 float-right text-xl"
              aria-label={t('Close filter modal')}
            >
              &times;
            </button>
            <h2 className="text-center text-lg font-semibold mb-2">{t('Search Nursing Care Home')}</h2>
            <p className="text-center text-red-500 mb-4 text-sm">
              {t('** search by one or multiple criteria **')}
            </p>
            <form className="space-y-4" onSubmit={handleSearchSubmit}>
              <SearchableDropdown
                label={t('Rating')}
                options={[
                  { value: 1, text: t('1 Star') },
                  { value: 2, text: t('2 Star') },
                  { value: 3, text: t('3 Star') },
                  { value: 4, text: t('4 Star') },
                  { value: 5, text: t('5 Star') },
                ]}
                value={filters.rating}
                onChange={(val) => setFilters((f) => ({ ...f, rating: val }))}
              />
              <SearchableDropdown
                label={t('Popularity Rank')}
                options={[
                  { value: 1, text: t('Rank 1') },
                  { value: 2, text: t('Rank 2') },
                  { value: 3, text: t('Rank 3') },
                  { value: 4, text: t('Rank 4') },
                ]}
                value={filters.rank}
                onChange={(val) => setFilters((f) => ({ ...f, rank: val }))}
              />
              <SearchableDropdown
                label={t('Emergency')}
                options={[
                  { value: 'yes', text: t('Yes') },
                  { value: 'no', text: t('No') },
                ]}
                value={filters.emergency}
                onChange={(val) => setFilters((f) => ({ ...f, emergency: val }))}
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600"
              >
                {t('Search')}
              </button>
            </form>
          </div>
        </div>
      )}

      {hasSearched && (
        <div className="mb-10 px-3">
          <h3 className="text-lg ml-1 mb-2">{t('Search Results')}</h3>
          {results.length === 0 ? (
            <p className="text-center text-gray-500">{t('No Nursing Care Home Found')}</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {results.map((item, idx) => (
                <ServiceCard key={item.id ?? idx} slug="nursing-home-care" data={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchNurse;
