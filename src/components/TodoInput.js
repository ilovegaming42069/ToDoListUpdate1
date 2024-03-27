import React, { useState } from 'react';
import { db, auth } from '../firebase/firebase-config';
import { collection, addDoc } from 'firebase/firestore';

function TodoInput() {
    const [inputText, setInputText] = useState('');

    const addToFirestore = async (inputText) => {
        const user = auth.currentUser;
        if (!inputText.trim() || !user) return; // Exit if input is empty or user is not logged in
        try {
            await addDoc(collection(db, 'todos'), {
                text: inputText,
                status: 'not-started',
                uid: user.uid, // Include the UID of the user in the document
            });
            console.log('Item added to Firestore');
        } catch (error) {
            console.error('Error adding item to Firestore:', error);
        }
    };

    const handleEnterPress = async (e) => {
        if (e.keyCode === 13) {
            await addToFirestore(inputText);
            setInputText("");
        }
    };

    return (
        <div className="input-container">
            <input
                type="text"
                className="input-box-todo"
                placeholder="This is my to do list!"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleEnterPress}
            />
            <button
                className="add-btn"
                onClick={async () => {
                    await addToFirestore(inputText);
                    setInputText("");
                }}
            >+</button>
        </div>
    );
}

export default TodoInput;
