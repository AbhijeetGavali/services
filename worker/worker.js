const { Worker } = require("bullmq");
const { connection } = require("../config/redis");
const emailProccessor = require("../proccessors/email.proccessor");

const mailWorker = new Worker("Email", emailProccessor, {
  connection,
  concurrency: 10,
});

mailWorker.on("failed", (job, err) => {
  console.log(
    { error: err, name: job.name, data: job.data },
    `${job.id} has failed with ${err.message}`,
  );
});

mailWorker.on("completed", (job) => {
  console.log(`${job.id} has completed!`);
});

console.log("Workers are listning");
