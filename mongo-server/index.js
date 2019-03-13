const mongoose = require('mongoose');
const data = require('../mockData');
const express = require('express');
const repo = require('./DAL/productRepository');
const cors = require('cors');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/products')
    .then(() => console.log('Connected to mongoDb...'))
    .catch(err => console.error('Could not connecto DB...', err))

const app = express();
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.listen(5000, () => {
    console.log('server ba avir on 5000');
});


const productsSchema = new mongoose.Schema({
    imageUrl: String,
    _id: Number,
    product: String,
    price: String,
    inStock: Boolean
});

const Product = mongoose.model('Product', productsSchema);

async function createProduct() {
    await Product.insertMany(data);

    const result = await product.save();
}

app.post('/api/products', (req, res) => {
    //Product.find().where('_id').gte(20).lte(30)
    console.log(req.body.start);
    Product.find().skip(req.body.start).limit(10).then((docs, err) => {
        if (err) {
            console.log('err: ');
            console.log(err);
        } else {
            console.log('in else: ');
            res.send(docs);
        }
    })
});

// createProduct(); 

