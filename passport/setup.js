const bcrypt = require("bcryptjs");
const User = require("../models/Users");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use("local_login", new LocalStrategy(
    { usernameField: "email" }, (email, password, done) => {
        User.findOne({ email: email })
            .then(user => {
                // if no user found, create new user
                if (!user) {
                    console.log("line12");
                    const newUser = new User({ email, password });
                    // hash the user typed password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    return done(null, user);
                                })
                                .catch(err => {
                                    return done(null, false, { message: err });
                                });
                        });
                    });
                } else {
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        console.log("line32");
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            console.log("line36");
                            return done(null, false, { message: "Wrong password" });
                        };
                    });
                };
            })
            .catch(err => {
                if (err) throw err;
            });
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

module.exports = passport;