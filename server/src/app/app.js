const express = require('express');
const app = express();
const authRouter = require('../routes/user-routes.js');
const productRouter = require('../routes/product-route');
const cartRouter = require('../routes/cart-route');
const wishlistRouter = require('../routes/wishlist-route');
const orderRouter = require('../routes/order-route');
const addressRouter = require('../routes/address-route');


// Body parser
app.use(express.json());
// Health check
app.get('/', (req, res) => res.send('API is running'));


// routes
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/orders', orderRouter);
app.use('/api/address', addressRouter);


// 404 for any other route
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

module.exports = app;
