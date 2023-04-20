const axios = require("axios");
const store = require("../store");

async function updateToken() {
  const response = await axios.post(`${store.baseUrl}`, {
    refreshToken: store.refreshToken,
  });

  const newAccessToken = response.data.accessToken;
  const newRefreshToken = response.data.refreshToken;

  store.accessToken = newAccessToken
  store.refreshToken = newRefreshToken

  return newAccessToken;
}

const instance = axios.create({
  baseURL: store.baseUrl,
});

instance.interceptors.request.use(
  async (config) => {
    const token = store.accessToken;

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newToken = await updateToken();
      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      return instance(originalRequest);
    }

    return Promise.reject(error);
  }
);

module.exports = instance;
