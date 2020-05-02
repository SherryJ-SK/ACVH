// const User = require("../models/Users");
const router = require("express").Router();
const passport = require("passport");

router.post("/register_login", (req, res, next) => {
    passport.authenticate("local_login", function (err, user, info) {
        if (err) {
            return res.status(400).json({ errors: err });
        }
        if (!user) {
            return res.status(400).json({ errors: "user not found" });
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(400).json({ errors: err });
            }
            return res.status(200).json({ sucess: `${user.id}` });
        });
    })(req, res, next);
});

module.exports = router;