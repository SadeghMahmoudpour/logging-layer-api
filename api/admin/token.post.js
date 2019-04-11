const Joi = require('joi')
const Boom = require('boom')
const { Client } = require('../../models')

module.exports = {
  path: '/client',
  method: 'post',
  config: {
    id: 'api.token.post',
    auth: {
      mode: 'required'
    },
    validate: {
      payload: {
        name: Joi.string().required()
      }
    }
  },
  async handler (request, reply) {
    const { name } = request.payload

    let client = await Client.findOne({ name })
    console.log(client)
    if (client) {
      return reply(Boom.badRequest('کارفرما با این نام قبلاً ثبت شده است'))
    }

    const key = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })

    client = new Client({
      name,
      key,
      active: true
    })

    await client.save()

    return reply(client)
  }
}
