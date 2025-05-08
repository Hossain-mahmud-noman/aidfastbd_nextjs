import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setLoading,
  setPage,
  setPanelData, setSearch, setUpdateDoctor, setSlugFilter
} from '../../../redux/features/panel/panel-doctorSlice';
import axios from 'axios';
import DoctorCard from '../components/DoctorCard';
import Pagination from '../components/Pagination';
import SearchFilter from '../components/SearchFilter';


export const fetchDoctors = async (dispatch, { page, search_query, slug = false }) => {
  dispatch(setLoading(true));
  try {

    
    const params = { page };

    if (search_query) {
      params.search_query = search_query;
    }

    if (slug) {
      params.slug = slug;
    }

    const res = await axios.get('https://api2.aidfastbd.com/doctor/', {
      params,
    });


    // You can dispatch a reducer here to store the doctors and totalPages
    dispatch(setPanelData(
      res.data,
    )
    );

    dispatch(setLoading(false));
  } catch (error) {
    console.error('Error fetching doctors:', error);
    dispatch(setLoading(false));
    // Optionally set an error message in state
  }
};

export default function Doctors() {


  const dispatch = useDispatch();

  const { doctors, loading, currentPage, totalPages, search, slugFilter } = useSelector(
    (state) => state.panelDoctor
  );


  useEffect(() => {
    fetchDoctors(dispatch, { page: currentPage, search_query: search, slug: slugFilter });
  }, [dispatch, currentPage]);


  return (
    <div className="max-w-5xl mx-auto px-4">
      <SearchFilter value={search} onInputChange={(e) => {
        dispatch(setSearch(e));
      }} filterValue={slugFilter} onFilterChange={(e) => {
        dispatch(setSlugFilter(e));
      }} searchClick={() => {
        fetchDoctors(dispatch, { page: currentPage, search_query: search, slug: slugFilter });
      }} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-4 mb-3">
            {doctors.map((doc) => (
              <DoctorCard key={doc.id} service={doc} onSave={(e) => {
                dispatch(setUpdateDoctor(e));
              }} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => dispatch(setPage(page))}
          />
        </>
      )}
    </div>
  );
}
