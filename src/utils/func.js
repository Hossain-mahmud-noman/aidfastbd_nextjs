import { base_endpoint, headerx } from '../utils/constants'
import { setData as setDoctorData, setAddData as setAddDoctorData, setLoading as setDoctorLoading, setPage as setDoctorPage } from "../redux/features/doctorSlice";
import { setData as setDiagnosticData, setAddData as setAddDiagnosticData, setLoading as setDiagnosticLoading, setPage as setDiagnosticPage } from "../redux/features/diagnosticSlice";
import { setData as setPharmacyData, setAddData as setAddPharmacyData, setLoading as setPharmacyLoading, setPage as setPharmacyPage } from "../redux/features/pharmacySlice";
import { setData as setAmbulanceData, setAddData as setAddAmbulanceData, setLoading as setAmbulanceLoading, setPage as setAmbulancePage } from "../redux/features/ambulanceSlice";
import { setData as setBloodData, setAddData as setAddBloodData, setLoading as setBloodLoading, setPage as setBloodPage } from "../redux/features/bloodSlice";

import { setData as setDentalData, setAddData as setAddDentalData, setLoading as setDentalLoading, setPage as setDentalPage } from "../redux/features/dentalSlice";

export const removeSSRContent = (route) => {

  switch (route) {
    case "/":
      const ssrElement = document.getElementById('nearest_ssr');
      if (ssrElement) {
        ssrElement.remove();
      }
      break;
    default:
      const e = document.getElementById('ssr_grid');
      if (e) {
        e.remove();
      }
      break;
  }

};

export const getDoctorList = async ({ dispatch, isSearch = false, page = 1, lat = null, lon = null, speciality = null, doctorId = null, experience = null, fee = null, rating = null, emergency = null, rank = null, bmdc = null }) => {
  try {
    if (page == -1) {
      return;
    }

    if (isSearch) {
      removeSSRContent("/doctor");
    }
    dispatch(setDoctorLoading(true));
    let location = "";
    if (lat && lon) {
      location = `&lat=${lat}&lon=${lon}`;
    }
    let Fee = "";
    if (fee) {
      Fee = `&Fee=${fee}`;
    }
    let Experiance = "";
    if (experience) {
      Experiance = `&Experiance=${experience}`;
    }
    let Popularity = "";
    if (rank) {
      Popularity = `&Popularity=${rank}`;
    }
    let Emergency = "";
    if (emergency) {
      Emergency = `&Emergency=${emergency}`;
    }
    let Specialty = "";
    if (speciality) {
      Specialty = `&Specialty=${speciality}`;
    }
    let BMDC = "";
    if (bmdc) {
      BMDC = `&BMDCNumber=${bmdc}`;
    }
    let Rating = "";
    if (rating) {
      Rating = `&Rating=${rating}`;
    }
    let DoctorId = "";
    if (doctorId) {
      DoctorId = `&DoctorId=${doctorId}`;
    }

    const url = `${base_endpoint}/GeneralWeb/GetDoctorSearchList?pageNumber=${page}&pageSize=20${location}${Fee}${Experiance}${Popularity}${Emergency}${Specialty}${Rating}${DoctorId}${BMDC}`;
    const response = await
      fetch(url);
    if (response.status === 200) {
      const data = await response.json();
      const next = data['pageNumber'] * 20 < data['totalRecords'] ? data['pageNumber'] + 1 : -1;
      if (isSearch) {
        dispatch(setDoctorData(data['data']));
      } else {
        dispatch(setAddDoctorData(data['data']));
      }
      dispatch(setDoctorPage(next));
    }
    else {
      dispatch(setDoctorData([]));
      dispatch(setDoctorPage(-1));
    }
  } catch (err) {
    dispatch(setDoctorData([]));
  } finally {
    dispatch(setDoctorLoading(false));

  }
}

