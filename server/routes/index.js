const express = require("express");
const router = express.Router();

const twitter = require("../controllers/twitter.js");

router.post('/', twitter);

module.exports = router;