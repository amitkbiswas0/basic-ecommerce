const express = require("express");
const router = express.Router();

const loginController = require("../controllers/loginout");

// default login page => GET
router.get("/", loginController.getLogin);
// handle login => POST
router.post("/", loginController.postLogin);

// logout
router.get("/logout", loginController.getLogOut);

// signup
router.get("/signup", loginController.getSignup);
router.post("/signup", loginController.postSignup);

module.exports = router;