export const getDiagnosticList = async ({ dispatch, isSearch = false, page = 1, lat = null, lon = null, icu = null, ot = null, diagnostic = null, rating = null, emergency = null, rank = null }) => {
  try {
    if (page == -1) {
      return;
    }
    if (isSearch) {
      removeSSRContent("/diagnostic");
    }
    dispatch(setDiagnosticLoading(true));
    let location = "";
    if (lat && lon) {
      location = `&lat=${lat}&lon=${lon}`;
    }

    let Popularity = "";
    if (rank) {
      Popularity = `&popularity=${rank}`;
    }
    let Emergency = "";
    if (emergency) {
      Emergency = `&emergency=${emergency}`;
    }

    let Rating = "";
    if (rating) {
      Rating = `&ratngs=${rating}`;
    }
    let DiagnosticId = "";
    if (diagnostic) {
      DiagnosticId = `&diagnosticCenterId=${diagnostic}`;
    }

    let OtId = "";
    if (ot) {
      OtId = `&emergencyOT=${ot}`;
    }

    let IcuId = "";
    if (icu) {
      IcuId = `&emergencyICU=${icu}`;
    }




    const url = `${base_endpoint}/GeneralWeb/GetAllDiagnosticCenterList?pageNumber=${page}&pageSize=20${location}${Popularity}${Emergency}${Rating}${DiagnosticId}${IcuId}${OtId}`;

    const response = await
      fetch(url);
    if (response.status === 200) {
      const data = await response.json();
      const next = data['pageNumber'] * 20 < data['totalRecords'] ? data['pageNumber'] + 1 : -1;

      if (isSearch) {
        dispatch(setDiagnosticData(data['data']));
      } else {
        dispatch(setAddDiagnosticData(data['data']));
      }
      dispatch(setDiagnosticPage(next));
    }
    else {
      dispatch(setDiagnosticData([]));
      dispatch(setDiagnosticPage(-1));
    }
  } catch (err) {
    dispatch(setDiagnosticData([]));
  } finally {
    dispatch(setDiagnosticLoading(false));

  }
}

export const getPharmacyList = async ({ dispatch, isSearch = false, page = 1, lat = null, lon = null, pharmacy = null, rating = null, emergency = null, rank = null }) => {
  try {
    if (page == -1) {
      return;
    }
    if (isSearch) {
      removeSSRContent("/pharmacy");
    }
    dispatch(setPharmacyLoading(true));
    let location = "";
    if (lat && lon) {
      location = `&lat=${lat}&lon=${lon}`;
    }

    let Popularity = "";
    if (rank) {
      Popularity = `&popularity=${rank}`;
    }
    let Emergency = "";
    if (emergency) {
      Emergency = `&emergency=${emergency}`;
    }

    let Rating = "";
    if (rating) {
      Rating = `&ratngs=${rating}`;
    }
    let PharmacyId = "";
    if (pharmacy) {
      PharmacyId = `&pharmacyInformationId=${pharmacy}`;
    }

    const url = `${base_endpoint}/GeneralWeb/GetAllPharmacyList?pageNumber=${page}&pageSize=20${location}${Popularity}${Emergency}${Rating}${PharmacyId}`;

    const response = await
      fetch(url);
    if (response.status === 200) {
      const data = await response.json();

      const next = data['pageNumber'] * 20 < data['totalRecords'] ? data['pageNumber'] + 1 : -1;
      if (isSearch) {
        dispatch(setPharmacyData(data['data']));
      } else {
        dispatch(setAddPharmacyData(data['data']));
      }
      dispatch(setPharmacyPage(next));
    }
    else {
      dispatch(setPharmacyData([]));
      dispatch(setPharmacyPage(-1));
    }
  } catch (err) {
    dispatch(setPharmacyData([]));

  } finally {
    dispatch(setPharmacyLoading(false));

  }
}


export const getAmbulanceList = async ({ dispatch, isSearch = false, page = 1, lat = null, lon = null, ambulance = null, rating = null, emergency = null, rank = null }) => {
  try {
    if (page == -1) {
      return;
    }
    if (isSearch) {
      removeSSRContent("/ambulance");
    }
    dispatch(setAmbulanceLoading(true));
    let location = "";
    if (lat && lon) {
      location = `&lat=${lat}&lon=${lon}`;
    }

    let Popularity = "";
    if (rank) {
      Popularity = `&popularity=${rank}`;
    }
    let Emergency = "";
    if (emergency) {
      Emergency = `&emergency=${emergency}`;
    }

    let Rating = "";
    if (rating) {
      Rating = `&ratngs=${rating}`;
    }
    let AmbulanceId = "";
    if (ambulance) {
      AmbulanceId = `&ambulanceInformationId=${ambulance}`;
    }

    const url = `${base_endpoint}/GeneralWeb/GetAllAmbulanceList?pageNumber=${page}&pageSize=20${location}${Popularity}${Emergency}${Rating}${AmbulanceId}`;

    const response = await
      fetch(url);
    if (response.status === 200) {
      const data = await response.json();

      const next = data['pageNumber'] * 20 < data['totalRecords'] ? data['pageNumber'] + 1 : -1;
      if (isSearch) {
        dispatch(setAmbulanceData(data['data']));
      } else {
        dispatch(setAddAmbulanceData(data['data']));
      }
      dispatch(setAmbulancePage(next));
    }
    else {
      dispatch(setAmbulanceData([]));
      dispatch(setAmbulancePage(-1));

    }
  } catch (err) {
    dispatch(setAmbulanceData([]));
  } finally {
    dispatch(setAmbulanceLoading(false));

  }
}


