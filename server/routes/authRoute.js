import express from "express";
import {register, login, getUserInfo, setTransaction, fetchTransaction} from "../controller/authController.js"
const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/getuserinfo').post(getUserInfo)
router.route('/transaction').post(setTransaction)
router.route('/getdoc').post(fetchTransaction)


export default router