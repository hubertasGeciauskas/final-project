const express = require(`express`)
const router = express.Router()
const authController = require("../controllers/authController")
const updateController = require("../controllers/updatesController")
const validateRegister = require("../modules/validateRegister")
const jwtValidate = require("../modules/jwtValidate")



router.post(`/register`, validateRegister, authController.register)
router.post(`/login`, authController.login)
router.post(`/autoLogin`, jwtValidate, authController.autoLogin)

router.post(`/updateImage`, jwtValidate, updateController.updateImage)
router.post(`/changePassword`, jwtValidate, authController.changePassword)
router.post(`/changeUsername`, jwtValidate, authController.changeUsername)

router.post(`/getUsers`, jwtValidate, updateController.getUsers)
router.get(`/getSelectedUser/:id`, updateController.getSelectedUser)
router.post(`/getConversation`, jwtValidate, updateController.getConversation)
router.post(`/getConversations`, jwtValidate, updateController.getConversations)
router.post(`/getNotifications`, jwtValidate, updateController.getNotifications)
router.post(`/sendMessage`, jwtValidate, updateController.sendMessage)
router.post(`/likeMessage`, jwtValidate, updateController.likeMessage)
router.post(`/deleteConversation`, jwtValidate, updateController.deleteConversation)
router.post(`/deleteNotifications`, jwtValidate, updateController.deleteNotifications)








module.exports = router