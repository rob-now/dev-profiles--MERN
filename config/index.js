const config = require('./config.json')

module.exports = {
  getDbConnectionString() {
    return `mongodb://${config.username}:${config.password}@ds159121.mlab.com:59121/devprofiles`
  },
}
