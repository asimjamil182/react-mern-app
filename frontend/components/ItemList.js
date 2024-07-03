'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const createItem = async () => {
    try {
      const newItem = { name, quantity, price, description };
      const response = await axios.post('http://localhost:5000/products', newItem);
      setItems([...items, response.data]);
      setName('');
      setQuantity('');
      setPrice('');
      setDescription('');
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  const updateItem = async (id) => {
    try {
      const updatedItem = { name, quantity, description };
      const response = await axios.patch(`http://localhost:5000/products/${id}`, updatedItem);
      setItems(items.map(item => (item._id === id ? response.data : item)));
      setName('');
      setQuantity('');
      setPrice('');
      setDescription('');
      setEditingId(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
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
    setPrice(item.price);
    setDescription(item.description);
    setEditingId(item._id);
  };

  return (
    <div className='w-full h-screen bg-zinc-950 flex items-center justify-center'>
      <div className='border border-slate-950 w-3/4 h-3/4 bg-slate-800'>
        <div className='text-center text-white uppercase border-b border-white p-1'>Add Product</div>
        <div className='flex'>
          <div className='w-1/3 border-r border-white'>
            <form onSubmit={handleSubmit} className='p-3'>
              <input
                className='p-2 bg-black text-white outline-none w-full mb-2'
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className='p-2 bg-black text-white outline-none w-full mb-2'
                type="number"
                placeholder="Product Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
              <input
                className='p-2 bg-black text-white outline-none w-full mb-2'
                type="number"
                placeholder="Product Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <input
                className='p-2 bg-black text-white outline-none w-full mb-2'
                type="text"
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <button className='p-2 w-full bg-green-800 text-white' type="submit">{editingId ? 'Update' : 'Add'}</button>
            </form>
          </div>
          <div className='w-2/3 p-3 overflow-y-auto'>
            <table className='table-auto w-full mx-auto border text-center'>
              <thead className='bg-blue-600 text-white p-2 font-thin'> 
              <tr>
                <th>Product Name</th>
                <th>Product Quantity</th>
                <th>Product Price</th>
                <th>Product Description</th>
                <th>Action</th>
              </tr>
              </thead>
              {items.map(item => (
                <tr key={item._id}>
                  <td className='p-1 text-gray-300 bg-black border-b border-gray-600'>{item.name}</td>
                  <td className='p-1 text-gray-300 bg-black border-b border-gray-600'>{item.quantity}</td>
                  <td className='p-1 text-gray-300 bg-black border-b border-gray-600'>{item.price}</td>
                  <td className='p-1 text-gray-300 bg-black border-b border-gray-600'>{item.description}</td>
                  <td className='flex gap-2'>
                    <button className='bg-green-600 text-white px-2 text-center' onClick={() => handleEdit(item)}>Edit</button>
                    <button className='bg-red-600 text-white px-2 text-center' onClick={() => deleteItem(item._id)}>Delete</button>
                  </td>

                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ItemList;
