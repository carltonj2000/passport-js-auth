module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  else return res.status(401).json({ msg: "Not authorized to view resource." });
};

module.exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.admin) return next();
  else return res.status(401).json({ msg: "You are not an admin" });
};
