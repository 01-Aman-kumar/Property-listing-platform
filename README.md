Mini Property Listing Platform

NOTE: Currently it is taking more time to fetch data comapared to normal websites

A simplified property listing web app built with Next.js, Node.js, Express, and MongoDB.
Users can view properties, and admins can log in to add new properties.

 Features

Home Page: View all property listings (title, price, location, image).

Property Details Page: Dynamic route /property/[id].

Admin Panel: Protected route with JWT authentication.

REST API with MongoDB (CRUD for properties).

Responsive UI inspired by 99acres.

Bonus: Search & filter properties.

 Tech Stack

Frontend:  React, Bootstrap CSS

Backend: Node.js, Express.js

Database: MongoDB Atlas

Authentication: JWT

Installation & Setup
Clone the repository
git clone https://github.com/your-username/property-listing-platform.git
cd client
npm install

2️⃣ Backend Setup
cd server
npm install


Create a .env file in /backend and add:

MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
PORT=8080


Run the backend:

node server.js

3️⃣ Frontend Setup
cd client
npm install
npm run dev




🔑 Admin Login (Hardcoded)

Email: admin@test.com

Password: admin123
API Endpoints

GET /api/properties → fetch all properties

GET /api/properties/:id → fetch property details

POST /api/properties → add a new property (admin only, JWT required)

🌍 Deployment Links

Live App: [property-listing-platform-7cpf.vercel.app]

GitHub Repo: [https://github.com/01-Aman-kumar/Property-listing-platform.git]

👨‍💻 Author

Aman Kumar
B.Tech CSE, Maharishi University