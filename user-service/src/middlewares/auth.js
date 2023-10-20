import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decodedData?.id;
    
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;
