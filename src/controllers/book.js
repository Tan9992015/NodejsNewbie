import * as Service from '../services'
import { internalSeverError,badRequest } from '../middleware/handle_errors'
import {title,price,available,image,category_cod,bid,bids} from '../helpers/joi_schema'
import joi from 'joi'
const cloudinary = require('cloudinary').v2

// READ
export const GetBook = async(req,res) => {
    try{
       const response = await Service.getBook(req.query)
       return res.status(200).json(response)
    } catch (error) {
        return internalSeverError(res)
    }
}

// CREATE
export const CreateBook = async(req,res) => {
    try{
        const fileData = req.file
        // console.log(fileData)
        // {
        //     fieldname: 'image',
        //     originalname: 'background.jpg',
        //     encoding: '7bit',
        //     mimetype: 'image/jpeg',
        //     path: 'https://res.cloudinary.com/dxcscybxc/image/upload/v1711466250/learn_node/onhmjfoukb1ghwzzbjup.jpg',
        //     size: 57325,
        //     filename: 'learn_node/onhmjfoukb1ghwzzbjup'
        //   }
        // console.log(req.body)
        const {error} = joi.object({title,price,available,image,category_code}).validate({...req.body,image: fileData?.path})
        if(error){
            if(fileData)  cloudinary.uploader.destroy(fileData.filename)
            return badRequest(error.details[0].message,res)
        }
        const response = await Service.createBook(req.body,fileData)
        return res.status(200).json(response)
    } catch (error) {
        if(fileData)  cloudinary.uploader.destroy(fileData.filename)
        return internalSeverError(res)
        }
}


//UPDATE
export const UpdateBook = async(req,res)=> {
    try {
        const fileData =req.file
        const {error} = joi.object({bid}).validate({bid: req.body.bid})
        if(error){
           if(fileData) cloudinary.uploader.destroy(fileData.path)
           return badRequest(error.details[0].message,res)
        }
        const response = await Service.updateBook(req.body,fileData)
        return res.status(200).json(response)
    } catch (error) {
        if(fileData) cloudinary.uploader.destroy(fileData.path)
        return internalSeverError(res)
    }
}

// DELETE
export const DeleteBook = async(req,res)=> {
    try {
        const {error} = joi.object({bids}).validate(req.query)
        if(error){
            return badRequest(error.details[0].message,res)
        }
        const response = await Service.deleteBook(req.query)
        return res.status(200).json(response)
    } catch (error) {
        return internalSeverError(res)
    }
}