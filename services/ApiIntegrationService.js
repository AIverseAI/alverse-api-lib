const store = require("../store");
const AuthService = require("./AuthService");
const ChatBotService = require("./ChatBotService");
/**
 *
 * @param {String} baseUrl - base api url
 * @param {Object} userData - user data { userName, password }
 */
class ApiIntegrationService {
  static instance;
  #userName;
  #password;

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
   * Availiable services - auth, chatBot
   * @param {String} serviceName - name of needed service 
   * @returns new service instance
   */
  getService(serviceName) {
    const serviceByServiceName = {
      auth: this.getAuthService,
      chatBot: this.getChatBotService
    };

    const currentService = serviceByServiceName[serviceName].bind(this);

    return currentService();
  }

  getAuthService() {
    return new AuthService(this.#userName, this.#password)
  }

  getChatBotService() {
    return new ChatBotService()
  }
}

module.exports = ApiIntegrationService;
