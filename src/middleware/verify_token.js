import jwt from 'jsonwebtoken'
import { notAuth } from './handle_errors'
require('dotenv').config()
export const verifytoken = (req,res,next)=> {
    const token = req.headers.authorization
    if(!token) return notAuth("yêu cầu đăng nhập",res)
    const accessToken = token.split(' ')[1]
    jwt.verify(accessToken,process.env.JWT_SECRET,(err,decode)=>{
        if(err) return notAuth("access token không hợp lệ hoặc hết hạn",res)
        req.user = decode
        next()
    })
}
