const BASE_URL = 'http://localhost:8000';
// import axios from 'axios'

export const fetchData = async (endpoint) => {
  try {
    const resp = await fetch(`${BASE_URL}/${endpoint}`);
    if (!resp.ok) throw new Error('something went wrong');
    return await resp.json();
  } catch (err) {
    throw new Error('something went wrong');
  }
};

export const postData = async (endpoint, data) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('something went wrong');
    return response.json();
  } catch (err) {
    throw new Error('something went wrong');
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
    });
    if (!response.ok) throw new Error('something went wrong');
    return response.json();
  } catch (err) {
    throw new Error('something went wrong');
  }
};

export const deleteData = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'Delete'
    });
    if (!response.ok) throw new Error('something went wrong');
    return response.json();
  } catch (err) {
    throw new Error('something went wrong');
  }
};