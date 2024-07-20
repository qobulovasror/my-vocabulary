import jwt from "jsonwebtoken";

function generateToken(data){
    // return jwt.sign(data, process.env.JWT_SECRET_TOKEN_KEY, { expiresIn: '1d' });
    return jwt.sign(data, process.env.JWT_SECRET_TOKEN_KEY);
}

function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

export {
    generateToken,
    parseJwt
};