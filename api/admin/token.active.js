const Joi = require('joi')
const { Client } = require('../../models')

module.exports = {
  path: '/client/active',
  method: 'put',
  config: {
    id: 'client.active',
    auth: {
      mode: 'required'
    },
    validate: {
      payload: {
        clientId: Joi.string().required()
      }
    }
  },
  async handler (request, reply) {
    const { clientId } = request.payload
    let client = await Client.findById(clientId)
    client.active = true
    await client.save()

    return reply(client)
  }
}
