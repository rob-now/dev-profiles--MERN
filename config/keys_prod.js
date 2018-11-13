module.exports = {
  getDbConnectionString() {
    return process.env.MONGO_URI
  },
  secret: process.env.SECRET_OR_KEY,
}
