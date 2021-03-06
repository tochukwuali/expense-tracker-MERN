const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const transactions = require('./routes/transactions')
const connectDB = require('./config/dbConfig')

dotenv.config({path: './config/config.env'})

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
} 

app.use(express.json())

app.use('/api/v1/transactions', transactions) 

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))