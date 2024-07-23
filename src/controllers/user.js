import * as Service from '../services'
import { internalSeverError } from '../middleware/handle_errors'
export const getCurrent = async(req,res) => {
    try {
        const {id} = req.user
        const response = await Service.getUser(id)
        return res.status(200).json(response)
    } catch (error) {
        return internalSeverError(res)
    }
}