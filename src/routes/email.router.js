const Router = require("express")
const {sendEmail, sendEmailWithAttachments }= require("../controllers/views.controller")

const router = Router()

router.get("/", sendEmail)
router.get("/attachments", sendEmailWithAttachments)

module.exports = router