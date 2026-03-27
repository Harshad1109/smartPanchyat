
  # E-Governance Grievance System

  <!-- This is a code bundle for E-Governance Grievance System. The original project is available at https://www.figma.com/design/xxwEcvH3RnNZWUsMs0eMKx/E-Governance-Grievance-System. -->

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  1. Prerequisites
Before running the application, ensure you have the following installed:

Node.js (v14 or higher)

npm (comes with Node.js)

MongoDB (Local or Atlas)

2. Setting up MongoDB
The backend requires a running MongoDB instance. The default connection string is set to mongodb://127.0.0.1:27017/smart_panchayat.

Check if MongoDB is installed
Open your terminal or command prompt and run:

Bash
mongod --version
If you see a version number, MongoDB is installed. If you get a "command not found" error, follow the installation steps below.

Installing MongoDB (Local)
For Windows:
Download the MongoDB Community Server MSI from the official website.

Run the installer and select "Complete" setup.

Ensure "Install MongoDB as a Service" is checked.

(Optional but recommended) Install MongoDB Compass when prompted to visualize your data.

For macOS (using Homebrew):
Open terminal and run: brew tap mongodb/brew

Install: brew install mongodb-community@7.0

Start the service: brew services start mongodb-community

3. Environment Configuration
You must configure the environment variables for both the client and server.

Backend Setup (/server/.env)
Create a .env file in the server directory and add the following:

Code snippet
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/smart_panchayat
JWT_SECRET=your_jwt_secret_here
SMS_API_KEY=your_sms_gateway_key
Frontend Setup (/.env)
Create a .env file in the root directory:

Code snippet
VITE_API_URL=http://localhost:5000/api
4. Installation and Running the Code
Step 1: Install Backend Dependencies
Navigate to the server folder and install packages:

Bash
cd server
npm install
Step 2: Install Frontend Dependencies
Navigate to the root project folder and install packages:

Bash
cd ..
npm install
Step 3: Start the Application
You will need two terminal windows/tabs open.

Terminal 1: Start Backend

Bash
cd server
npm start
The server will run on http://localhost:5000.

Terminal 2: Start Frontend

Bash
npm run dev
The frontend will typically be available at http://localhost:5173.
  
