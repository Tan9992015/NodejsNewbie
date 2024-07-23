import db from '../models'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
require('dotenv').config()

const hasPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8))
export const register = ({email, password})=> new Promise(async(resolve,reject)=> {
    try {
        const response = await db.User.findOrCreate({
            where: {email},
            defaults: {
                email,
                password: hasPassword(password)
            }
        })
        // console.log(response)
        console.log(response[0].email)
        const accesToken = response[1]
        ? jwt.sign({id : response[0].id, role_code: response[0].role_code, email :response[0].email},process.env.JWT_SECRET,{expiresIn:'5d'}) 
        : null
        resolve({
            err: response[1] ? 0 : 1,
            mess: response[1] ? 'đăng ký thành công' : 'tài khoản đã tồn tại',
            access_token: accesToken
        })
    } catch (error) {
        reject(error)
    }
})

export const login = ({email,password})=> new Promise(async(resolve,reject)=> {
    try {
        const response = await db.User.findOne({
            where: {email},
            raw: true
        })
        const isChecked = response && bcrypt.compareSync(password,response.password)
        const accesToken = isChecked 
        ? jwt.sign({id: response.id, role_code: response.role_code,email: response.email},process.env.JWT_SECRET,{expiresIn:'5d'}) 
        : null
        resolve({
            err: accesToken ? 0 : 1,
            mess: accesToken ? "đăng nhập thành công" : response ? "sai mật khẩu" : "sai email",
            accessToken: `Bear ${accesToken}`
        })
    } catch (error) {
        reject(error)
    }
})