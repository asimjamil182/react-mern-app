const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productsRouter = require('./routes/products');
const cors=require('cors');


const app = express();
const PORT = 5000;
const connection_string="mongodb+srv://mern1263:Mern1263@cluster0.iqpubcl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});

app.use('/products', productsRouter);

mongoose
  .connect(connection_string)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });