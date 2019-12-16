const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const dbUrl = 'mongodb+srv://Ritu:Ghanshi%401986@cluster0-5m0il.mongodb.net/test?retryWrites=true&w=majority'
const app = express()
mongoose.connect(dbUrl,{useNewUrlParser: true, useUnifiedTopology: true } , (err) => {
  console.log('MongoDb database connection', err)        
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())


const Product = mongoose.model('product',
     {
           "productId": Number ,
           "category": String,
           "price": Number,
           "name": String,
           "instock": Boolean
    })

app.get('/product/get/', (req, res) =>{
    Product.find({},(err, products)=>{
        if (err){
            console.log('error: ', err)
        }else{
            res.send(products)
        }       
    })
})

app.post('/product/create/', (req, res) => {
    const { id, category, price, name, instock } = req.body
    let product = new Product({ productId: id, category, price, name, instock })
  
    product.save(err => {
      if (err) {
        res.sendStatus(500)
        console.log('Error in saving data: ', err)
      } else {
        res.sendStatus(200)
      }
    })
  })



app.put('/product/update/:productId', (req, res) => {
    Product.updateOne(
      { productId: req.params.productId },
      { upsert: false },
      err => {
        if (err){ 
            console.log('Update Error: ', err)
        }else{ 
            res.sendStatus(200)}
      }
    )
  })


app.delete('/product/delete/:productId', (req, res) => {
    Product.deleteOne({productId: req.params.productId }, err => {
        if (err) {
            console.log('Delete Error: ', err)
        }else {
            res.sendStatus(200)}
    })
    res.send(req.params)
})



app.listen(3001)