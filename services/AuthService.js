const axios = require("axios");
const store = require("../store");

class AuthService {
  /**
   *
   * @param {String} username
   * @param {String} password
   */
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  /**
   * @description login user in system
   * @returns {{accessToken: String, refreshToken: String}}
   */
  async login() {
    const payload = { password: this.password, username: this.username };
    try {
      const { accessToken, refreshToken } = (
        await axios.post(`${store.baseUrl}/api/auth/login`, payload)
      )?.data;
      store.accessToken = accessToken;
      store.refreshToken = refreshToken;

      return { accessToken, refreshToken };
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = AuthService;
