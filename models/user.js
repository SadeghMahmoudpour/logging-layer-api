const Auth = require('@bakjs/auth')

class User extends Auth.User {
  static get $visible () {
    return ['_id', 'name', 'username', 'email','roleNames', 'meta']
  }
}

module.exports = User.$model
