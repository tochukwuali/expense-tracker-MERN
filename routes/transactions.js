const express = require('express')
const Router = express.Router()
const { getTransactions, addTransaction, deleteTransaction } = require('../controllers/TransactionController')

Router
    .route('/')
    .get(getTransactions)
    .post(addTransaction)

Router
    .route('/:id')
    .delete(deleteTransaction)

module.exports = Router