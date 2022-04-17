const express = require("express");
const router = express.Router();
const { generateLink, generateMultiLink } = require("../controllers/gen");

router.post("/", generateLink);
router.post("/multi", generateMultiLink);

module.exports = router;