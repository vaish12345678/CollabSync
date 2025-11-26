# CollabSync — Real-Time Collaboration Platform

CollabSync is a **real-time collaboration web application** built with the **MERN stack + WebSockets**.  
It allows users to join rooms, chat, and collaboratively edit notes/documents in real-time.  

This project demonstrates **real-time communication, socket programming, and collaborative editing** with a clean UI.

---
## Workspace Demo

1. User logs in  
2. Creates a new workspace  
3. Invites team members (via link)
4. Each member sees workspace and can collaborate in real-time

## Key Features

### User Features
- Secure Login & Registration  
- Create or join collaboration rooms  
- Real-time text/notes editing  
- Real-time chat with all room members  
- Manage personal profile  

### Admin / Room Features
- Create and manage rooms  
- Remove users from rooms (if applicable)  
- Real-time updates for room activity  

### Workspace & Roles
- Users see only the workspaces they are part of  
- Create multiple workspaces and switch between them  
- Role-based access: Admins can manage rooms and members, users can view/edit notes only in allowed workspaces


## 🧰 Tech Stack

### Frontend
- React.js  
- Vite  
- Tailwind CSS  
- Axios  
- React Router  
- Socket.IO-client  

### Backend
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- Socket.IO-server  
- JWT Authentication  
- CORS  

---

 ## Real-Time Collaboration Demo

![Real-Time Collaboration](screenshots/real-time.gif)
*Watch multiple users editing notes and chatting in real-time!*

## Screenshots

| Dashboard / Rooms | 
|-----------------|-----------|
| ![Dashboard](screenshots/Home.png) |

| Workspaces 
|--------------------|--------------|
| ![Editor](screenshots/Workspaces.png) | 

| Workspace View | Invite Link Modal |
|----------------|-----------------|
| ![Workspace](screenshots/Invite.png) | 


---

##  Folder Structure

```
CollabSync/
│── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── App.jsx
```

---

##  Installation & Setup

### Clone the Repository
```bash
git https://github.com/vaish12345678/CollabSync.git
cd collabsync
```

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
PORT=5000
```

Start backend:
```bash
nodemon server.js
```

---

### Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

---

## API Endpoints Overview

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/auth/register` | Register new user |
| POST   | `/api/auth/login` | Login user |

### Rooms
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/rooms` | Fetch all rooms |
| POST   | `/api/rooms` | Create new room |
| GET    | `/api/rooms/:id` | Fetch room by ID |
| PUT    | `/api/rooms/:id` | Update room info |


### Messages / Collaboration
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/messages` | Send message in room |
| GET    | `/api/messages/:roomId` | Get messages for room |
| POST   | `/api/collab` | Update collaborative document |
| GET    | `/api/collab/:roomId` | Fetch latest document state |

> **Note:** Real-time updates are handled by **Socket.IO**.  

---

##  Highlights
- Real-time collaboration & chat using **WebSockets**  
- JWT-based authentication  
- UI with Tailwind CSS  
- End-to-end MERN stack application  

---

## Future Improvements
- Video/audio chat in rooms  
 - File sharing inside rooms  
  

---

## Author
**Vaishnavi — Full Stack Developer**

---

## License
MIT License
