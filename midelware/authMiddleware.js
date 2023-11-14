const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env; // Your secret key, preferably stored in environment variables

const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.header('admin-auth-token');

  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ message: 'Authorization denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Attach user information to the request
    req.user = decoded.user;

    // Move to the next middleware
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: 'Token is not valid.' });
  }
};

module.exports = authMiddleware;
