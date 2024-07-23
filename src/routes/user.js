import express from 'express'
import * as controller from '../controllers'
import {verifytoken} from '../middleware/verify_token'
import {verifyRoleAdmin} from '../middleware/verify_role'
const router = express.Router()


router.get('/',[verifytoken,verifyRoleAdmin],controller.getCurrent)
module.exports = router