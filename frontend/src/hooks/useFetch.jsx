import { useState, useEffect } from 'react'; 

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const stableUrl = typeof url === 'string' ? url : '';
  const stableOptions = typeof options === 'object' ? options : {};

  useEffect(() => {
    const fetchData = async () => {
      if (!stableUrl) {
        setError("URL is required for fetching data");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(stableUrl, stableOptions);
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.message || "An error occurred while fetching data");
        }

        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [stableUrl, stableOptions]);

  return { data, loading, error };
};

export default useFetch;
