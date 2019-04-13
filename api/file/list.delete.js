const axios = require('axios')


module.exports = {
  path: '/',
  method: 'delete',
  config: {
    id: 'file.delete',
    auth: {
      mode: 'required'
    }
  },
  async handler (request, reply) {
    const { path } = request.query
    try {
      const params = {
        op: 'DELETE',
        recursive: true
      }
      console.log('http://localhost:50070/webhdfs/v1/logger/logs'+path)
      const { data } = await axios.delete('http://localhost:50070/webhdfs/v1/logger/logs'+path, { params })

      return reply(data)
    } catch (e) {
      console.log(e.response)
    }
  }
}
