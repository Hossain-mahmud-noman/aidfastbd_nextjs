"use client";

import React, { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { image_base_endpoint } from "../../../utils/constants";
import Image from "next/image";

import { toast } from "sonner";
// Reusable InputField component
function InputField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
}) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
      />
    </div>
  );
}

function Dropdown({ label, options, value, onChange, required = false }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <select
        value={value} // Use value for controlled dropdown behavior
        onChange={onChange}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
      >
        <option value="" disabled>
          Select {label}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}

function DoctorProfileBasic({ data, user, token }) {
  const [specialities, setSpecialities] = useState([]);
  const [gender, setGender] = useState("");
  const [BMDCType, setBMDCType] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameBn, setFirstNameBn] = useState("");
  const [lastNameBn, setLastNameBn] = useState("");
  const [degree, setDegree] = useState("");
  const [nidNumber, setNidNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [medicalCollege, setMedicalCollege] = useState("");
  const [batch, setBatch] = useState("");
  const [session, setSession] = useState("");
  const [designation, setDesignation] = useState("");
  const [bmdcNumber, setBMDCNumber] = useState("");
  const [bmdcRegistration, setBmdcRegistration] = useState("");
  const [experienceAfterMbbs, setExperienceAfterMbbs] = useState("");
  const [chamberFee, setChamberFee] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [workingPlace, setWorkingPlace] = useState("");
  const [bcsType, setbcsType] = useState("");
  const [postDegree, setPostDegree] = useState("");
  const [otherDegree, setOtherDegree] = useState("");

  const [selectedLogo, setSelectedLogo] = useState(null);

  useEffect(() => {
    if (data) {
      setFirstName(data?.firstName);
      setFirstNameBn(data?.firstNameBn);
      setLastName(data?.lastName);
      setLastNameBn(data?.lastNameBn);
      setNidNumber(data?.nidNumber);
      setGender(data?.genderInformationId);
      setBMDCType(data?.bmdcRegistrationNumberId);
      setPostDegree(data?.postGraduationDegree);
      setOtherDegree(data?.qualification);
      setPhoneNumber(data?.mobileNoOrEmail);
      setDateOfBirth(data?.birthDate ? data?.birthDate.split("T")[0] : "");
      setBatch(data?.batch);
      setDegree(data?.degreeName);
      setMedicalCollege(data?.medicalCollege);
      setSession(data?.session);
      setbcsType(data?.bcsTypeId);
      setBMDCNumber(data?.bmdCnumber);
      setBmdcRegistration(data?.bmdCnumber);
      setWorkingPlace(data?.currentWorkingPlace);
      setChamberFee(data?.doctorFee);
      setDesignation(data?.designation);
      setEmergencyContact(data?.emergencyNo);
      setExperienceAfterMbbs(data?.experience);

      if (data?.speciality) {
        setSelectedSpeciality(data.speciality.split(","));
      }

      setSelectedLogo(image_base_endpoint + data.imageUrl);
    }
  }, [data]);

  useEffect(() => {
    fetchSpecialities();
  }, []);

  const fetchSpecialities = async () => {
    try {
      const res = await fetch(
        "https://api.aidfastbd.com/api/Dropdown/GetDropDownList?type=Speciality"
      );
      if (!res.ok) throw new Error("Failed to fetch specialities");
      const data = await res.json();
      setSpecialities(data);
    } catch (error) {
      console.error("Error fetching specialities:", error);
    }
  };

  const handleImageChange = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size should be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeSpeciality = (index) => {
    setSelectedSpeciality(selectedSpeciality.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("FirstName", firstName);
    formData.append("LastName", lastName);
    formData.append("FirstNameBn", firstNameBn);
    formData.append("LastNameBn", lastNameBn);
    formData.append("NIDNumber", nidNumber);
    formData.append("Gender", gender);
    formData.append("MobileNoOrEmail", phoneNumber);
    formData.append("Designation", designation);
    formData.append("DoctorFee", chamberFee);
    formData.append("EmergencyNo", emergencyContact);
    formData.append("CurrentWorkingPlace", workingPlace);
    formData.append("BMDCRegistrationNumberType", BMDCType);
    formData.append("BMDCnumber", bmdcNumber);
    formData.append("Degree", degree);
    formData.append("BCSType", bcsType);
    formData.append("PostGraduationDegree", postDegree);
    formData.append("Subject", "");
    formData.append("Speciality", selectedSpeciality.join(","));
    formData.append("MedicalCollege", medicalCollege);
    formData.append("Batch", batch);
    formData.append("Session", session);
    formData.append("UserId", user?.id);
    formData.append("BirthDate", dateOfBirth);
    formData.append("Qualification", otherDegree);
    formData.append("Experience", experienceAfterMbbs);


    if (selectedLogo) {
      if (
        typeof selectedLogo === "string" &&
        !selectedLogo.startsWith(image_base_endpoint)
      ) {
        // If it's a URL (not a local file), fetch it and convert to a blob
        const blob = await fetch(selectedLogo).then((res) => res.blob());
        // Append the fetched image as a blob with a name for the file
        formData.append("File", blob, "image.jpg"); // You can add dynamic filename extensions here if needed
      } else if (selectedLogo instanceof File) {
        // If selectedLogo is already a File object, just append it
        formData.append("File", selectedLogo);
      }
    }

    try {
      const response = await fetch(
        "https://api.aidfastbd.com/api/GeneralInformation/DoctorInformationSave",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            // No need to specify Content-Type for FormData
          },
          body: formData,
        }
      );

      if (!response.ok) {
        toast.error("Something went wrong!, Please Try Again");
      }

      const result = await response.json();
      toast.success("Profile saved successfully!");
    } catch (error) {
      toast.error("Something went wrong!, Please Try Again");
      console.error("Error submitting the form:", error);

    };
  }

  return (
    <div className="bg-white shadow-md rounded-lg w-full max-w-3xl mx-auto p-6">
      <h2 className="text-xs font-semibold text-gray-700 mb-4">
        Add a Profile Picture
      </h2>

      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {selectedLogo ? (
              <Image
                width={100}
                height={100}
                src={selectedLogo}
                alt="Profile/Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-lg">+</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, setSelectedLogo)}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>

      {/* Name Section */}
      <div className="mb-4 w-full">
        <label className="block text-sm font-medium text-gray-700 mb-2 w-full">
          Name in English
        </label>
        <div className="flex gap-2 w-full">
          <InputField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
          <InputField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
        </div>
      </div>

      {/* Name Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          নাম বাংলা ভাষা
        </label>
        <div className="flex gap-2">
          <InputField
            label="নামের প্রথম অংশ"
            value={firstNameBn}
            onChange={(e) => setFirstNameBn(e.target.value)}
            placeholder="প্রথম অংশ "
          />
          <InputField
            label="নামের শেষ অংশ"
            value={lastNameBn}
            onChange={(e) => setLastNameBn(e.target.value)}
            placeholder="শেষ  অংশ "
          />
        </div>
      </div>

      <p className="text-xm text-red-500 mb-4">
        ** Name should be same as BMDC registration certificate. After
        submission, name cannot be changed or edited **
      </p>

      {/* Degree Section */}

      <Dropdown
        label="Degree"
        options={[
          {
            value: "41C6856B-4531-4C16-BB6D-08DB62033D21".toLowerCase(),
            text: "MBBS",
          },
          {
            value: "2BCAE9D2-C382-4405-BA41-F926E20D7306".toLowerCase(),
            text: "BDS",
          },
          {
            value: "9B4B6BA9-FED7-4655-B433-537490898290".toLowerCase(),
            text: "MD (Rusia)",
          },
        ]}
        value={degree}
        onChange={(e) => setDegree(e.target.value)}
      />
      <Dropdown
        label="BCS"
        options={[
          {
            value: "3DC212B3-2D0E-4FA3-B359-08DB62041BE3".toLowerCase(),
            text: "Health",
          },
          {
            value: "5998B807-487C-4800-858F-F2200D35FA95".toLowerCase(),
            text: "No",
          },
        ]}
        value={bcsType}
        onChange={(e) => setbcsType(e.target.value)}
      />

      <InputField
        label="Post Graduation Degress with Subject"
        value={postDegree}
        onChange={(e) => setPostDegree(e.target.value)}
        placeholder="Enter degree"
      />

      <InputField
        label="Other Degree with Subject"
        value={otherDegree}
        onChange={(e) => setOtherDegree(e.target.value)}
        placeholder="Enter degree"
      />

      {/* Speciality Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Speciality
        </label>
        <select
          value=""
          onChange={(e) => {
            const newSpeciality = e.target.value;
            if (!selectedSpeciality.includes(newSpeciality)) {
              setSelectedSpeciality([...selectedSpeciality, newSpeciality]);
            } else {
              alert("This speciality is already added");
            }
          }}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="" disabled>
            Select Speciality
          </option>
          {specialities.map((speciality) => (
            <option key={speciality.value} value={speciality.text}>
              {speciality.text}
            </option>
          ))}
        </select>
        <div className="mt-4">
          {selectedSpeciality.map((speciality, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-200 rounded-md p-2 mb-2"
            >
              <span>{speciality}</span>
              <button
                onClick={() => removeSpeciality(index)}
                className="text-red-500 hover:text-red-700"
              >
                ✖
              </button>
            </div>
          ))}
        </div>
      </div>

      <InputField
        label="Designation"
        value={designation}
        onChange={(e) => setDesignation(e.target.value)}
        placeholder="Enter your position"
      />

      <Dropdown
        label="BMDC Registration Type"
        options={[
          {
            value: "98B91DDC-4523-499D-8E89-884E750BB588".toLowerCase(),
            text: "Temporary",
          },
          {
            value: "4C1BF16C-C81F-43CB-F578-08DB6203C497".toLowerCase(),
            text: "Permanent",
          },
        ]}
        value={BMDCType}
        onChange={(e) => setBMDCType(e.target.value)}
      />
      <InputField
        label="BMDC Registration Number"
        value={bmdcNumber}
        onChange={(e) => setBMDCNumber(e.target.value)}
        placeholder="Registration Number"
      />

      <hr className="my-6" />

      <InputField
        label="Experience after MBBS"
        value={experienceAfterMbbs}
        onChange={(e) => setExperienceAfterMbbs(e.target.value)}
        placeholder="Year"
      />

      <InputField
        label="Chamber Fee"
        value={chamberFee}
        onChange={(e) => setChamberFee(e.target.value)}
        placeholder="Fee TK"
      />
      <InputField
        label="Emergency Contact Number"
        value={emergencyContact}
        onChange={(e) => setEmergencyContact(e.target.value)}
        placeholder="Contact Number"
      />
      <p className="text-xm text-red-500 mb-4">
        ** If you want to provide emergency service add an emergency contact
        number, otherwise skip **
      </p>

      <InputField
        label="Working Place"
        value={workingPlace}
        onChange={(e) => setWorkingPlace(e.target.value)}
        placeholder="Current"
      />
      <hr className="my-6" />
      <p className="text-xl text-blue-500 mb-4">
        Information for our database and authentication: <br></br>(All
        information give below will be kept private. Only you can see this.)
      </p>

      {/* Gender Dropdown */}
      <Dropdown
        label="Gender"
        options={[
          {
            value: "6AEA5873-BA76-4C60-A3D4-9A02530D5705".toLowerCase(),
            text: "Female",
          },
          {
            value: "5E579E98-EA2A-4196-B9F2-08DB61E8F0B1".toLowerCase(),
            text: "Male",
          },
        ]}
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />

      {/* Date of Birth Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date of Birth
        </label>
        <div className="relative">
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <FaCalendarAlt className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Other Input Fields */}
      <InputField
        label="NID Number"
        value={nidNumber}
        onChange={(e) => setNidNumber(e.target.value)}
        placeholder="Enter NID Number"
      />
      <InputField
        label="Personal Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter Phone Number"
      />
      <InputField
        label="Medical College"
        value={medicalCollege}
        onChange={(e) => setMedicalCollege(e.target.value)}
        placeholder="Enter your medical college name"
      />
      <InputField
        label="Medical College Batch"
        value={batch}
        onChange={(e) => setBatch(e.target.value)}
        placeholder="Enter your batch"
      />
      <InputField
        label="Medical College Session"
        value={session}
        onChange={(e) => setSession(e.target.value)}
        placeholder="Enter your session"
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Save/Update Profile
      </button>
    </div>
  );
}

export default DoctorProfileBasic;
