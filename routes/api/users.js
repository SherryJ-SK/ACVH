const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/")
    .get(userController.findAll);

router.route("/x/:email")
    .get(userController.findOne);

router.route("/:id")
    .get(userController.findById)
    .put(userController.update);

module.exports = router;