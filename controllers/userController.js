const db = require("../models");

module.exports = {
    findAll: function (req, res) {
        db.User.find(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.User
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.User
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findOne: function (req, res) {
        db.User.findOne({ email: req.params.email }, (err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.json(data);
            }
        })
    },
};