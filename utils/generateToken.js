import jwt from "jsonwebtoken";

const generateToken = (res,userId) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '365d'
    });
    
    res.cookie(`jwt`,token, 
    {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
    })
}



export {generateToken};