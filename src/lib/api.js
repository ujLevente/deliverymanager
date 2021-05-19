const BASE_DOMAIN = 'http://localhost:4000';
const ERROR_MSG = 'Error while sending request.';

export const sendRequest = async (uri, method = 'GET', body) => {
  const requestConfig = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (method !== 'GET' && body) {
    requestConfig.body = JSON.stringify(body);
  }

  const response = await fetch(BASE_DOMAIN + uri, requestConfig);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.statusText || ERROR_MSG);
  }

  return data;
};

export const deliveryApi = {
  add: (data) => sendRequest('/delivery', 'POST', data),
  getAll: async () => {
    const result = await sendRequest('/delivery');
    result.forEach((delivery) => {
      delivery.id = delivery.delivery_id;
      delete delivery.delivery_id;
    });

    return result;
  },
};
