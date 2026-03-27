
  # E-Governance Grievance System

  <!-- This is a code bundle for E-Governance Grievance System. The original project is available at https://www.figma.com/design/xxwEcvH3RnNZWUsMs0eMKx/E-Governance-Grievance-System. -->

  <!-- ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server. -->

⚙️ Prerequisites

Before running the application, make sure you have the following installed:

Node.js (v14 or higher)
npm (comes with Node.js)
MongoDB (Local installation or MongoDB Atlas)
🗄️ MongoDB Setup

The backend requires a running MongoDB instance.

Default Connection URL:

mongodb://127.0.0.1:27017/smart_panchayat
🔍 Check if MongoDB is Installed

Open your terminal or command prompt and run:

mongod --version
✅ If a version number appears → MongoDB is installed
❌ If you see "command not found" → Install MongoDB (see below)
📥 Install MongoDB
🪟 Windows
Download MongoDB Community Server (MSI) from the official website
Run the installer
Select Complete Setup
✔ Enable Install MongoDB as a Service
(Optional) Install MongoDB Compass for GUI access
🍎 macOS (using Homebrew)
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb-community
🔐 Environment Configuration

You need to configure environment variables for both backend and frontend.

🔧 Backend Setup (/server/.env)

Create a .env file inside the server folder:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/smart_panchayat
JWT_SECRET=your_jwt_secret_here
SMS_API_KEY=your_sms_gateway_key
🎨 Frontend Setup (/.env)

Create a .env file in the root directory:

VITE_API_URL=http://localhost:5000/api
🚀 Installation & Running the Project
1️⃣ Install Backend Dependencies
cd server
npm install
2️⃣ Install Frontend Dependencies
cd ..
npm install
3️⃣ Start the Application

You need two terminals running simultaneously:

▶️ Terminal 1 — Start Backend
cd server
npm start
Backend runs on: http://localhost:5000
▶️ Terminal 2 — Start Frontend
npm run dev
Frontend runs on: http://localhost:5173