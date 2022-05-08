const express = require("express");
const router = express.Router();
const { updateNotification } = require("../controllers/notifications");

router.route("/:id").patch(updateNotification);

module.exports = router;
