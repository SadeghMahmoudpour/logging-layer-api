exports.register = function (server, options, next) {
  server.register([
    {
      register:
          require('hapi-rabbit'),
      options: {
        url: 'amqp://rabbitmq:rabbitmq@localhost/log'
      }
    }
  ], function (err) {
    if (err) {
      throw err
    }
  })

  next()
}

exports.register.attributes = {
  name: 'bak-rabbit'
}
