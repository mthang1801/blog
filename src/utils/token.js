import jwt from "jsonwebtoken"

const generateToken = userId => jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn : "1h"});

export {generateToken}