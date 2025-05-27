'use client';
import React, { useEffect, useState } from 'react';
import { FiSearch } from "react-icons/fi";
import { setName, setRating, setRank, setIcu, setOt, setEmergency, setNameOptions } from '../../redux/features/diagnosticSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getDiagnosticList } from '../../utils/func';
import { MdCancel } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";

export const SearchableDropdown = ({ label, options, dispatch, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {

    switch (label) {
      case "Name":
        dispatch(setName(option));
        break;
      case "Rating":
        dispatch(setRating(option));
        break;
      case "Popularity Rank":
        dispatch(setRank(option));
        break;
      case "Emergency":
        dispatch(setEmergency(option));
        break;
      case "Emergency ICU":
        dispatch(setIcu(option));
        break; case "Emergency OT":
        dispatch(setOt(option));
        break;
      default:
        break;
    }
    setIsOpen(false);
  };

  const filteredOptions = options.filter((option) =>
    option.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <label className="text-gray-700">{label}</label>
      <div
        className="border border-gray-300 rounded-lg px-3 py-2 flex items-center justify-between cursor-pointer focus:border-blue-500"
      >
        <span onClick={toggleDropdown} style={{ width: "100%" }}>{onSelect?.text || `Select ${label.toLowerCase()}`}</span>
        <span className="text-gray-500">{onSelect ? <MdCancel onClick={() => {
          handleOptionClick(null);
        }}></MdCancel> : <FaAngleDown />}
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

const SearchDiagnostic = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => setIsOpen(!isOpen);

  const dispatch = useDispatch();
  const { nameOptions, name, icu, ot, rating, emergency, rank } = useSelector((state) => state.diagnostic);

  const fetchDropdownList = async () => {
    try {
      const response = await
        fetch(`https://api.aidfastbd.com/api/Dropdown/GetDropDownList?type=DiagnosticCenter`,);
      if (response.status === 200) {
        const data = await response.json();
        dispatch(setNameOptions(data));
      }
      else {
        dispatch(setNameOptions([]));

      }
    } catch (err) {
      console.error(err);
      dispatch(setNameOptions([]));
    }
  }

  let x = 0
  useEffect(() => {
    if (x == 0) {
      fetchDropdownList();
      x = 1;
    }
  }, []);


  return (
    <>


      <div onClick={togglePopup}
        className="relative flex items-center ml-3 mr-3 mb-3">
        <div className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300 shadow-lg pr-12"
        >        Search Diagnostic
        </div>

        <button
          className="absolute right-0 mr-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105"
        >
          <FiSearch className="w-5 h-5" />
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-[10000]">
          <div className="bg-white rounded-lg w-11/12 max-w-md p-6 shadow-lg overflow-y-auto max-h-[90vh]">
            <button
              onClick={togglePopup}
              className="text-gray-500 float-right text-xl"
            >
              &times;
            </button>
            <h2 className="text-center text-lg font-semibold mb-2">
              Search Diagnostic
            </h2>
            <p className="text-center text-red-500 mb-4 text-sm">
              ** search by one or multiple criteria **
            </p>

            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              getDiagnosticList({ dispatch: dispatch,isSearch:true, emergency: emergency?.value, diagnostic: name?.value, rating: rating?.value, rank: rank?.value, ot: ot?.value, icu: icu?.value });
              togglePopup();
            }}>
              <SearchableDropdown
                onSelect={name}
                label="Name"
                options={nameOptions}
                dispatch={dispatch}
              />
              <SearchableDropdown
                label="Rating"
                onSelect={rating}

                dispatch={dispatch}
                options={[{ value: 1, text: '1 Star' },
                { value: 2, text: '2 Star' },
                { value: 3, text: '3 Star' },
                { value: 4, text: '4 Star' },
                { value: 5, text: '5 Star' },]}
              />
              <SearchableDropdown
                onSelect={rank}

                dispatch={dispatch}
                label="Popularity Rank"
                options={[{ value: 1, text: 'Rank 1' },
                { value: 2, text: 'Rank 2' },
                { value: 3, text: 'Rank 3' },
                { value: 4, text: 'Rank 4' },]}
              />

              <SearchableDropdown
                dispatch={dispatch}
                label="Emergency"
                onSelect={emergency}

                options={[{ value: 'yes', text: 'Yes' },
                { value: 'no', text: 'No' }
                ]}
              />

              <SearchableDropdown
                dispatch={dispatch}
                label="Emergency ICU"
                onSelect={icu}

                options={[{ value: 'yes', text: 'Yes' },
                { value: 'no', text: 'No' }
                ]}
              />

              <SearchableDropdown
                dispatch={dispatch}
                label="Emergency OT"
                onSelect={ot}

                options={[{ value: 'yes', text: 'Yes' },
                { value: 'no', text: 'No' }
                ]}
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600"
              >
                Search
              </button>
            </form>

          </div>
        </div>
      )}
    </>
  );
};

export default SearchDiagnostic;
