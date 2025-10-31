import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000');

function App() {
  const [username, setUsername] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Listen for incoming messages
    socket.on('receiveMessage', (messageData) => {
      setMessages(prevMessages => [...prevMessages, messageData]);
    });

    // Listen for user join/leave
    socket.on('userJoined', (user) => {
      setMessages(prevMessages => [...prevMessages, {
        id: Date.now(),
        text: `${user} joined the chat`,
        sender: 'System',
        timestamp: new Date().toISOString(),
        type: 'system'
      }]);
    });

    socket.on('userLeft', (user) => {
      setMessages(prevMessages => [...prevMessages, {
        id: Date.now(),
        text: `${user} left the chat`,
        sender: 'System',
        timestamp: new Date().toISOString(),
        type: 'system'
      }]);
    });

    // Listen for active users
    socket.on('activeUsers', (users) => {
      setActiveUsers(users);
    });

    // Listen for typing indicators
    socket.on('userTyping', (data) => {
      if (data.isTyping) {
        setTypingUsers(prev => [...prev, data.username]);
      } else {
        setTypingUsers(prev => prev.filter(user => user !== data.username));
      }
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('userJoined');
      socket.off('userLeft');
      socket.off('activeUsers');
      socket.off('userTyping');
    };
  }, []);

  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      socket.emit('join', username);
      setIsJoined(true);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('sendMessage', { text: message });
      setMessage('');
      socket.emit('typing', false);
      setIsTyping(false);
    }
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    if (!isTyping) {
      socket.emit('typing', true);
      setIsTyping(true);
    }

    // Stop typing indicator after 1 second of no typing
    setTimeout(() => {
      socket.emit('typing', false);
      setIsTyping(false);
    }, 1000);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isJoined) {
    return (
      <div className="join-container">
        <div className="join-form">
          <h1>Real-Time Chat</h1>
          <form onSubmit={handleJoin}>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <button type="submit">Join Chat</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Chat Room</h1>
        <div className="user-info">
          <span>Welcome, {username}!</span>
          <span className="online-count">Online: {activeUsers.length}</span>
        </div>
      </div>

      <div className="chat-main">
        <div className="messages-container">
          <div className="messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.type === 'system' ? 'system' : msg.sender === username ? 'own' : 'other'}`}
              >
                {msg.type !== 'system' && (
                  <div className="message-header">
                    <span className="sender">{msg.sender}</span>
                    <span className="timestamp">{formatTime(msg.timestamp)}</span>
                  </div>
                )}
                <div className="message-text">{msg.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {typingUsers.length > 0 && (
            <div className="typing-indicator">
              {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
            </div>
          )}
        </div>

        <div className="active-users">
          <h3>Active Users ({activeUsers.length})</h3>
          <ul>
            {activeUsers.map((user, index) => (
              <li key={index} className={user === username ? 'current-user' : ''}>
                {user} {user === username && '(You)'}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <form className="message-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={handleTyping}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
