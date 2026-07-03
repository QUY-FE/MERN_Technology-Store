import jwt from 'jsonwebtoken';

export const verifyToken = (req,res,next) => {
    const token = req.header.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({message:"Chưa đăng nhập"});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message:"Token không hợp hệ "});
        
    }
}