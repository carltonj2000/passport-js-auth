require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const morgan = require("morgan");
const passport = require("passport");

const routes = require("./routes");
const { mongoUrl, mongoOptions } = require("./config/database");
require("./config/passport");

const app = express();

app.set("view engine", "ejs");

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "session encryption secret",
    store: MongoStore.create({ mongoUrl, mongoOptions }),
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Listening on port", PORT));
