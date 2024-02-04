const checkRole = (ROLES) => (req, res, next) => {
  console.log(ROLES, req.user.role);
  for (let ROLE of ROLES) if (ROLE == req.user.role) return next();
  return res.status(403).json({ code: 0, msg: "Insufficient permission" });
};

module.exports = {
  checkRole,
};
