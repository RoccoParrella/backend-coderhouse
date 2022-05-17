const { Router } = require("express");
const router = new Router();
const { current } = require("../controllers/user");

router.get('/current', current)

module.exports = router;