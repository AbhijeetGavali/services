const CUSTOME_ERRORS = require("./data/custome_errors");

/**
 * @param {object} checks cantaining type and value
 * @returns {Array} errors
 */

const validater = function (checks) {
  const errors = [];
  for (const check of checks) {
    switch (check.type) {
      case "email": {
        if (!/\S+@\S+\.\S+/g.test(check.value)) {
          errors.push(CUSTOME_ERRORS(check.value, "email").email);
        }
        break;
      }
      case "array": {
        if (check.value === undefined || !Array.isArray(check.value)) {
          errors.push(CUSTOME_ERRORS(check.value).array);
        }
        break;
      }
      // case "phone": {
      //   if (!/^\+91\d{10}$/.test(check.value)) {
      //     errors.push(CUSTOME_ERRORS(check.value).phone);
      //   }
      //   break;
      // }
      case "text": {
        if (
          typeof check.value !== "string"
          // || ! /[a-zA-Z]/g.test(check.value)
        ) {
          errors.push(CUSTOME_ERRORS(check.value, check.field).text);
        }
        break;
      }
      case "number": {
        if (typeof check.value !== "number" || isNaN(check.value)) {
          errors.push(CUSTOME_ERRORS(check.value).number);
        }
        break;
      }
      case "boolean": {
        if (
          typeof check.value !== "number" ||
          (check.value !== 0 && check.value !== 1)
        ) {
          errors.push(CUSTOME_ERRORS(check.value).boolean);
        }
        break;
      }
      case "password": {
        if (
          check.value?.length < 6 ||
          !/[a-z]/g.test(check.value) ||
          !/\d/g.test(check.value)
        ) {
          errors.push(CUSTOME_ERRORS("your password").password);
        }
        break;
      }
      case "file": {
        if (check.value === undefined) {
          errors.push(CUSTOME_ERRORS(check.value).file);
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  return errors;
};

module.exports = validater;
