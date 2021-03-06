const router = require("express").Router();
const passport = require("passport");
const { genPassword } = require("../lib/passwordUtils");
const { connection } = require("../config/database");
const { isAuth, isAdmin } = require("../lib/authMiddleware.js");

const User = connection.models.User;

router.get("/", (req, res) => {
  res.render("./pages/index");
});

router.get("/login", (req, res, next) => {
  res.render("./pages/login");
});
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/protected-route",
    successRedirect: "/protected-route",
  })
);

router.get("/register", (req, res, next) => {
  res.render("./pages/register");
});
router.post("/register", (req, res, next) => {
  const { password, username, admin } = req.body;
  const { salt, hash } = genPassword(password);
  const user = new User({ username, hash, salt, admin: admin === "on" });
  user.save();
  res.redirect("/login");
});

router.get("/protected-route", isAuth, (req, res, next) => {
  res.render("./pages/protectedRoute", {
    authenticated: req.isAuthenticated(),
    admin: false,
  });
});

router.get("/admin-route", isAdmin, (req, res, next) => {
  res.render("./pages/protectedRoute", {
    authenticated: req.isAuthenticated(),
    admin: true,
  });
});

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/login");
});

router.get("/login-success", (req, res, next) => {
  res.send(
    '<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>'
  );
});

router.get("/login-failure", (req, res, next) => {
  res.send("You entered the wrong password.");
});

module.exports = router;
