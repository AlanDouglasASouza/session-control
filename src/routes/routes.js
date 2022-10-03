const express = require("express");
const router = express.Router();
const Login = require("../controllers/login.js");

router.post("/form", Login.userLogin);
router.post("/note", Login.userNotes);

module.exports = router;
