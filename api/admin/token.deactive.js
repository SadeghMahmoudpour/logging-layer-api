const Joi = require('joi')
const { Client } = require('../../models')

module.exports = {
  path: '/client/deactive',
  method: 'put',
  config: {
    id: 'client.deactive',
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
    client.active = false
    await client.save()

    return reply(client)
  }
}
