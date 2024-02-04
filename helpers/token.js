const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/credits.env");
const { TOKEN_TYPES } = require("../config/token_type");
const User = require("../models/users");
// const { connection } = require("../config/redis");
// const service = require("../services/authentication.service");

const getToken = async (data, expiresIn = null) => {
  const token = jwt.sign(
    { ...data },
    SECRET_KEY,
    expiresIn ? { expiresIn } : {},
  );

  return token;
};

// const checkPermissions = (result, access) => {
//   for (let key in access) if (access[key] != result[key]) return false;
//   return true;
// };

// const authorizeToken = async (req, res, next) => {
//   let token = req.get("authorization");
//   if (token) {
//     token = token.split(" ")[1];
//     jwt.verify(token, SECRET_KEY, async (err, result) => {
//       if (err) {
//         return res
//           .status(401)
//           .json({ msg: "Session expired! Please login again" });
//       } else {
//         req.user = { ...result };
//         return next();
//       }
//     });
//   } else {
//     return res.status(400).json({ msg: "Provide Autherization token" });
//   }
// };

const authorizeToken = (tokenFor) => async (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, SECRET_KEY, async (err, result) => {
      if (err) {
        return res
          .status(401)
          .json({ msg: "Token expired! Please request again" });
      } else {
        if (tokenFor == TOKEN_TYPES.LOGIN) {
          const user = await User.findById(result.id);
          if (!user.isVerified)
            return res.status(400).json({ code: 0, msg: "Email not verified" });
        }
        if (result.token_type == tokenFor) {
          req.user = { ...result };
          return next();
        } else {
          return res.status(401).json({ msg: "Token miss-used" });
        }
      }
    });
  } else {
    return res.status(400).json({ msg: "Provide Autherization token" });
  }
};

// const checkFor = (accessList) => async (req, res, next) => {
//   //  id
//   //  isAdmin
//   //  salesCrm
//   //  proposalMaker
//   //  LMS
//   //  videoEstimater
//   //  vendorManagment
//   //  projectManagement

//   let token = req.get("authorization");
//   if (token) {
//     token = token.split(" ")[1];
//     const token = await getTokenFor1W(token);
//     jwt.verify(token, SECRET_KEY, async (err, result) => {
//       if (err) {
//         return res
//           .status(401)
//           .json({ msg: "Session expired! Please login again" });
//       } else {
//         for (const element of accessList) {
//           if (result[element] || result["isAdmin"]) {
//             const access = await service.getUsersAccess(result.id);
//             if (checkPermissions(result, access)) setTokenFor1W(token, result);
//             else {
//               connection.del(token);
//               return res
//                 .status(401)
//                 .json({ msg: "Session expired! Please login again" });
//             }
//             req.user = { ...result };
//             return next();
//           }
//         }
//         return res.status(403).json({ msg: "Access Forbidden!" });
//       }
//     });
//   } else {
//     return res.status(400).json({ msg: "Provide Autherization token" });
//   }
// };

module.exports = {
  getToken,
  // authorizeToken,
  authorizeToken,
  // checkFor,
};
