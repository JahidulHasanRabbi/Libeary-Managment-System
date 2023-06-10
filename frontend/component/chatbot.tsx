import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
} from '@mui/material';

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = () => {
    // Send message to the chatbot API
    axios
      .post('http://127.0.0.1:8000/api/chatbot/', { input: message })
      .then((response) => {
        console.log(response.data);
        // Append the user message and bot response to the chat history
        setChatHistory((prevChatHistory) => [
          ...prevChatHistory,
          { sender: 'user', message },
          { sender: 'bot', message: response.data.response },
        ]);
        // Clear the message input field
        setMessage('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '1rem', marginTop: '2rem' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Chat with Bot
        </Typography>
        <div style={{ height: '300px', overflowY: 'auto' }}>
          {chatHistory.map((chat, index) => (
            <div key={index}>
              <Typography
                variant="body1"
                style={{
                  fontWeight: chat.sender === 'bot' ? 'bold' : 'normal',
                  color: chat.sender === 'bot' ? 'blue' : 'inherit',
                }}
              >
                {chat.sender === 'user' ? 'You: ' : 'Bot: '}
                {chat.message}
              </Typography>
            </div>
          ))}
        </div>
        <TextField
          label="Message"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ marginTop: '1rem' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={sendMessage}
          style={{ marginTop: '1rem' }}
        >
          Send
        </Button>
      </Paper>
    </Container>
  );
};

export default ChatPage;
