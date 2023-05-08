/**
 * @typedef {Object} ApiServices
 * @property {AuthService} auth - AuthService instance
 * @property {ChatBotService} chatBot - ChatBotService instance
 * @property {UserService} user - UserService instance
 */

const store = require("../store");
const AuthService = require("./AuthService");
const ChatBotService = require("./ChatBotService");
const UserService = require("./UserService");
class ApiIntegrationService {
  static instance;
  #userName;
  #password;

  /**
   *
   * @param {String} baseUrl - base api url
   * @param {Object} userData - user data { userName, password }
   */
  constructor(baseUrl, userData) {
    if (ApiIntegrationService.instance) {
      return ApiIntegrationService.instance;
    }

    store.baseUrl = baseUrl;
    this.#userName = userData?.userName;
    this.#password = userData?.password;

    ApiIntegrationService.instance = this;
  }

  /**
   * @template {keyof ApiServices} K
   * @param {K} serviceName - The name of the desired service. Possible values: "auth", "chatBot", "user".
   * @returns {ApiServices[K]} An instance of the specified service with available class methods.
   * @example
   * const authService = ApiIntegrationService.getService("auth");
   * 
   * const userService = ApiIntegrationService.getService("user")
   * 
   * const userService = ApiIntegrationService.getService("chatBot")
   */
  getService(serviceName) {
    const serviceByServiceName = {
      auth: this.#getAuthService,
      chatBot: this.#getChatBotService,
      user: this.#getUserService,
    };

    const currentService = serviceByServiceName[serviceName].bind(this);

    return currentService();
  }

  #getAuthService() {
    return new AuthService(this.#userName, this.#password);
  }

  #getChatBotService() {
    return new ChatBotService();
  }

  #getUserService() {
    return new UserService();
  }
}

module.exports = ApiIntegrationService;
