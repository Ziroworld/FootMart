require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) {
  throw new Error('SECRET_KEY is not defined. Check your .env file.');
}

function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role           // <-- NEW
  };
  // 5 days token life
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '5d' });
}


function authenticateToken(req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'Access Denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // { id, email, role, iat, exp }
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: 'Invalid or expired token.' });
  }
}
function requireAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") return next();
  return res.status(403).json({ message: "Admin access required." });
}


module.exports = {
  generateToken,
  authenticateToken,
  requireAdmin,
};
