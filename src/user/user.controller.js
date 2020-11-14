import {User} from "./user.model";
import {ValidationError, UserInputError} from "apollo-server-express"
import bcrypt from "bcryptjs";
import {generateToken} from "../utils/token"
const userController = {
  users : (root , args) => User.find(),
  findOrCreateUser : async (data) => {
    const {name, email, password} = data ; 
  
    const checkUserExisting = await User.findOne({email});
    if(checkUserExisting){
      throw new ValidationError("Email has been existing");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      ...data, 
      password : hashPassword
    })

    await newUser.save()
    return {
      user : newUser , 
      token : generateToken(newUser._id)
    }
  },
  loginUser : async (data) => {
    const {email, password} = data ; 
    const user = await User.findOne({email});
    if(!user){
      throw new UserInputError("email or password not correct");
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword){
      throw new UserInputError("email or password not correct");
    }
    return {
      user, 
      token : generateToken(user._id)
    }
  }
}

export {userController};