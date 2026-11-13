import React from 'react';
import { useState } from 'react';
import { useTheme } from '../Components/ThemeContext'

function Contact() {
    const { theme } = useTheme();
    const showAlert = (message) => {
        message.preventDefault();
        alert(message);
    };
    return (
        <div class={theme}>
            <form>
                <label htmlFor='name'> Name:</label>
                <input id='name' placeholder='Ex. John Smith' required></input>
                
                <label htmlFor='email'>Email:</label>
                <input id='email' placeholder='example@email.com' required></input>
                
                <p htmlFor='message' class='message'>Message:</p>
                <textarea id='message' placeholder='Leave a message...'></textarea>

                <button 
                    type='submit' 
                    onClick={() => showAlert('Message sent! Thank you for contacting us!')} 
                >Submit</button>
            </form>
        </div>
    );
}

export default Contact;