"use client";
import { useEffect, useState } from "react";

const DataLoad = ({ apiUrl, onDataLoad }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    onDataLoad?.([], true); 
    try {
      const res = await fetch(apiUrl);
      const json = await res.json();
      const fetchedData = json || [];
      setData(fetchedData);
      onDataLoad?.(fetchedData, false); 
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setData([]);
      onDataLoad?.([], false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (apiUrl) {
      getData();
    }
  }, [apiUrl]);

  return null;
};

export default DataLoad;
