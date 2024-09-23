import config from './config';

export async function fetchData({ endpoint, method, body, token }) {
  const url = `${config.apiHost}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const options = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const responseJson = await response.json();
    if (!response.ok) {
      throw responseJson;
    }

    return responseJson;
  } catch (error) {
    throw error;
  }
}