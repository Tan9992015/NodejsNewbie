import express from 'express'
import cors from 'cors'
require('dotenv').config()
const initRoutes = require('./src/routes')
require('./connection_database')
// init
const app = express()

// client
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET','POST','PUT','DELETE']
}))
// json from client
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// server
initRoutes(app)
const PORT= process.env.PORT || 8888
const listener = app.listen(PORT,()=> {
    console.log("server is running on port "+ listener.address().port)
})