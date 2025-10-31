# Real-Time Chat Application with Socket.io

A full-featured real-time chat application built with Node.js, Express, Socket.io, and React that demonstrates bidirectional communication between clients and server.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Features in Detail](#features-in-detail)
- [Contributing](#contributing)

## 🎯 Project Overview

This real-time chat application showcases modern web development practices with WebSocket technology. Users can join chat rooms, send instant messages, see typing indicators, and view online user status. The application demonstrates seamless bidirectional communication between multiple clients and a central server.

### Key Highlights

- **Real-time messaging** with instant delivery
- **User presence** tracking and online status
- **Typing indicators** for enhanced UX
- **Responsive design** for all devices
- **Scalable architecture** using Socket.io rooms and namespaces

## ✨ Features

### Core Functionality
- ✅ User authentication (username-based)
- ✅ Real-time messaging in global chat room
- ✅ Message history with timestamps
- ✅ User join/leave notifications
- ✅ Online user presence tracking

### Advanced Features
- ✅ **Typing indicators** - See when others are typing
- ✅ **Active user list** - Real-time online user count and list
- ✅ **Responsive design** - Works on desktop and mobile
- ✅ **Smooth animations** - Fade-in messages and typing indicators
- ✅ **System messages** - Automated notifications for user events

### Technical Features
- ✅ **Bidirectional communication** - Full WebSocket implementation
- ✅ **Automatic reconnection** - Handles network interruptions
- ✅ **Message delivery acknowledgment** - Reliable message delivery
- ✅ **Optimized performance** - Efficient Socket.io room management
- ✅ **Cross-platform compatibility** - Works on all modern browsers

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Socket.io** - Real-time bidirectional communication
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Socket.io-client** - Client-side WebSocket communication
- **CSS3** - Modern styling with animations
- **Responsive design** - Mobile-first approach

### Development Tools
- **Nodemon** - Auto-restart for development
- **Create React App** - React application boilerplate

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (optional, for cloning)

You can check your versions by running:
```bash
node --version
npm --version
```

## 🚀 Installation & Setup

### 1. Clone or Download the Project

If using git:
```bash
git clone https://github.com/PLP-MERN-Stack-Development/real-time-communication-with-socket-io-Brilloku.git
```

Or download and extract the ZIP file to your desired location.

### 2. Install Server Dependencies

```bash
cd server
npm install
```

This will install:
- express (^4.18.2)
- socket.io (^4.7.2)
- cors (^2.8.5)
- nodemon (^3.0.1) - for development

### 3. Install Client Dependencies

```bash
cd ../client
npm install
```

This will install React and all necessary dependencies including socket.io-client.

## ▶️ Running the Application

### Start the Server

```bash
cd server
npm run dev
```

The server will start on **http://localhost:5000**

### Start the Client

Open a new terminal window and run:

```bash
cd client
npm start
```

The React application will start on **http://localhost:3000**

### Access the Application

Open your browser and navigate to **http://localhost:3000**

## 🌐 Deployment

### Deploying to Netlify (Frontend)

1. **Build the client for production:**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to [Netlify](https://netlify.com)
   - Drag and drop the `client/build` folder to the deployment area
   - Or connect your GitHub repository and set build settings:
     - Build command: `npm run build`
     - Publish directory: `build`

3. **Environment Variables:**
   - In Netlify dashboard, go to Site settings > Environment variables
   - Add: `REACT_APP_SOCKET_URL` with your deployed server URL

### Deploying to Render (Backend)

1. **Create a Render account** at [render.com](https://render.com)

2. **Deploy the server:**
   - Connect your GitHub repository
   - Choose "Web Service"
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Add environment variable: `NODE_ENV=production`

3. **Update client environment:**
   - Update `client/.env.production` with your Render server URL
   - Redeploy the client

### Alternative: Deploy Backend to Railway

1. **Railway deployment:**
   ```bash
   npm install -g @railway/cli
   railway login
   cd server
   railway init
   railway up
   ```

2. **Update client** with the Railway URL

### Docker Deployment (Optional)

If you prefer Docker deployment:

```bash
cd server
docker build -t chat-server .
docker run -p 5000:5000 chat-server
```

## 📁 Project Structure

```
..../
├── server/                          # Backend server
│   ├── server.js                    # Main server file with Socket.io logic
│   ├── package.json                 # Server dependencies and scripts
│   └── node_modules/                # Server dependencies
├── client/                          # Frontend React application
│   ├── src/
│   │   ├── App.js                   # Main React component
│   │   ├── App.css                  # Application styling
│   │   └── index.js                 # React entry point
│   ├── public/                      # Static assets
│   └── package.json                 # Client dependencies
└── README.md                        # This file
```

## 📡 API Documentation

### Socket.io Events

#### Client to Server Events

| Event | Payload | Description |
|-------|---------|-------------|
| `join` | `{ username: string }` | User joins the chat with username |
| `sendMessage` | `{ text: string }` | Send a message to all users |
| `typing` | `boolean` | Indicate typing status |
| `privateMessage` | `{ recipient: string, message: string }` | Send private message |

#### Server to Client Events

| Event | Payload | Description |
|-------|---------|-------------|
| `receiveMessage` | `Message object` | Receive a public message |
| `receivePrivateMessage` | `Private message object` | Receive a private message |
| `userJoined` | `username: string` | User joined notification |
| `userLeft` | `username: string` | User left notification |
| `activeUsers` | `Array<string>` | List of active users |
| `userTyping` | `{ username: string, isTyping: boolean }` | Typing status update |

### Message Object Structure

```javascript
{
  id: "unique-message-id",
  text: "Message content",
  sender: "username",
  timestamp: "2024-01-01T12:00:00.000Z",
  type: "message" // or "system" for system messages
}
```

## 🎨 Features in Detail

### Real-Time Messaging
- Instant message delivery using WebSocket connections
- Messages appear immediately for all connected users
- Message history persists during the session

### User Presence System
- Users join with unique usernames
- Real-time tracking of online users
- Visual indicators (green dots) for active users
- Automatic cleanup when users disconnect

### Typing Indicators
- Shows "X is typing..." when users start composing
- Real-time updates with 1-second timeout
- Multiple users typing support

### Responsive Design
- Mobile-first approach with CSS Grid and Flexbox
- Adapts to different screen sizes
- Touch-friendly interface for mobile devices

### Performance Optimizations
- Socket.io rooms for efficient message routing
- Automatic reconnection handling
- Optimized rendering with React hooks
- Smooth animations with CSS transitions

## 🧪 Testing the Application

### Basic Testing
1. Open multiple browser tabs/windows to `http://localhost:3000`
2. Join with different usernames in each tab
3. Send messages and observe real-time updates
4. Test typing indicators by starting to type in one tab
5. Close a tab to see user leave notifications

### Advanced Testing
- Test on different devices (mobile, tablet, desktop)
- Check network disconnection/reconnection
- Verify message delivery reliability
- Test with multiple users simultaneously

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Future Enhancements

- [ ] Private messaging UI
- [ ] File/image sharing
- [ ] Message reactions (like, love, etc.)
- [ ] Message search functionality
- [ ] Message persistence with database
- [ ] User authentication with JWT
- [ ] Multiple chat rooms
- [ ] Message encryption
- [ ] Push notifications
- [ ] Message read receipts

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed description
3. Include your Node.js version and error messages

## 🙏 Acknowledgments

- [Socket.io](https://socket.io/) for real-time communication
- [React](https://reactjs.org/) for the UI framework
- [Express.js](https://expressjs.com/) for the server framework
- [Create React App](https://create-react-app.dev/) for the React boilerplate

---

**Happy chatting! 🎉**
