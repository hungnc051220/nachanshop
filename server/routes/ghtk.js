const express = require("express");
const router = express.Router();
const { getFee } = require("../controllers/ghtk");

router.post("/", getFee);

module.exports = router;