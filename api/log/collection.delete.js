const { Mongoose } = require('@bakjs/mongo')

module.exports = {
  path: '/collection',
  method: 'delete',
  config: {
    id: 'collection.delete',
    auth: {
      mode: 'required'
    },
  },
  async handler (request, reply) {
    const collectionName = request.query.collection

    await Mongoose.connections[1].db.dropCollection(collectionName)

    return reply()
  }
}
