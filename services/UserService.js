/**
 * @typedef userData
 * @property {String} _id
 * @property {String} name
 * @property {String} role
 * @property {String} email
 * @property {String} telegramId
 */

const axios = require("../api/axiosInit");
const store = require("../store");

class UserService {
  /**
   * 
   * @param {String} userId 
   * @returns {{message: String, success: Boolean}}
   */
  async deleteUser(userId) {
    try {
      const { data } = await axios.delete(`${store.baseUrl}/api/users/${userId}`);
      return data
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * 
   * @param {Number} limit 
   * @param {Number} page 
   * @returns {userData[]}
   */
  async getUsers(limit, page) {
    try {
      let query = `${store.baseUrl}/api/users`

      if (limit) {
        query += `?limit=${limit}`
      }

      if (page) {
        query += `?page=${page}`
      }

      const { data } = await axios.get(query);
      return data
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * 
   * @param {Object} payload - { name, role, email, telegramId, password }
   * @returns {userData}
   */
  async createNewUser(payload) {
    try {
      const { data } = await axios.post(`${store.baseUrl}/api/users`, payload);
      return data
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * 
   * @param {String} id 
   * @returns {userData}
   */
  async findUserById(id) {
    try {
      const { data } = await axios.get(`${store.baseUrl}/api/users/find-one?id=${id}`);
      return data
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * 
   * @param {String} id 
   * @returns {userData}
   */
  async findUserByTgId(id) {
    try {
      const { data } = await axios.get(`${store.baseUrl}/api/users/find-one?telegramId=${id}`);
      return data
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = UserService;
