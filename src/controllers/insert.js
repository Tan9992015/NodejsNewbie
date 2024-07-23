import * as Service from '../services'
import { internalSeverError } from '../middleware/handle_errors'
export const insert = async(req,res) => {
    try{
        const response = await Service.insertData()
        return res.status(200).json(response)
    } catch (error) {
        return internalSeverError(res)
    }
}