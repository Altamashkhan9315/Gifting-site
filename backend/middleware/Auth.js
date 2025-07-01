import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  try {
    // Check for token in both Authorization header and token header
    const authHeader = req.headers.authorization;
    const tokenHeader = req.headers.token;
    
    // console.log('Request headers:', req.headers);
    // console.log('Auth Header:', authHeader);
    // console.log('Token Header:', tokenHeader);

    let token;

    // Try to get token from Authorization header first
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } 
    // If not found, try to get from token header
    else if (tokenHeader) {
      token = tokenHeader;
    }
    // If no token found in either place
    else {
      console.log('No token found in headers');
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    // console.log('Using token:', token);

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      return res.status(500).json({ success: false, message: 'Server configuration error' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decoded);
      req.body.userId = decoded.id;
      next();
    } catch (jwtError) {
      console.error('JWT verification error:', {
        name: jwtError.name,
        message: jwtError.message,
        stack: jwtError.stack
      });
      
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).json({ success: false, message: 'Token has expired' });
      }
      
      if (jwtError.name === 'JsonWebTokenError') {
        return res.status(401).json({ success: false, message: 'Invalid token' });
      }

      return res.status(401).json({ success: false, message: 'Token verification failed' });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export default authMiddleware;
