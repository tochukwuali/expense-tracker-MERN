const Transaction = require('../models/Transaction')

// @desc Get all Transactions
// @route GET api/v1/Transactions
// @access public

exports.getTransactions = async (req, res, next) => {
   try {
      const transactions = await Transaction.find()

      return res.status(200).json({
         success: true,
         count: transactions.length,
         data: transactions
      })
   } catch (error) {
         return res.status(500).json({
            success: false,
            error: 'Server Error'
         })
   }
}

// @desc Add Transaction
// @route POST api/v1/Transactions
// @access public

exports.addTransaction = async (req, res, next) => {
   try {
      const { text, amount } = req.body

      const transactions = await Transaction.create(req.body)

      return res.status(201).json({
         success: true,
         data: transactions
      })
   } catch (err) {
      if (err.name === 'ValidationError') {
         const messages = Object.values(err.errors).map(val => val.message)
         
         return res.status(200).json({
            success: false,
            error: messages
         })
      } else {
         return res.status(500).json({
           success: false,
           error: "Server Error"
         });
      }
   };
}

// @desc Delete Transaction
// @route DELETE api/v1/Transactions/:id
// @access public

exports.deleteTransaction = async (req, res, next) => {
   try {
      const transaction = await Transaction.findById(req.params.id)

      if(!transaction) {
         return res.status(404).json({
            success: false,
            error: 'No transaction found'
         })
      } else {
         await transaction.remove()

         return res.status(200).json({
            success: true,
            message: {}
         })
      }
   } catch (error) {
      return res.status(500).json({
         success: false,
         error: 'Server Error'
      })
   }
}