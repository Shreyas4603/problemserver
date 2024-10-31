import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies['jwt'];
    console.log("Token in protch : ",token)

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decooded ",decoded)
            req.user = await User.findOne({userId:decoded.userId}).select('-password');

            if (!req.user) {
                throw new Error('User not found');
            }

            // Check if user has the admin role
            if (req.user.role !== 'ADMIN') {
                res.status(403);
                throw new Error('Access denied, admin role required');
            }

            next();
        } catch (error) {
            console.log("Token error",error)
            res.status(401);
            res.send({error:"Not authorized, Invalid token"})
            // throw new Error('Not authorized, Invalid token');
        }
    } else {
        res.status(401);
        res.send({error:"Not authorized, no token available!"})
        // throw new Error('Not authorized, no token available!');
    }
});

export default protect;
