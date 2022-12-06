const config = {
  DB_URL: process.env.DB_URL || 'mongodb://localhost:27017/telegrom',
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || 'http://localhost',
  PUBLIC_ROUTE: process.env.PUBLIC_ROUTE || '/app'
};

module.exports = config;