import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
    try {
       const {username, email, password} = req.body;
       
       if(!username || !email || !password){
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields"
        });
       }
         const existingUser = await User.findOne({$or: [{email}, {username}]});
         if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User with this email or username already exists"
            });
         }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                username,
                email,
                password: hashedPassword
            });
            return res.status(201).json({
                success: true,
                message: "User registered successfully",
                newuser: user
            });

    } catch (error) {
        console.error("Error in register controller:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

export const login = async(req,res)=>{
    try {
      const{email,password}= req.body;
      if(!email||!password){
        return res.status(400).json({
            success:false,
            message:"Please provide all required fields"
        })
      }
      const user = await User.findOne({email})
      if(!user){
        return res.status(400).json({
            success:false,
            message:"Invalid credentials"
        })
      } 
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Invalid credentials"
            })
        }
        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{
            expiresIn:"7d"
        });
        return res.status(200).json({
            success:true,
            message:"User logged in successfully",
            token
        })
        
    } catch (error) {
        console.error("Error in login controller:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}
 
