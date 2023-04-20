const Api = require('./services/ApiIntegrationService')

const b = async function() {
    const api = new Api('http://localhost:3000', { userName: '123456789@gmail.com', password: '123456789' })
    const authService = api.getService('auth')
    const chatBotService = api.getService('chatBot')
    await authService.login()
    await chatBotService.createUser()
}
b()
