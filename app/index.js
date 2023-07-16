const express = require('express')
const cors = require('cors')
require('dotenv').config()
const Transaction = require('./models/Transaction.js')
const { mongoose } = require('mongoose')


// var bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(express.json())
app.get('/api/test', (req, res) => {
    res.json('test odfsak')
})

app.post('/api/transaction', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL)
    const { name, description, datetime,price } = req.body

    const transaction = await Transaction.create({ name, description, datetime, price })

    res.json(transaction)
})

app.get('/api/transactions',async (req,res)=>{
    await mongoose.connect(process.env.MONGO_URL)
     const transactions = await Transaction.find()
     res.json(transactions)
})

app.delete('/api/delete', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(req.body);
    try {
      const deletedTransaction = await Transaction.findOneAndDelete({ _id: req.body.id });
      if (deletedTransaction) {
        res.json({ message: 'Transaction deleted successfully' });
      } else {
        res.status(404).json({ error: 'Transaction not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
app.listen(4000)
