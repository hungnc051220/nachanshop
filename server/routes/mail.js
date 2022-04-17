const express = require("express");
const router = express.Router();
const { sendMail } = require("../controllers/mail");

router.route("/").post(sendMail);

module.exports = router;