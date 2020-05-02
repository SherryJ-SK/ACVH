const express = require("express");
// const app = express();
const router = express.Router();
const apiRoutes = require("./api/users"); 
const auth = require("./api/auth");

// const passport = require("../passport/setup");
// app.use(passport.initialize());
// app.use(passport.session());

// API Routes
router.use("/api/users", apiRoutes);
router.use("/api/auth", auth);

// If no API routes are hit, send the React app
router.use("/", function (req, res) {
  res.json({ message: 'hooray! welcome to the front page' })
  // res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
