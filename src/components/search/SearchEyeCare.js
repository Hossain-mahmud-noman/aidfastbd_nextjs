'use client';
import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { MdCancel } from 'react-icons/md';
import { FaAngleDown } from 'react-icons/fa6';
import DentalCard from '../DentalCard';

export const SearchableDropdown = ({ label, options, onSelect, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  const filteredOptions = options.filter((option) =>
    option.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <label className="text-gray-700">{label}</label>
      <div className="border border-gray-300 rounded-lg px-3 py-2 flex items-center justify-between cursor-pointer">
        <span onClick={toggleDropdown} style={{ inlineSize: '100%' }}>
          {onSelect?.text || `Select ${label.toLowerCase()}`}
        </span>
        <span className="text-gray-500">
          {onSelect ? (
            <MdCancel onClick={() => handleOptionClick(null)} />
          ) : (
            <FaAngleDown />
          )}
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

const SearchEyeCare = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [nameOptions, setNameOptions] = useState([]);
  const [name, setName] = useState(null);
  const [rating, setRating] = useState(null);
  const [rank, setRank] = useState(null);
  const [emergency, setEmergency] = useState(null);
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const togglePopup = () => setIsOpen(!isOpen);

  const fetchDropdownList = async () => {
    try {
      const response = await fetch(`https://api.aidfastbd.com/api/Dropdown/GetDropDownList?type=EyeCare`);
      if (response.ok) {
        const data = await response.json();
        setNameOptions(data);
      } else {
        setNameOptions([]);
      }
    } catch (err) {
      console.error(err);
      setNameOptions([]);
    }
  };

  const fetchBloodList = async () => {
    let query = `&pageNumber=1&pageSize=20`;
    if (rank) query += `&popularity=${rank.value}`;
    if (emergency) query += `&emergency=${emergency.value}`;
    if (rating) query += `&rating=${rating.value}`;
    if (name) query += `&userId=${name.value}`;

    try {
      const response = await fetch(`https://api.aidfastbd.com/api/GeneralInformation/GetAllGenericServiceList?serviceType=5${query}`);
      const data = await response.json();
      setResults(data?.data || []);
    } catch (err) {
      console.error(err);
      setResults([]);
    }
  };

  useEffect(() => {
    fetchDropdownList();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setHasSearched(true);
    fetchBloodList();
    togglePopup();
  };

  return (
    <>
      <div onClick={togglePopup} className="relative flex items-center ml-3 mr-3 mb-3">
        <div className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 shadow-lg pr-12">
          Search Dental Clinic
        </div>
        <button className="absolute right-0 mr-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105">
          <FiSearch className="w-5 h-5" />
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-[10000]">
          <div className="bg-white rounded-lg w-11/12 max-w-md p-6 shadow-lg overflow-y-auto max-h-[90vh]">
            <button onClick={togglePopup} className="text-gray-500 float-right text-xl">
              &times;
            </button>
            <h2 className="text-center text-lg font-semibold mb-2">Search Dental Clinic</h2>
            <p className="text-center text-red-500 mb-4 text-sm">
              ** search by one or multiple criteria **
            </p>
            <form className="space-y-4" onSubmit={handleSearch}>
              <SearchableDropdown label="Name" options={nameOptions} onSelect={name} setSelected={setName} />
              <SearchableDropdown
                label="Rating"
                options={[
                  { value: 1, text: '1 Star' },
                  { value: 2, text: '2 Star' },
                  { value: 3, text: '3 Star' },
                  { value: 4, text: '4 Star' },
                  { value: 5, text: '5 Star' },
                ]}
                onSelect={rating}
                setSelected={setRating}
              />
              <SearchableDropdown
                label="Popularity Rank"
                options={[
                  { value: 1, text: 'Rank 1' },
                  { value: 2, text: 'Rank 2' },
                  { value: 3, text: 'Rank 3' },
                  { value: 4, text: 'Rank 4' },
                ]}
                onSelect={rank}
                setSelected={setRank}
              />
              <SearchableDropdown
                label="Emergency"
                options={[
                  { value: 'yes', text: 'Yes' },
                  { value: 'no', text: 'No' },
                ]}
                onSelect={emergency}
                setSelected={setEmergency}
              />
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600">
                Search
              </button>
            </form>
          </div>
        </div>
      )}

      {hasSearched && (
        <div className="mb-10">
          <h3 className="text-lg ml-3 mb-2">Search Results</h3>
          {Array.isArray(results) && results.length === 0 ? (
            <p className="text-center text-gray-500">No blood Dental Clinic Found</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 px-3">
              {results.map((item, index) => (
                <DentalCard key={index} data={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchEyeCare;
