const axios = require("../api/axiosInit");
const store = require("../store");

class ChatBotService {
  /**
   *
   * @param {String} telegramId
   * @param {String} name
   */
  async createUser(telegramId, name) {
    try {
      await axios.post(
        `${store.baseUrl}/api/chat-bots/register-user/telegram`,
        { telegramId, name }
      );
    } catch (error) {
      console.error(error);
    }
  }

  /**
   *
   * @param {String} telegramId
   * @param {Object} data
   */
  async updateUser(telegramId, data) {
    try {
      await axios.patch(
        `${store.baseUrl}/api/chat-bots/chats/telegram/${telegramId}`,
        data
      );
    } catch (error) {
      console.error(error);
    }
  }

  /**
   *
   * @param {String} telegramId
   * @param {String} message
   */
  async getUserGeneration(telegramId, message) {
    try {
      const payload = { telegramId, message };
      await axios.post(
        `${store.baseUrl}/api/chat-bots/generation/telegram`,
        payload
      );
    } catch (error) {
      console.error(error);
    }
  }

  async getMe() {
    try {
      await axios.get(`${store.baseUrl}/api/chat-bots/me`);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = ChatBotService;
