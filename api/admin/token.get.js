const Joi = require('joi')
const { Client } = require('../../models')

module.exports = {
  path: '/client/list',
  method: 'get',
  config: {
    id: 'api.admin.token.get',
    auth: {
      mode: 'required'
    },
    validate: {
      query: {
        sortBy: Joi.string().allow('').default('active'),
        sortOrder: Joi.string().valid('asc', 'desc').default('asc'),
        skip: Joi.number().integer().min(0).default(0),
        limit: Joi.number().integer().min(0).default(10),
      }
    }
  },
  async handler (request, reply) {
    const { sortBy, sortOrder, skip, limit } = request.query

    const sortObj = {}
    if (sortBy) {
      sortObj[sortBy] = (sortOrder === 'asc' ? 1 : -1)
    }
    sortObj['created_at'] = -1
    try {
      const clients = await Client.find().skip(skip).limit(limit).sort(sortObj)
      const count = await Client.count()

      return reply({ clients, count })
    } catch (e) {
      console.log(e)
    }
  }
}
