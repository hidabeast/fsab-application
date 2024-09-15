"use client";

import React, { useEffect, useState } from 'react';
// import { fetchToDoItems } from './services/apiService';
import EditToDoForm from './components/EditToDoForm';

export default function Home() {
    const [toDoItems, setToDoItems] = useState([]);
    const [description, setDescription] = useState('');
    const [toDoBy, setToDoBy] = useState('');
    const [category, setCategory] = useState('');
    const [editItem, setEditItem] = useState(null);

    async function fetchToDoItems() {
        const response = await fetch('http://localhost:8080/to-do', { method: "GET"});
        const resJSON = await response.json();
        return resJSON;
    };

    useEffect(() => {
        const fetchItems = async () => {
            const items = await fetchToDoItems()
            setToDoItems(items);
        };
        fetchItems();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newItem = { description, toDoBy, category };
        await fetch('http://localhost:8080/to-do', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
        });

        const updatedItems = await fetchToDoItems();
        setToDoItems(updatedItems);

        setDescription('');
        setToDoBy('');
        setCategory('');
    };

    const handleEditClick = (item) => {
        setEditItem(item);
    };

    // const handleUpdate = async (updatedItem) => {
    //     await fetch(`http://localhost:8080/to-do/${updatedItem.id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(updatedItem),
    //     });

    //     const updatedItems = await fetchToDoItems();
    //     setToDoItems(updatedItems);
    //     setEditItem(null);
    // };

    const handleCloseEditForm = () => {
        setEditItem(null);
    };

    const handleDelete = async (id) => {
        await fetch(`http://localhost:8080/to-do/${id}`, {
            method: 'DELETE',
        });
        const updatedItems = await fetchToDoItems();
        setToDoItems(updatedItems);
    };

    return (
        <div className="container">
            <h1>John's To Do List</h1>
            <form className="add-form" onSubmit={handleSubmit}>
                <h2>Add New Item</h2>
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required/>
                <input type="text" placeholder="Due Date" value={toDoBy} onChange={(e) => setToDoBy(e.target.value)} required/>
                <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required/>
                <button type="submit">Add Item</button>
            </form>

            <h2>To Do Items:</h2>
            <ul>
                {toDoItems.map((item) => (
                    <li key={item.id} className="todo-item">
                        <h2>{item.description}</h2>
                        <p><strong>Due By:</strong> {item.toDoBy}</p>
                        <p className="category"><strong>Category:</strong> {item.category}</p>
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                        <button onClick={() => handleEditClick(item)}>Edit</button>
                    </li>
                ))}
            </ul>
            {editItem && (
                <EditToDoForm currentItem={editItem} /* onUpdate={handleUpdate} */ onClose={handleCloseEditForm}/>
            )}
        </div>
    );
}