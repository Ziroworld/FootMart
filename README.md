# FootMart
FootyConnect
Description
FootyConnect is a MERN stack web application designed for football enthusiasts, combining e-commerce and community features. Users can shop for football merchandise like boots and jerseys, view local tournament standings, and connect with local players through detailed profiles with ratings. Built for a seamless user experience, it aims to support grassroots football communities while offering a practical shopping platform.
Prerequisites

Node.js (version 14 or higher)
MongoDB (local installation or MongoDB Atlas)

Installation

Clone the repository:
git clone https://github.com/Ziroworld/footyconnect.git


Navigate to the project directory:
cd footyconnect


Install backend dependencies:
npm install


Navigate to the frontend directory and install dependencies:
cd client
npm install


Build the frontend:
npm run build
cd ..


Set up environment variables:

Copy the .env.example file to .env
Fill in the required values (e.g., MongoDB URI, port number)



Running the Application
Option 1: Run the full application on port 8080

Start the backend server:
npm start


Open your browser and navigate to:
http://localhost:8080



Option 2: Run frontend and backend separately (for development)

Start the backend server:
npm run server


In a separate terminal, start the frontend:
cd client
npm start


The frontend will be available at http://localhost:3000, and it will proxy API requests to the backend at http://localhost:5000.


Note: If using Option 2, ensure the proxy is correctly set in the frontend's package.json (e.g., "proxy": "http://localhost:5000").
License
This project is licensed under the MIT License - see the LICENSE file for details.
Additional Notes:

Replace yourusername with your actual GitHub username in the clone command.
Ensure the repository URL matches your project’s GitHub URL.
Adjust port numbers or script names if your project configuration differs.

