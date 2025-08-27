import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

export const isLoggedIn = () => {
  return Cookies.get('__user__authToken') || Cookies.get('accessToken');
};
const getUserToken = () => {
  if (Cookies.get('accessToken')) {
    return Cookies.get('accessToken');
  } else return false;
};

export const showErrorMessage = (message) => {
  if (message instanceof Array) {
    message.forEach((msg) => toast.error(msg));
  } else {
    toast.error(message);
  }
};

const responseFormatter = (status, data, error) => {
  return { status, data: data || null, error };
};

const handleApiError = (err) => {
  return responseFormatter(false, null, err.response?.data);
};

export const postReq = async (endpoint, data) => {
  const url = process.env.REACT_APP_DEV_API + endpoint;
  const headers = {
    Accept: 'application/json',
    // Authorization: `Bearer ${getUserToken()}`,
  };
  return await axios
    .post(url, data, { withCredentials: true, headers })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((err) => {
      return handleApiError(err);
    });
};
export const postAuthReq = async (endpoint, data) => {
  const url = process.env.REACT_APP_DEV_API + endpoint;
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${getUserToken()}`,
  };
  return await axios
    .post(url, data, { withCredentials: true, headers })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((err) => {
      console.log(err, 'err');
      return handleApiError(err);
    });
};

export const patchReq = async (endpoint, data) => {
  const url = process.env.REACT_APP_DEV_API + endpoint;

  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${getUserToken()}`,
  };

  return await axios
    .patch(url, data, { withCredentials: true, headers })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((err) => {
      return handleApiError(err);
    });
};
export const putReq = async (endpoint, data) => {
  const url = process.env.REACT_APP_DEV_API + endpoint;

  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${getUserToken()}`,
  };

  return await axios
    .put(url, data, { withCredentials: true, headers })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((err) => {
      return handleApiError(err);
    });
};

export const getWReq = async (endpoint) => {
  const url = process.env.REACT_APP_WEB_API_URL + endpoint;

  return await axios
    .get(url, { withCredentials: true })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((err) => {
      return handleApiError(err);
    });
};

export const getReq = async (endpoint) => {
  const url = process.env.REACT_APP_DEV_API + endpoint;

  const headers = {
    Accept: 'application/json',
    // Authorization: `Bearer ${getUserToken()}`,
  };

  return await axios
    .get(url, { withCredentials: true, headers })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((err) => {
      return handleApiError(err);
    });
};

export const getScannerReq = async (endpoint) => {
  const url = process.env.REACT_APP_SCANNER_DEV_API + endpoint;
  const headers = {
    Accept: 'application/json',
    // Authorization: `Bearer ${getUserToken()}`,
  };
  return await axios
    .get(url, { withCredentials: true, headers })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((err) => {
      return handleApiError(err);
    });
};

export const deleteReq = async (endpoint) => {
  const url = process.env.REACT_APP_DEV_API + endpoint;

  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${getUserToken()}`,
  };

  return await axios
    .delete(url, { withCredentials: true, headers })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((err) => {
      return handleApiError(err);
    });
};

export const postFile = async (endpoint, data) => {
  const url = process.env.REACT_APP_DEV_API + endpoint;
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${getUserToken()}`,
    'Content-Type': 'multipart/form-data',
  };

  try {
    const response = await axios.post(url, data, {
      withCredentials: true,
      headers,
    });
    return responseFormatter(true, response.data, null);
  } catch (err) {
    return handleApiError(err);
  }
};

export const getAuthReq = async (endpoint) => {
  const url = process.env.REACT_APP_DEV_API + endpoint;
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${getUserToken()}`,
  };

  return await axios
    .get(url, { withCredentials: true, headers })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((err) => {
      return handleApiError(err);
    });
};

export const getEsimation = async (endpoint) => {
  const url = process.env.API_URL_ESTIMATATION + endpoint;
  // const headers = {
  //   Accept: 'application/json',
  // };

  return await axios
    .get(url, { withCredentials: true })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((err) => {
      return handleApiError(err);
    });
};

export const imageUrl = 'https://ik.imagekit.io/avboeabnm1';
