import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { generateToken } from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    console.log("user : ",user)

    if (user && (await user.matchPasswords(password))) {
        console.log("in hereeeeeeee")
        // Generate token
        await generateToken(res,user.userId);
        res.json({
            _id: user._id,
            email: user.email,
            role: user.role,
            // token
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});


// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const register = asyncHandler(async (req, res) => {
    const {  email, password } = req.body;
    console.log("req body ",email,password)

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }



    // Create new user with ADMIN role
    const user = await User.create({
        email,
        password: password,
        role: 'ADMIN', // Set role to ADMIN
    });


    if (user) {
    
        res.status(201).json({
            userId:user.userId,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

export  {login,register};
