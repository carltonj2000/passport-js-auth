require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const morgan = require("morgan");

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoUrl = "mongodb://localhost:27017/pja";
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
app.use(
  session({
    secret: process.env.SESSION_SECRET || "session encryption secret",
    store: MongoStore.create({ mongoUrl, mongoOptions }),
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.get("/", (req, res) => {
  console.log(req.session);
  if (req.session) {
    if (req.session.viewCount) {
      req.session.viewCount = req.session.viewCount + 1;
    } else {
      req.session.viewCount = 1;
    }
  }
  res.send(`You have visited this page ${req.session.viewCount} times.`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Listening on port", PORT));
