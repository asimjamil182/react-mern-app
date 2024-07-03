'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const createItem = async () => {
    try {
      const newItem = { name, quantity, description };
      const response = await axios.post('http://localhost:5000/items', newItem);
      setItems([...items, response.data]);
      setName('');
      setQuantity('');
      setDescription('');
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  const updateItem = async (id) => {
    try {
      const updatedItem = { name, quantity, description };
      const response = await axios.patch(`http://localhost:5000/items/${id}`, updatedItem);
      setItems(items.map(item => (item._id === id ? response.data : item)));
      setName('');
      setQuantity('');
      setDescription('');
      setEditingId(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`);
      setItems(items.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateItem(editingId);
    } else {
      createItem();
    }
  };

  const handleEdit = (item) => {
    setName(item.name);
    setQuantity(item.quantity);
    setDescription(item.description);
    setEditingId(item._id);
  };

  return (
    <div>
      <h1>Item List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">{editingId ? 'Update' : 'Create'}</button>
      </form>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.name} - {item.quantity} - {item.description}
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
