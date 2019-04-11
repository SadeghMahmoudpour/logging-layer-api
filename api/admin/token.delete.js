const Joi = require('joi')
const Boom = require('boom')
const { Client } = require('../../models')

module.exports = {
  path: '/client',
  method: 'delete',
  config: {
    id: 'client.delete',
    auth: {
      mode: 'required'
    },
    validate: {
      query: {
        clientId: Joi.string().required()
      }
    }
  },
  async handler (request, reply) {
    try {
      const {clientId} = request.query
      const client = await Client.findById(clientId)
      if (!client.deletable) {
        return reply(Boom.badRequest('کارفرما قابل حذف نیست'))
      }
      await client.remove()

      return reply()
    } catch (e) {
      console.log(e)
    }
  }
}
