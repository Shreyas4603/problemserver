import jwt from "jsonwebtoken";

const generateToken = (res,userId) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '365d'
    });
    
    res.cookie(`jwt`,token, 
    {
        httpOnly: false,
        //secure: process.env.NODE_ENV !== 'development',
        secure: false,
        sameSite: 'lax',
        maxAge: 12*30 * 24 * 60 * 60 * 1000,
    })
}



export {generateToken};