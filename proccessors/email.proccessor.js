const email = require("../helpers/email");

module.exports = async (job) => {
  const { name, data } = job;
  switch (name) {
    case "EMAIL":
      const sent = await email(
        data.to,
        data.subject,
        data.body,
        data.file ? data.file : {},
      );
      break;
    default:
      break;
  }
};
