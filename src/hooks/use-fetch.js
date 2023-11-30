const BASE_URL = 'http://localhost:8000';

const useFetch = () => {
  const postRequest = async (url, payload, options = 'application/json') => {
    // const hasOptions = !options ? {"Content-Type":"application/json"} : options

    try {
      const resp = await fetch(`${BASE_URL}/${url}`, {
        method: 'post',
        body: JSON.stringify(payload),
        headers: {
          // "Content-Type": "application/json",
          'Content-Type': options,
        },
      });
      // console.log(resp)
      if (!resp.ok) throw new Error("something went wrong");
      const data = await resp.json();
      return data;
    } catch (err) {
      throw new Error(err);
    }
  };

  const getRequest = async (url) => {
    try {
      const resp = await fetch(`${BASE_URL}/${url}`);
      if (!resp.ok) throw new Error('oops something went wrong');
      const data = await resp.json();
      return data;
    } catch (err) {
      throw new Error(err?.message);
    }
  };

  const deleteRequest = async (url) => {
    try {
      await fetch(`${BASE_URL}/${url}`, {
        method: 'delete',
      });
    } catch (err) {
      throw new Error(err?.message);
    }
  };

  return {
    postRequest,
    getRequest,
    deleteRequest,
  };
};

export default useFetch;
