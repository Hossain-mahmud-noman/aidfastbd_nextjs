'use client';
import React, { useEffect, useState } from 'react';
import { FiSearch } from "react-icons/fi";
import { setName, setRating, setRank, setEmergency, setNameOptions, setExperienceOptions, setFeeOptions, setSpecialityOptions, setFee, setSpeciality, setExperience, setBMDC } from '../../redux/features/doctorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorList } from '../../utils/func';
import { MdCancel } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import { base_endpoint } from '../../utils/constants';
import DoctorCard from '../DoctorCard';
import Image from 'next/image';
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
      case "Fee":
        dispatch(setFee(option));
        break; case "Speciality":
        dispatch(setSpeciality(option));
        break;
      case "Fee":
        dispatch(setFee(option));
        break;
      case "Experience":
        dispatch(setExperience(option));
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


const SearchDoctor = ({ specialityData = [] }) => {

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();

  const { nameOptions, bmdc, feeOptions, name, fee, experience, experienceOptions, speciality, specialityOptions, rating, emergency, rank } = useSelector((state) => state.doctor);



  const fetchDropdownFeeList = async () => {
    try {
      const response = await
        fetch(`https://api.aidfastbd.com/api/Dropdown/GetDropDownList?type=Fee`,);
      if (response.status === 200) {
        const data = await response.json();
        dispatch(setFeeOptions(data));
      }
      else {
        dispatch(setFeeOptions([]));

      }
    } catch (err) {
      console.error(err);
      dispatch(setFeeOptions([]));
    }
  }

  const fetchDropdownExperienceList = async () => {
    try {
      const response = await
        fetch(`https://api.aidfastbd.com/api/Dropdown/GetDropDownList?type=Experience`,);
      if (response.status === 200) {
        const data = await response.json();
        dispatch(setExperienceOptions(data));
      }
      else {
        dispatch(setExperienceOptions([]));

      }
    } catch (err) {
      console.error(err);
      dispatch(setExperienceOptions([]));
    }
  }

  const fetchDropdownGetAllDoctorList = async () => {
    try {
      const response = await
        fetch(`https://api.aidfastbd.com/api/GeneralWeb/GetAllDoctorList`,);
      if (response.status === 200) {
        const data = await response.json();

        const transformedData = data.map((item) => {
          return {
            value: item.id,
            text: item.name
          };
        }
        );
        dispatch(setNameOptions(transformedData));
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
      fetchDropdownGetAllDoctorList();
      dispatch(setSpecialityOptions(specialityData));
      fetchDropdownFeeList();
      fetchDropdownExperienceList();
      x = 1;
    }
  }, []);

  const [spData, setSpData] = useState([]);
  const [spActive, setSpActive] = useState(null);
  const [spLoading, setSpLoading] = useState(false);

  return (
    <>
      <div onClick={togglePopup}
        className="relative flex items-center ml-3 mr-3 mb-3">
        <div className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300 shadow-lg pr-12"
        >Search Doctor</div>

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
              Search Doctor
            </h2>
            <p className="text-center text-red-500 mb-4 text-sm">
              ** search by one or multiple criteria **
            </p>


            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              getDoctorList({ dispatch: dispatch, isSearch: true, speciality: speciality?.text, emergency: emergency?.value, experience: experience?.text, fee: fee?.text, doctorId: name?.value, rating: rating?.value, rank: rank?.value, bmdc: bmdc });
              togglePopup();
            }}>
              <SearchableDropdown
                onSelect={name}
                label="Name"
                options={nameOptions}
                dispatch={dispatch}
              />

              <SearchableDropdown
                onSelect={speciality}
                label="Speciality"
                options={specialityOptions}
                dispatch={dispatch}
              />

              <SearchableDropdown
                onSelect={experience}
                label="Experience"
                options={experienceOptions}
                dispatch={dispatch}
              />
              <SearchableDropdown
                onSelect={fee}
                label="Fee"
                options={feeOptions}
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
              <div>
                <label className="text-gray-700">Membership</label>
                <input
                  type="text"
                  onChange={(e) => {
                    if (e.target.value
                      !== "") {
                      dispatch(setBMDC(e.target.value
                      ));
                    } else {
                      dispatch(setBMDC(null));
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                  placeholder="BMDC Number"
                />
              </div>
              <SearchableDropdown
                dispatch={dispatch}
                label="Emergency"
                onSelect={emergency}

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


      <div className='mb-10'>
        <h3 className="text-lg ml-3 mb-2">Speciality</h3>

        <div className="w-full overflow-x-scroll">
          <div className="flex gap-3 px-4">
            {specialityData.map((speciality, index) => (
              <div
                key={index}
                onClick={async () => {


                  try {
                    setSpLoading(true);
                    let Specialty = "";
                    if (speciality) {
                      Specialty = `&Specialty=${speciality.text}`;
                    }
                    let location = "";
                    // Store the coordinates in local storage
                    let lat = localStorage.getItem("lat");
                    let lon=localStorage.getItem("lon");
                    if (lat && lon) {
                      location = `&lat=${lat}&lon=${lon}`;
                    }
                    const url = `${base_endpoint}/GeneralWeb/GetDoctorSearchList?pageNumber=1&pageSize=40${Specialty}${location}`;
                    const response = await
                      fetch(url);
                    if (response.status === 200) {
                      const data = await response.json();
                      const next = data['pageNumber'] * 20 < data['totalRecords'] ? data['pageNumber'] + 1 : -1;

                      setSpData(data['data']);

                    }
                    else {
                      setSpData([]);
                    }
                  } catch (err) {
                    setSpData([]);

                  } finally {
                    setSpLoading(false);

                  }

                  setSpActive(index === spActive ? null : index);

                }}
                className={`flex-shrink-0 w-[150px] h-[220px] bg-white shadow-lg rounded-lg p-1 ${index === spActive ? "border-green-500 border-t-4 border-2" : ""
                  }`}
              >
                <Image
                  width={150}
                  height={150}
                  src={speciality.imageUrl}
                  alt={speciality.text}
                  className="w-full object-cover rounded-t-lg"
                />
                <div className="mt-4 text-center">
                  <p className="text-sm font-semibold">{speciality.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>


        {spActive !== null && (spLoading == false && spData.length == 0) ? <div className='h-[180px] w-full flex items-center justify-center text-2xl'>No data Speciality available</div> :
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {spActive !== null && spData.map((d, index) => (
              <DoctorCard key={`Speciality_${index}`} doctor={d}></DoctorCard>
            ))
            }
          </div>}
      </div>

      {spActive !== null && <h3 className="text-lg ml-3 mb-2">Nearest Doctor</h3>}

    </>

  );
};

export default SearchDoctor;
