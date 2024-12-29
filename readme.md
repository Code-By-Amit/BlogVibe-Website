# BlogVibe

Welcome to **BlogVibe**, a blogging platform built using the **MERN Stack**. This application allows you to share your interesting stories with the world and connect with readers. ✍️🌍

BlogVibe provides a seamless experience for both writers and readers, making it easy to create, share, and interact with content. 📖❤️

## Features

### 1. **User Authentication** 🔐
- Secure Signup/Login with **JWT-based authentication**.
- **Google OAuth** based Signup/Login.
- **Username/password** based authentication.

### 2. **Blog Management** 📚
- Users can **Create**, **Read**, **Update**, and **Delete** their blogs.
- Readers can **Leave Comments** on blog posts.
- Readers can **Like** or **Unlike** blog posts.

### 3. **User Profile** 👤
- Each authenticated user has their own **Dashboard** to create, update, and delete blogs.
- Users can **Update their Profile** using their password.
- Users can view **Blog Analytics** (total reads, likes, and comments) for each blog.

---

## Tech Stack 🛠️

### Frontend:
- **React.js**: For building dynamic user interfaces.
- **Tailwind CSS**: For beautiful, responsive styling.
- **Axios**: For handling HTTP requests.
- **React Router Dom**: For navigating between pages.

### Backend:
- **Node.js** with **Express.js**: For building the server-side application.
- **MongoDB**: For database storage.
- **JWT**: Token-based stateless authentication.
- **Passport.js** with **passport-google-oauth20**: For integrating **Google OAuth** authentication.
- **Mongoose**: For database schema.
- **Cloudinary** and **Multer**: For storing images in the cloud.

---

## Installation 🚀

1. Clone the repository:

```bash
   git clone https://github.com/Code-By-Amit/BlogVibe-Website.git
```
2. Navigate to Client and Backend Folder and Install dependencies:
```
# Client
cd client 
npm install

# Backend
cd backend
npm install
```

3. Set up environment variables in `backend/.env`:
```javascript
PORT=

MONGODB_URI=
FRONTEND_URL=
JWT_SECRET=
NODE_ENV=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

4. Start the development servers:
- Backend 
``` bash
    cd backend
    npm run dev
```
- Frontend
```bash
   cd client
   npm run dev
```

## Contributing 🤝
We welcome contributions! Feel free to fork the repo, create a new branch, and submit a pull request. 

## Thank You
Thank you for checking out BlogVibe! We hope you enjoy using and contributing to it! 😄✨

