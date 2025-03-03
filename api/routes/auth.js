const express = require("express");
const router = express.Router();

const authenticationController = require("../controllers/authentication_controller");

router.post("/", authenticationController.signup);


module.exports = router;
