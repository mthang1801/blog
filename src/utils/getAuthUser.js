import jwt from "jsonwebtoken"
import {AuthenticationError} from "apollo-server-express"
const getAuthUser = (req, required=true) => {
  const authorization = req.headers.authorization ; 
  if(authorization){
    const token = authorization.replace("Bearer", "").trim();
    const {userId} = jwt.verify(token, process.env.JWT_SECRET);
    return userId;
  }
  if(required){
    throw new AuthenticationError("Unauthorized");
  }
}

export default getAuthUser;