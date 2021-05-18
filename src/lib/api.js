const BASE_DOMAIN = 'http://localhost:4000';
const ERROR_MSG = 'Error while sending request.';

const sendRequest = async (uri, method = 'GET', body) => {
  const requestConfig = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if ((method === 'POST' || method === 'PUT') && body) {
    requestConfig.body = JSON.stringify(body);
  }

  const response = await fetch(BASE_DOMAIN + uri, requestConfig);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || ERROR_MSG);
  }

  return data;
};

export const deliveryApi = {
  add: (data) => sendRequest('/delivery', 'POST', data),
  getAll: () => sendRequest('/delivery'),
};
