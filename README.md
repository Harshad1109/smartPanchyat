
  # E-Governance Grievance System

  <!-- This is a code bundle for E-Governance Grievance System. The original project is available at https://www.figma.com/design/xxwEcvH3RnNZWUsMs0eMKx/E-Governance-Grievance-System. -->

  <!-- ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server. -->

# Smart Panchayat 🚀

## ⚙️ Prerequisites

Before running the application, make sure you have the following
installed:

-   Node.js (v14 or higher)\
-   npm (comes with Node.js)\
-   MongoDB (Local installation or MongoDB Atlas)

------------------------------------------------------------------------

## 🗄️ MongoDB Setup

The backend requires a running MongoDB instance.

### 🔗 Default Connection URL:

mongodb://127.0.0.1:27017/smart_panchayat

------------------------------------------------------------------------

## 🔍 Check if MongoDB is Installed

Run the following command:

mongod --version

-   If a version appears → MongoDB is installed\
-   If "command not found" → Install MongoDB

------------------------------------------------------------------------

## 📥 Install MongoDB

### Windows

-   Download MongoDB Community Server\
-   Run installer → Complete Setup\
-   Enable MongoDB as a Service\
-   Install MongoDB Compass

### macOS

brew tap mongodb/brew\
brew install mongodb-community@7.0\
brew services start mongodb-community

------------------------------------------------------------------------

## 🔐 Environment Configuration

### Backend (/server/.env)

PORT=5000\
MONGO_URI=mongodb://127.0.0.1:27017/smart_panchayat\
JWT_SECRET=your_jwt_secret_here\
SMS_API_KEY=your_sms_gateway_key

------------------------------------------------------------------------

### Frontend (/.env)

VITE_API_URL=http://localhost:5000/api

------------------------------------------------------------------------

## 🚀 Run the Project

### Install Dependencies

cd server\
npm install

cd ..\
npm install

------------------------------------------------------------------------

### Start Application

#### Terminal 1 (Backend)

cd server\
node server.js

Runs on: http://localhost:5000

#### Terminal 2 (Frontend)

npm run dev

Runs on: http://localhost:5173
