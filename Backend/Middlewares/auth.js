import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  const {token }= req.headers; 
  if (!token) {
    return res.json({ success: false, message: 'Access denied. Login again.' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decodedToken.id;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export default authMiddleware;