const authorization = (roles) => {
  return async (req, res, next) => {
    if (!req.user)
      return res.status(401).json({ status: "error", message: "Unauthorized" });

    if (!roles.includes(req.user.role))
      return res.status(403).json({ status: "error", message: "Forbidden" });

    next();
  };
};

module.exports = authorization;
