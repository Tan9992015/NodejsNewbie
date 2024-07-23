import { generateCode } from "../helpers/generate_code";
import db from '../models'
import data from '../../data/data.json'
export  const insertData = ()=> new Promise(async(resolve,reject) => {
    try {
        const categories = Object.keys(data)
        categories.forEach(async(category) => {
            await db.Category.create({
                code: generateCode(category),
                value: category
            })
        })
        //insert book
        const entries = Object.entries(data)
        entries.forEach(item => {
          item[1]?.map(async(book) => {
            await db.Book.create({
                id: book.upc,
                title: book.bookTitle,
                price: book.bookPrice,
                available: book.available,
                image: book.imageUrl,
                description: book.bookDescription,
                category_code : generateCode(item[0])
            })
          })
        })
        resolve('oke')
    } catch (error) {
        reject(error)
    }
})