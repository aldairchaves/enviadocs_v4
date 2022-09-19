import express from "express";
import {register, login, getUserInfo} from "../controller/authController.js"
const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/getuserinfo').post(getUserInfo)


export default router