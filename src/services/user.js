import db from '../models'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
require('dotenv').config()

export const getUser = (userId) => new Promise(async(resolve,reject) => {
    try {
        const response = await db.User.findOne({
            where: {id : userId },
            attributes : {
                exclude : ['password']
            },
           include: [
            {model: db.Role, as: 'roleData', attributes: ['id','code','value']}
           ]
        })
        resolve({
            err: response ? 0 : 1,
            mess: response ? "tìm thành công" : "user không tồn tại",
            user_data : response
        })
    } catch (error) {
        reject(error)
    }
})