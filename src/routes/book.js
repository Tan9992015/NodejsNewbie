import * as controllers from '../controllers'
import express from 'express'
import {verifyRoleAdmin} from '../middleware/verify_role'
import { verifytoken } from '../middleware/verify_token'
import uploadCloud from '../middleware/cloudinary_config'
const router = express.Router()

router.get('/',controllers.GetBook)

router.use(verifytoken)
router.use(verifyRoleAdmin)
router.post('/',uploadCloud.single('image'),controllers.CreateBook)
router.put('/',uploadCloud.single('image'),controllers.UpdateBook)
router.delete('/',controllers.DeleteBook)

module.exports = router