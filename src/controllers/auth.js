import * as service from "../services";
import { internalSeverError,badRequest } from "../middleware/handle_errors";
import joi from 'joi'
 import { email, password } from "../helpers/joi_schema";
export const register = async(req,res)=> {
    try {
        const {error} = joi.object({email,password}).validate(req.body)
        // cosole.log(validate)
        if(error){
           return badRequest(error.details[0].message,res)
        }
        const response = await service.register(req.body)
        return res.status(200).json(response)
    } catch (error) {
       return internalSeverError(res)
    }
}
export const login = async(req,res) => {
    try {
        const {email,password} = req.body
        if(!email || !password) return res.status(400).json({
            err:1,
            mess: "Missing payload"
        })
        const response = await service.login(req.body)
        return res.status(200).json(response)
    } catch (error) {
       return internalSeverError(res)
    }
}