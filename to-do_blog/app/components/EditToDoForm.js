"use client";
import React, { useState, useEffect } from 'react';

export default function EditToDoForm({ currentItem, /*onUpdate,*/ onClose }) {
    const [description, setDescription] = useState(currentItem?.description || '');
    const [toDoBy, setToDoBy] = useState(currentItem?.toDoBy || '');
    const [category, setCategory] = useState(currentItem?.category || '');

    useEffect(() => {
        if (currentItem) {
            setDescription(currentItem.description);
            setToDoBy(currentItem.toDoBy);
            setCategory(currentItem.category);
        }
    }, [currentItem]);

    const handleSubmit = async (e) => {
        e.preventDefault();
            const response = await fetch(`http://localhost:8080/to-do/${currentItem.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description, toDoBy, category }),
        });
        // onUpdate();
        // onClose();
        window.location.reload();
    };

    return (
        <div className="edit-form">
            <h2>Edit To-Do Item</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Description:
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
                </label>
                <label>
                    Due Date:
                    <input type="text" value={toDoBy} onChange={(e) => setToDoBy(e.target.value)}/>
                </label>
                <label>
                    Category:
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)}/>
                </label>
                <button type="submit">Save Changes</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}