const { Queue } = require("bullmq");
const { connection } = require("../config/redis");

const emailQueue = new Queue("Email", {
  connection,
  defaultJobOptions: {
    removeOnComplete: true,
  },
});

const messageQueue = new Queue("Message", {
  connection,
  defaultJobOptions: {
    removeOnComplete: true,
  },
});

module.exports = { emailQueue, messageQueue };
