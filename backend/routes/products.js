const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Create a new item
router.post('/', async (req, res) => {
    const { name, quantity,price, description } = req.body;
    const item = new Product({ name, quantity,price, description });
    try {
        const savedItem = await item.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all items
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get an item by ID
router.get('/:id', async (req, res) => {
    try {
        const item = await Product.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Product not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update an item by ID
router.patch('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const { name, quantity, price, description } = req.body;
        if (name) product.name = name;
        if (quantity) product.quantity = quantity;
        if (price) product.price = price;
        if (description) product.description = description;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an item by ID
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        await product.remove();
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
