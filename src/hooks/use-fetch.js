import axios from 'axios';
// const BASE_URL = 'http://localhost:8000';

const BASE_URL = 'https://tracking-system-for-cellphones.vercel.app';

const useFetch = () => {
  const postRequest = async (url, payload, options = 'application/json') => {
    try {
      const { data } = await axios.post(`${BASE_URL}/${url}`, payload, {
        withCredentials: true,
      });
      return data;
    } catch (err) {
      throw new Error(err?.response?.data?.msg);
    }
  };

  const getRequest = async (url) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/${url}`, {
        withCredentials: true,
      });
      return data;
    } catch (err) {
      throw new Error(err?.response?.data?.msg);
    }
  };

  const deleteRequest = async (url) => {
    try {
      await axios.delete(`${BASE_URL}/${url}`, {
        withCredentials: true,
      });
    } catch (err) {
      throw new Error(err?.response?.data?.msg);
    }
  };

  const putRequest = async (url, payload, options = 'application/json') => {
    try {
      const { data } = await axios.put(`${BASE_URL}/${url}`, payload, {
        withCredentials: true,
      });
      return data;
    } catch (err) {
      throw new Error(err?.response?.data?.msg);
    }
  };

  return {
    postRequest,
    getRequest,
    deleteRequest,
    putRequest,
  };
};

export default useFetch;
