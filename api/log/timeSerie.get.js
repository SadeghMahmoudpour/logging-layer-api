const Joi = require('joi')
const Boom = require('boom')
const { Mongoose } = require('@bakjs/mongo')

module.exports = {
  path: '/timeSeries',
  method: 'get',
  config: {
    id: 'log.timeSeries.get',
    auth: {
      mode: 'required'
    },
  },
  async handler (request, reply) {
    try {
      const collectionName = request.query.collection
      const { dateFrom, dateTo } = request.query

      let collection = await Mongoose.connections[1].db.collection(collectionName)
      if (!collection) {
        return Boom.badRequest('مجموعه یافت نشد')
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
      const items = await collection.find(query).sort({ time: 1 }).toArray()
      const result = {}
      items.forEach(item => {
        const date = new Date(item.time)
        const time = date.getFullYear()+'/'+date.getMonth()+'/'+date.getDate()
        if (!result[time]) {
          result[time] = 1
        } else {
          result[time] += 1
        }
      })

      return reply({ result })
    } catch (e) {
      console.log(e)
    }
  }
}
