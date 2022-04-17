const express = require("express");
const router = express.Router();
const { signIn, signUp, getUsers, deleteUser} = require("../controllers/users");

router.get("/", getUsers);
router.delete("/:id", deleteUser);
router.post("/signin", signIn);
router.post("/signup", signUp);

module.exports = router;