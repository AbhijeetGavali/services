const bcrypt = require("bcryptjs");

const service = require("../services/authentication.service");
const emailService = require("../services/email.service");

const emailTemplate = require("../helpers/emails/templates");
const validater = require("../helpers/validater.js");
const { generateOTP } = require("../helpers/otp.js");
const { getToken } = require("../helpers/token.js");
const { connection } = require("../config/redis.js");
const { OTP_ACTIONS } = require("../config/otp_actions.js");
const { TOKEN_TYPES } = require("../config/token_type.js");

const controller = {};

controller.signup = async (req, res) => {
  try {
    const data = { ...req.body };

    // validating inputs
    const errorMessages = validater([
      { type: "text", value: data.firstName, field: "firstName" },
      { type: "text", value: data.lastName, field: "lastName" },
      { type: "email", value: data.email },
      { type: "password", value: data.password },
    ]);

    // if error in sign in return bad request
    if (errorMessages.length > 0) {
      return res.status(400).json({ code: 0, msg: errorMessages });
    }

    // check if user is exist in database with that email or mobile number
    const isuser = await service.getUser(data.email);
    delete isuser?.password;
    console.log(isuser);
    if (!isuser?._id) {
      // creating user and getting id
      data.password = await bcrypt.hash(data.password, 10);

      const user = await service.createUser(data);
      console.log(user);
      // return res.sendStatus(200);
      const OTP = generateOTP();

      // tokenize id to send in email to client for resetting password
      const token = await getToken(
        {
          id: user._id,
          email: data.email,
          OTP_ACTION: OTP_ACTIONS.EMAIL_VERIFICATION,
          token_type: TOKEN_TYPES.OTP_CHECK,
        },
        "15min",
      );

      await connection.set(
        data.email + ":" + OTP_ACTIONS.EMAIL_VERIFICATION,
        OTP,
      );

      const emailData = {
        to: data.email,
        subject: "Invite to HOME service Application",
        body: emailTemplate.invite(
          data.firstName + " " + data.lastName,
          data.email,
          OTP,
        ),
      };

      await emailService.sendEmail(emailData);
      return res
        .status(200)
        .json({ code: 1, msg: "User created successfully", otpToken: token });
    } else {
      return res.status(409).json({ code: 0, msg: "The user already exists" });
    }
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ code: 0, msg: "Internal Server Error" });
  }
};

controller.signin = async (req, res) => {
  try {
    // validating inputs
    const dataToCheck = [
      { type: "email", value: req.body.email },
      { type: "password", value: req.body.password },
    ];

    const errorMessages = validater(dataToCheck);

    // if error in sign in return bad request
    if (errorMessages.length > 0) {
      return res.status(400).json({ code: 0, msg: errorMessages });
    }

    const data = { ...req.body };

    // get user details with the email or phonenumber
    const user = await service.getUser(data.email);
    if (!user?._id) {
      return res.status(401).json({ code: 0, msg: "Invalid Credentials" });
    }

    // comparing password with the password in db
    const compared = await bcrypt.compare(data.password, user.password);
    if (compared) {
      const token = await getToken({
        id: user.id,
        role: user.role,
        token_type: TOKEN_TYPES.LOGIN,
      });
      return res.status(200).json({ code: 1, token });
    } else {
      return res.status(401).json({ code: 0, msg: "Invalid Credentials" });
    }
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ code: 0, msg: "Internal Server Error" });
  }
};

controller.sendResetLink = async (req, res) => {
  try {
    const data = { ...req.body };

    // validating inputs
    const errorMessages = validater([{ type: "email", value: data.email }]);

    // if error in sign in return bad request
    if (errorMessages.length > 0) {
      return res.status(400).json({ code: 0, msg: errorMessages });
    }

    // check if user is exist in database with that email or mobile number
    const isuser = await service.getUser(data.email);
    delete isuser?.password;
    if (isuser?._id) {
      // tokenize id to send in email to client for resetting password

      const OTP = generateOTP();

      const token = await getToken(
        {
          id: isuser._id,
          email: data.email,
          OTP_ACTION: OTP_ACTIONS.PASSWORD_RESET,
          token_type: TOKEN_TYPES.OTP_CHECK,
        },
        "15min",
      );

      await connection.set(data.email + ":" + OTP_ACTIONS.PASSWORD_RESET, OTP);

      const emailData = {
        to: data.email,
        subject: "Reset Password for " + data.email,
        body: emailTemplate.resetPassword(
          isuser.firstName + " " + isuser.lastName,
          data.email,
          OTP,
        ),
      };

      await emailService.sendEmail(emailData);
      return res.status(200).json({
        code: 1,
        msg: "If your account exists with this email you will recirve an OTP to reset password",
        token,
      });
    } else {
      return res.status(200).json({
        code: 0,
        msg: "You do not have a active account with us",
      });
    }
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ code: 0, msg: "Internal Server Error" });
  }
};

controller.validateOTP = async (req, res) => {
  try {
    const data = { ...req.body };

    // validating inputs
    const errorMessages = validater([{ type: "number", value: data.OTP }]);

    // if error in sign in return bad request
    if (errorMessages.length > 0) {
      return res.status(400).json({ code: 0, msg: errorMessages });
    }

    // check if user is exist in database with that email or mobile number
    const isuser = await service.getUser(req.user.email);
    delete isuser?.password;
    if (isuser?._id) {
      // tokenize id to send in email to client for resetting password
      const OTP = await connection.get(
        req.user.email + ":" + req.user.OTP_ACTION,
      );
      console.log("otp", OTP, data.OTP);
      if (!(OTP == data.OTP))
        return res.status(200).json({
          code: 0,
          msg: "Wrong OTP",
        });

      if (req.user.OTP_ACTION === OTP_ACTIONS.EMAIL_VERIFICATION) {
        isuser.isVerified = true;
        isuser.save();
        return res.status(200).json({
          code: 1,
          msg: "Account email verified",
        });
      }

      if (req.user.OTP_ACTION === OTP_ACTIONS.PASSWORD_RESET) {
        const token = await getToken(
          {
            id: isuser._id,
            email: data.email,
            token_type: TOKEN_TYPES.PASSWORD_RESET,
          },
          "5min",
        );
        return res.status(200).json({
          code: 1,
          msg: "Token to reset password generated",
          token,
        });
      }
      return res.status(200).json({
        code: 0,
        msg: "Wrong OTP",
      });
    } else {
      return res.status(200).json({
        code: 0,
        msg: "Wrong OTP",
      });
    }
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ code: 0, msg: "Internal Server Error" });
  }
};

controller.updatePassword = async (req, res) => {
  try {
    const data = { ...req.body, userId: req.user.id };

    // validating inputs
    const errorMessages = validater([
      { type: "password", value: data.password },
      { type: "text", value: data.userId, field: "userid" },
    ]);

    // if error in sign in return bad request
    if (errorMessages.length > 0) {
      return res.status(400).json({ code: 0, msg: errorMessages });
    }

    // altering password with hash
    data.password = await bcrypt.hash(data.password, 10);

    const updated = await service.updatePassword(data);

    if (updated._id) {
      return res
        .status(200)
        .json({ code: 1, msg: "Password updated successfully." });
    } else {
      return res
        .status(304)
        .json({ code: 0, msg: "No content found for modification" });
    }
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ code: 0, msg: "Internal Server Error" });
  }
};

module.exports = controller;
