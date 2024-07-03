const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const itemsRouter = require('./routes/items');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/items', itemsRouter);

var connection_string="mongodb+srv://mern1263:Mern1263@cluster0.iqpubcl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(connection_string, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });
