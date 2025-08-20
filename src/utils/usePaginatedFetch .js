'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export const usePaginatedFetch = (url) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const firstLoadRef = useRef(false);

  const fetchData = async (pageNumber = 1) => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      // Add lat/lon if needed from localStorage
      const lat = localStorage.getItem('lat') || '';
      const lon = localStorage.getItem('lon') || '';

      const res = await axios.get(`${url}?pageNumber=${pageNumber}&lat=${lat}&lon=${lon}`);
      const response = res.data;

      const newItems = response?.data || [];
      setData((prev) => [...prev, ...newItems]);

      const totalRecords = response?.totalRecords || 0;
      const pageSize = response?.pageSize || 15;
      const totalPages = Math.ceil(totalRecords / pageSize);

      if (pageNumber >= totalPages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    if (!firstLoadRef.current) {
      fetchData(1);
      firstLoadRef.current = true;
    }
  }, [url]);

  // Load next page
  const loadNextPage = () => {
    if (loading || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage);
  };

  return { data, loading, hasMore, loadNextPage };
};
