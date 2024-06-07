import jwt from "jsonwebtoken";

function generateToke(data){
    // return jwt.sign(data, process.env.JWT_SECRET_TOKEN_KEY, { expiresIn: '1d' });
    return jwt.sign(data, process.env.JWT_SECRET_TOKEN_KEY);
}

export default generateToke;