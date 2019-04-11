const api = require('./api/routes')
const rabbit = require('./lib/plugins/rabbit')

module.exports = {
  // Routes
  prefix: '/api',
  routes: [
    api
  ],

  // Plugins
  registrations: [
    '@bakjs/mongo',
    '@bakjs/logging',
    '@bakjs/auth',
    '@bakjs/policy',
    { register: rabbit }
  ],

  // Plugin options
  auth: {
    user_model: require('./models/user'),
    secret: 'secret'
  },
  policy: {
    policies: require('./lib/policies')
  }
}
