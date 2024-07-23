import {notAuth} from './handle_errors'
export const verifyRoleAdmin = (req,res,next)=> {
    const { role_code } = req.user
    if(role_code !== 'R3') return notAuth("yêu cầu quyền admin",res)
    next()
}

export const verifyRoleModerator = (req,res,next) => {
    const {role_code} = req.user
    if(role_code !=='R2' && role_code !== 'R3') return notAuth("yêu cầu quyền moderator trở lên",res)
    next()
}