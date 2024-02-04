const IORedis = require("ioredis");
const {
  REDIS_PORT,
  REDIS_HOST,
  REDIS_USER,
  REDIS_PASSWORD,
} = require("./credits.env");

module.exports = {
  connection: new IORedis({
    port: REDIS_PORT,
    host: REDIS_HOST,
    username: REDIS_USER,
    password: REDIS_PASSWORD,

    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    enableAutoPipelining: true,
  }),
};
