import {v4 as generateId} from 'uuid'
import db from '../models'
import {Op} from 'sequelize'
require('dotenv').config()
const cloudinary = require('cloudinary').v2
// READ
export const getBook = ({page,limit,order,name,...query}) => new Promise(async(resolve,reject)=> {
  try {
    const queries = { raw: true, nest: true }
    const offset = (!page || +page <= 1) ? 0 : (+page-1)
    const fLimit = +limit || +process.env.DEFAULT_LIMIT
    queries.offset = offset * fLimit
    queries.limit = fLimit
    if(order) queries.order = [order]
    if(name) query.title = {[Op.substring] : name}
    const response = await db.Book.findAndCountAll({
        where: query,
        ...queries,
        attributes: {
          exclude:['createdAt','updatedAt','description']
        },
        include: {
          model: db.Category,
          attributes: {
            exclude:['createdAt','updatedAt'],
          },
          as: 'categoryData'
        }
    })
    resolve({
        err: response ? 0 : 1,
        mess:response ? 'tìm được sách' : 'không tìm được sách',
        response : response
    })
  } catch (error) {
    reject(error)
  }
   
})


// CREATE
export const createBook = (body,fileData)=> new Promise(async(resolve, reject) => {
  try {
    const response = await db.Book.findOrCreate({
      where: {title: body?.title},
      defaults: {
        ...body,
        id: generateId(),
        image: fileData?.path
        }
    })
    resolve({
      err: response[1] ? 0 : 1,
      mess: response[1] ? "tạo sách thành công" : "tiêu đề đã tồn tại"  
    })
    if(!response[1] && fileData) cloudinary.uploader.destroy(fileData.filename)
  } catch (error) {
    reject(error)
    cloudinary.uploader.destroy(fileData.filename)
  }
})

//UPDATE
export const updateBook = ({bid,...body},fileData)=>  new Promise(async(resolve, reject) => {
  try {
    if(fileData) body.image = fileData.path
    const response = await db.Book.update(body,{
      where: {id: bid}
    })
    resolve({
      err: response[0] > 0 ? 0 : 1,
      mess: response[0] > 0 ? `updte thành công ${response[0]} quyển` : 'không thể update hoặc id sách không tìm thấy'
    })
    if(response[0]===0 && fileData) cloudinary.uploader.destroy(fileData.filename)
  } catch (error) {
    reject(error)
    cloudinary.uploader.destroy(fileData.filename)
  }
})


//DELETE
export const deleteBook = ({bids,fileName})=> new Promise(async(resolve, reject) => {
  try {
    const response = await db.Book.destroy({
      where: {
        id: bids
      }
    })
    resolve({
      err: response ? 0 : 1,
      mess:`xóa thành công ${response} quyển`
    })
    cloudinary.api.delete_resources(fileName)
  } catch (error) {
    reject(error)
  }
})