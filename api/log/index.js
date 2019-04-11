const Joi = require('joi')
const moment = require('moment')
const { Mongoose } = require('@bakjs/mongo')

module.exports = {
  path: '/list',
  method: 'get',
  config: {
    id: 'log.index',
    auth: {
      mode: 'required'
    },
    validate: {
      query: {
        dateFrom: Joi.string().allow(''),
        dateTo: Joi.string().allow(''),
      }
    }
  },
  async handler (request, reply) {
    const { dateFrom, dateTo } = request.query

    let collections = await Mongoose.connections[1].db.collections()
    collections = await Promise.all(collections.map(async collection => {
      const res = {
        name: collection.s.name,
        stats: await collection.stats()
      }
      if (dateFrom || dateTo) {
        const timeQuery = {}
        if (dateFrom) {
          timeQuery['$gte'] = new Date(dateFrom)
        }
        if (dateTo) {
          timeQuery['$lte'] = new Date(dateTo)
        }
        res.stats.count = await collection.find({ time: timeQuery }).count()
        if (!res.stats.count) {
          res.stats.avgObjSize = 0
        }
      }
      return res
    }))

    return reply(collections)
  }
}
