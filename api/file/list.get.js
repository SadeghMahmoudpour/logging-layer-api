const Joi = require('joi')
const axios = require('axios')


module.exports = {
  path: '/list',
  method: 'get',
  config: {
    id: 'file.list',
    auth: {
      mode: 'required'
    }
  },
  async handler (request, reply) {
    const { path } = request.query
    try {
      const params = {
        op: 'LISTSTATUS',
      }
      const { data } = await axios.get('http://localhost:50070/webhdfs/v1/logger/logs'+path, { params })

      return reply(data)
    } catch (e) {
    }
  }
}
