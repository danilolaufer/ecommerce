const Router = require("express")
const {sendSms}= require("../controllers/views.controller")

const router = Router()

router.get("/", sendSms)

module.exports = router