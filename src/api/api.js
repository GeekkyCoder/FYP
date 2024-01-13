// const BASE_URL = 'http://localhost:8000';

const BASE_URL = 'https://phone-tracker-flame.vercel.app';

import axios from 'axios';

export const fetchData = async (endpoint) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${endpoint}`, {
      withCredentials: true,
    });
    return data;
  } catch (err) {
    throw new Error(err?.response?.data?.msg);
  }
};

export const postData = async (endpoint, payload) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/${endpoint}`, payload, {
      withCredentials: true,
    });
    return data;
  } catch (err) {
    throw new Error(err?.response?.data?.msg);
  }
};

export const putData = async (endpoint, data) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    if (!response.ok) throw new Error('something went wrong');
    return response.json();
  } catch (err) {
    throw new Error('something went wrong');
  }
};

export const deleteData = async (endpoint) => {
  try {
    const { data } = await axios.delete(`${BASE_URL}/${endpoint}`, {
      withCredentials: true,
    });
  } catch (err) {
    throw new Error(err?.response?.data?.msg);
  }
};
