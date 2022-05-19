const { Router } = require("express");
const router = new Router();
const { sendEmailAndWsp } = require("../controllers/apiCartControllers");

router.post('/:cartId', sendEmailAndWsp)

module.exports = router;