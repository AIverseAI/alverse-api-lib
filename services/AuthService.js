const axios = require("axios");
const store = require("../store");

/**
 *  Admin authentication service, for correct work other modules, use login first
 * @param {String} username
 * @param {String} password
 */
class AuthService {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

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
