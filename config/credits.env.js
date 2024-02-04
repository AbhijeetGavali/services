require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_USER = process.env.REDIS_USER;

const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;

module.exports = {
  SECRET_KEY,

  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
  REDIS_USER,

  MAIL_USER,
  MAIL_PASSWORD,
};
