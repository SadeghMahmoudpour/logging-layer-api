const { User } = require('../../models')

exports.register = function (server, options, next) {
  if (!User.findOne({ username: 'admin' })) {
    const admin = new User({
      name: 'admin',
      username: 'admin',
      password: 'admin'
    })
    admin.save().then(() => {
      next()
    })
  } else {
    next()
  }
}

exports.register.attributes = {
  name: 'initializer'
}
