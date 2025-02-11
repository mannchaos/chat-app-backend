import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: 'Unauthorised - token not provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SCRT);

    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorised - Invalid token' });
    }

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error('Error in protect Route', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
