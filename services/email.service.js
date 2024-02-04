const { emailQueue } = require("../helpers/redisQueue");

const service = {};

service.sendEmail = async (data) => {
  return new Promise(async (resolve, reject) => {
    const sent = await emailQueue.add("EMAIL", { ...data });
    if (sent) resolve(sent);
    else reject(sent);
  });
};

module.exports = service;
