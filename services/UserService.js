const axios = require("../api/axiosInit");
const store = require("../store");

class UserService {
  async findUserById(id) {
    try {
      await axios.post(`${store.baseUrl}/api/users/find-one?id=${id}`);
    } catch (error) {
      console.error(error);
    }
  }

  async findUserByTgId(id) {
    try {
      await axios.post(`${store.baseUrl}/api/users/find-one?telegramId=${id}`);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = UserService
