const Broker = require('amqplib')
const QUEUE = 'logs'
const { Client } = require('../../models')
const Boom = require('boom')

module.exports = {
  path: '/',
  method: 'post',
  config: {
    id: 'log.post',
  },
  async handler (request, reply) {
    let { key, tag, retrievable, data } = request.payload
    let storage = retrievable ? 'mongo' : 'hdfs'

    const client = await Client.findOne({ key })
    if (!client) {
      return reply(Boom.unauthorized('کارفرما نامعتبر است'))
    }

    data = JSON.parse(data)
    data.client = client._id
    data = JSON.stringify(data)
    let conn = await Broker.connect('amqp://rabbitmq:rabbitmq@localhost/')
    let chan = await conn.createChannel()
    await chan.assertQueue(QUEUE, {durable: false})
    await chan.sendToQueue(QUEUE, Buffer.from(data), {
      headers: {
        tag: storage + '.' + tag
      }
    })
    setTimeout(function () {
      conn.close()
    }, 500)

    return reply()
  }
}
