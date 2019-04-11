const { Model } = require('@bakjs/mongo')

class Client extends Model {
  static get $schema () {
    return {
      name: { type: String, index: true, unique: true, required: true },
      key: { type: String, index: true, unique: true, required: true },
      active: { type: Boolean, default: true, required: true },
      deletable: { type: Boolean, default: true, required: true }
    }
  }
}

module.exports = Client.$model