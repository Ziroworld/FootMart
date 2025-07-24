
# ⚽️ FootMart

FootMart is a modern MERN stack web application designed for football enthusiasts in Nepal and beyond. The platform combines a user-friendly e-commerce store for football gear with vibrant community features, allowing users to shop, review, and connect—all in one place.

---

## 🚀 Features

- 🛒 Shop for football merchandise (boots, jerseys, accessories)
- 🌟 Wishlist and cart functionality
- 🏆 View local tournament standings
- 👤 Player profiles with reviews and ratings
- 🏃 Responsive, minimal UI for seamless browsing
- 🔒 JWT authentication for secure logins

---

## 📸 Homepage

**This is the homepage.**  
![Homepage](homepage.png)

---

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local install or MongoDB Atlas)

---

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ziroworld/FootMart.git
   
---

2. **Navigate to the project directory**

   ```bash
   cd FootMart
   ```

   ---
3. **Install backend dependencies**

   ```bash
   npm install
   ```
---

4. **Navigate to the frontend and install dependencies**

   ```bash
   cd client
   npm install
   ```
---

5. **Build the frontend**

   ```bash
   npm run build
   cd ..
   ```
---

6. **Set up environment variables**

   * Copy `.env.example` to `.env`
   * Fill in required values (e.g., MongoDB URI, port number)

---


## ▶️ Running the Application

### Option 1: Run the full application on port 8080

```bash
npm start
```

Visit: [http://localhost:8080](http://localhost:8080)

---

### Option 2: Run frontend and backend separately (recommended for development)

1. **Start the backend server**

   ```bash
   npm run server
   ```

2. **In a separate terminal, start the frontend**

   ```bash
   cd client
   npm start
   ```

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend: [http://localhost:5000](http://localhost:5000)

> **Note:** If using Option 2, ensure `"proxy": "http://localhost:5000"` is set in the frontend's `package.json`.

---

## 💡 Usage

* Register or log in as a user
* Browse products, add to wishlist or cart
* Check tournament standings and player ratings
* Seamlessly checkout with real-time order confirmation

---

## 📄 License

This project is licensed under the MIT License.
See the [LICENSE](LICENSE) file for details.

---

## 🙌 Credits

Developed by **Rohan Manandhar**
Student ID: 220372 | Coventry ID: 13703978
Softwarica College of IT and eCommerce, Coventry University

---

## 📬 Feedback & Contributions

Pull requests and suggestions are welcome!
For issues or ideas, open an [issue](https://github.com/Ziroworld/FootMart/issues) or email [footmart10@gmail.com](mailto:footmart10@gmail.com).

---

**Happy Football Shopping!** ⚽️🛍️

```

