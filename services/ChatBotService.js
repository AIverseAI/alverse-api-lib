const axios = require("../api/axiosInit");
const store = require("../store");

class ChatBotService {
  /**
   *
   * @param {String} chatBotId
   * @returns {Object} - {message, success: true|false }
   */
  async deleteChatBot(chatBotId) {
    try {
      const { data } = await axios.delete(
        `${store.baseUrl}/api/chat-bots/${chatBotId}`
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   *
   * @param {Object} payload - chat bot payload
   * @returns {Object} - { user: { _id, name, role, email, telegramId } }
   */
  async registerChatBot(payload) {
    try {
      const { data } = await axios.post(
        `${store.baseUrl}/api/chat-bots/register`,
        payload
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   *
   * @param {String} telegramId
   * @param {String} name
   */
  async createUser(telegramId, name) {
    try {
      const { data } = await axios.post(
        `${store.baseUrl}/api/chat-bots/register-user/telegram`,
        { telegramId, name }
      );

      return data;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   *
   * @param {String} chatBotId
   * @param {Object} payload
   * @returns {Object} - { message, success: true|false }
   */
  async editChatBotById(chatBotId, payload) {
    try {
      const { data } = await axios.patch(
        `${store.baseUrl}/api/chat-bots/${chatBotId}`,
        payload
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   *
   * @param {String} telegramId
   * @param {Object} paylod
   * @returns {Object}
   */
  async updateChatBot(telegramId, paylod) {
    try {
      const { data } = await axios.patch(
        `${store.baseUrl}/api/chat-bots/chats/telegram/${telegramId}`,
        paylod
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   *
   * @param {String} telegramId
   * @param {Object} payload
   */
  async updateUser(telegramId, payload) {
    try {
      const { data } = await axios.patch(
        `${store.baseUrl}/api/chat-bots/chats/telegram/${telegramId}`,
        payload
      );

      return data;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   *
   * @param {String} chatBotId
   * @returns {Object}
   */
  async findOneChatBot(chatBotId) {
    try {
      const { data } = await axios.get(
        `${store.baseUrl}/api/chat-bots/find-one?chatbot_id=${chatBotId}`
      );
      return data;
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
      const { data } = await axios.post(
        `${store.baseUrl}/api/chat-bots/generation/telegram`,
        payload
      );

      return data;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   *
   * @param {String} telegramId
   */
  async findOneChatBotByTgId(telegramId) {
    try {
      const { data } = await axios.get(
        `${store.baseUrl}/api/chat-bots/chats/telegram/find-one?telegramId=${telegramId}`
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   *
   * @param {Number} limit
   * @param {Number} page
   * @returns {Array}
   */
  async getAllChatBots(limit, page) {
    try {
      let query = `${store.baseUrl}/api/chat-bots`;

      if (limit) {
        query += `?limit=${limit}`;
      }

      if (page) {
        query += `?page=${page}`;
      }

      const { data } = await axios.get(query);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async getAllChatBotsChats() {
    try {
      const { data } = await axios.get(`${store.baseUrl}/api/chat-bots/chats/`);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async getMe() {
    try {
      const { data } = await axios.get(`${store.baseUrl}/api/chat-bots/me`);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = ChatBotService;
