const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

module.exports = {
  path: 'test',
  method: 'get',
  config: {
    id: 'test.get'
  },
  async handler (request, reply) {
    return reply('hello')
  }
}