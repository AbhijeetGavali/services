module.exports = (value, field = "") => ({
  email: { type: "email", msg: "Please enter valid email", value },
  // phone: {
  //   type: "phone",
  //   msg: "Please enter valid phone number in format +91 xxxxx xxxxx",
  //   phoneNo: value,
  // },
  array: {
    type: "array",
    msg: "Please enter valid array, array can not be empty",
    value,
  },
  text: { type: "text", msg: "Please enter valid string", value, field },
  number: { type: "number", msg: "Please enter valid number", value },
  boolean: {
    type: "boolean",
    msg: "Boolean value should be either 0 or 1",
    value,
  },
  file: { type: "file", msg: "Invalid file.", value },
  password: {
    type: "password",
    msg: "Password should be at least 1) 6 char long, 2) one alphabet char, 3) one digit",
    value,
  },
});
