module.exports = {

  /**
   * Configure mongodb
   */
  mongo: {
    connections: {
      default: { uri: 'mongodb://localhost/logger' },
      logs: { uri: 'mongodb://localhost/logs' },
    }
  },
}
