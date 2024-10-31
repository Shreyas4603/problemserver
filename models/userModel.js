import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import validator from "validator";

// Define the User Schema
const userSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            default: uuidv4,
            unique: true,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (value) => validator.isEmail(value),
                message: "Invalid email format"
            }
        },
        password: {
            type: String,
            required: true,
            minlength: [6, "Password must be at least 6 characters long"]
        },
        role: {
            type: String,
            default: 'ADMIN',
            enum: ['ADMIN']
        }
    },
    {
        timestamps: true
    }
);

// Pre-save hook to hash password before saving
userSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified or is new
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to check if entered password matches the hashed password
userSchema.methods.matchPasswords = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the User model
const User = mongoose.model('Admins', userSchema);
export default User;
