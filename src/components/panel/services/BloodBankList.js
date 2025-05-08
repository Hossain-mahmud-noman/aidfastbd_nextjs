import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setLoading,
  setPage,
  setPanelData, setUpdateData, setSearch, setSlugFilter
} from '../../../redux/features/panel/panel-bloodSlice';
import axios from 'axios';


import BloodCard from '../components/BloodCard';
import Pagination from '../components/Pagination';
import SearchFilter from '../components/SearchFilter';



export const fetchDatas = async (dispatch, { page, search_query, slug = false }) => {
  dispatch(setLoading(true));
  try {

    const params = { page };

    if (search_query) {
      params.search_query = search_query;
    }

    if (slug) {
      params.slug = slug;
    }
    const res = await axios.get('https://api2.aidfastbd.com/blood/', {
      params
    });

    // You can dispatch a reducer here to store the diagnostics and totalPages
    dispatch(setPanelData(
      res.data,
    )
    );

    dispatch(setLoading(false));
  } catch (error) {
    console.error('Error fetching diagnostics:', error);
    dispatch(setLoading(false));
    // Optionally set an error message in state
  }
};

function BloodBankList() {

  const dispatch = useDispatch();
  const { data, loading, currentPage, totalPages, search, slugFilter } = useSelector(
    (state) => state.panelBlood
  );


  useEffect(() => {
    fetchDatas(dispatch, { page: currentPage, search_query: search, slug: slugFilter });
  }, [dispatch, currentPage]);



  return (
    <div className="max-w-5xl mx-auto px-4">
      <SearchFilter value={search} onInputChange={(e) => {
        dispatch(setSearch(e));
      }} filterValue={slugFilter} onFilterChange={(e) => {
        dispatch(setSlugFilter(e));
      }} searchClick={() => {
        fetchDatas(dispatch, { page: currentPage, search_query: search, slug: slugFilter });
      }} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-4 mb-3">
            {data.map((doc) => (
              <BloodCard key={doc.id} service={doc} onSave={(e) => {
                dispatch(setUpdateData(e));
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
    </div>)
}

export default BloodBankList