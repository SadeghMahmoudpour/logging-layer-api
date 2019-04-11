const Joi = require('joi')
const { Mongoose } = require('@bakjs/mongo')
const Boom = require('boom')
const { Client } = require('../../models')

module.exports = {
  path: '/',
  method: 'get',
  config: {
    id: 'api.admin.log.get',
    auth: {
      mode: 'required'
    },
    validate: {
      query: {
        collection: Joi.string(),
        skip: Joi.number().integer().min(0).default(0),
        limit: Joi.number().integer().min(0).default(10),
        dateFrom: Joi.string().allow(''),
        dateTo: Joi.string().allow(''),
        filterQuery: Joi.string().allow(''),
        sortQuery: Joi.string().allow('')
      }
    }
  },
  async handler (request, reply) {
    const collectionName = request.query.collection
    const { skip, limit, dateFrom, dateTo, filterQuery, sortQuery } = request.query

    let collection = await Mongoose.connections[1].db.collection(collectionName)
    if (!collection) {
      return Boom.badRequest('collection not found')
    }

    const query = {}
    if (dateFrom || dateTo) {
      const timeQuery = {}
      if (dateFrom) {
        timeQuery['$gte'] = new Date(dateFrom)
      }
      if (dateTo) {
        timeQuery['$lte'] = new Date(dateTo)
      }
      query['time'] = timeQuery
    }
    if (filterQuery) {
      Object.assign(query, JSON.parse(filterQuery))
    }

    let items = await collection.find(query).skip(skip).limit(limit).toArray()
    items = await Promise.all(items.map(async item => {
      if (item.client) {
        item.client = await Client.findOne({_id: item.client})
      }
      return item
    }))
    const count = await collection.count()

    return reply({ items, count })
  }
}
