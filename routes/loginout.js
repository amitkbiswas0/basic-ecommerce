const express = require("express");
const router = express.Router();

const loginController = require("../controllers/loginout");

// default login page => GET
router.get("/", loginController.getLogin);
// handle login => POST
router.post("/login", loginController.postLogin);

// logout
router.get("/logout", loginController.getLogOut);

module.exports = router;