export const getBloodList = async ({ dispatch, isSearch = false, page = 1, lat = null, lon = null, blood = null, rating = null, emergency = null, rank = null }) => {
  try {
    if (page == -1) {
      return;
    }
    if (isSearch) {
      removeSSRContent("/blood");
    }
    dispatch(setBloodLoading(true));
    let location = "";
    if (lat && lon) {
      location = `&lat=${lat}&lon=${lon}`;
    }

    let Popularity = "";
    if (rank) {
      Popularity = `&popularity=${rank}`;
    }
    let Emergency = "";
    if (emergency) {
      Emergency = `&emergency=${emergency}`;
    }

    let Rating = "";
    if (rating) {
      Rating = `&ratngs=${rating}`;
    }
    let BloodId = "";
    if (blood) {
      BloodId = `&bloodBankInformationId=${blood}`;
    }

    const url = `${base_endpoint}/GeneralWeb/GetAllBloodBankList?pageNumber=${page}&pageSize=20${location}${Popularity}${Emergency}${Rating}${BloodId}`;

    const response = await
      fetch(url);
    if (response.status === 200) {
      const data = await response.json();

      const next = data['pageNumber'] * 20 < data['totalRecords'] ? data['pageNumber'] + 1 : -1;
      if (isSearch) {
        dispatch(setBloodData(data['data']));
      } else {
        dispatch(setAddBloodData(data['data']));
      }

      dispatch(setBloodPage(next));
    }
    else {
      dispatch(setBloodData([]));
      dispatch(setBloodPage(-1));

    }
  } catch (err) {
    dispatch(setBloodData([]));
  } finally {
    dispatch(setBloodLoading(false));

  }
}


export const getDentalList = async ({ dispatch, isSearch = false, page = 1, lat = null, lon = null, dental = null, rating = null, emergency = null, rank = null }) => {
  try {
    if (page == -1) {
      return;
    }
    if (isSearch) {
      removeSSRContent("/dental");
    }
    dispatch(setDentalLoading(true));
    let location = "";
    if (lat && lon) {
      location = `&lat=${lat}&lon=${lon}`;
    }

    let Popularity = "";
    if (rank) {
      Popularity = `&popularity=${rank}`;
    }
    let Emergency = "";
    if (emergency) {
      Emergency = `&emergency=${emergency}`;
    }

    let Rating = "";
    if (rating) {
      Rating = `&ratngs=${rating}`;
    }
    let DentalId = "";
    if (dental) {
      DentalId = `&genericServiceId=${blood}`;
    }

    const url = `${base_endpoint}/GeneralWeb/GetAllBloodBankList?pageNumber=${page}&pageSize=20&serviceType=1&${location}${Popularity}${Emergency}${Rating}${DentalId}`;

    const response = await
      fetch(url);
    if (response.status === 200) {
      const data = await response.json();

      const next = data['pageNumber'] * 20 < data['totalRecords'] ? data['pageNumber'] + 1 : -1;
      if (isSearch) {
        dispatch(setDentalData(data['data']));
      } else {
        dispatch(setAddDentalData(data['data']));
      }

      dispatch(setDentalPage(next));
    }
    else {
      dispatch(setDentalData([]));
      dispatch(setDentalPage(-1));

    }
  } catch (err) {
    dispatch(setDentalData([]));
  } finally {
    dispatch(setDentalLoading(false));

  }
}





export const cancelBooking = async ({ id, token }) => {
  try {

    const url = `${base_endpoint}/GeneralInformation/CancelBooking`;
    headerx['Authorization'] = `Bearer ${token}`;
    const response = await
      fetch(url, { method: "PUT", headers: headerx, body: JSON.stringify({ "isCanceled": true, "id": id }) });

    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      window.location.reload();
    }
    else {
      alert("Something wrong")
    }
  } catch (err) {
    alert(err);
  }
}

