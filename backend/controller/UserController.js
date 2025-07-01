import userModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from 'bcrypt';
import validator from "validator"


const loginUser=async(req,res)=>{
   const {email,password} =req.body;
   try {
    const user=await userModel.findOne({email})

    if(!user){
       return res.json({success:false,message:"User Doesn't exist"})
    }
    const isMatch=await bcrypt.compare(password,user.password)

    if(!isMatch){
        return res.json({success:false,message:"Wrong password"})
    }

    if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET is not defined during login');
        return res.json({ success: false, message: "Server configuration error" });
    }

    const token = createToken(user._id);
    console.log('Generated token:', token);
    res.json({success:true,token})

   } catch (error) {
    console.error('Login error:', error);
    res.json({success:false,message:"Error"})
   }
}

const createToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
            expiresIn: '24h',
            algorithm: 'HS256'
        }
    );
}

const SignupUser=async(req,res)=>{
  const {name,email,password}=req.body;
  try {
    const exists=await userModel.findOne({email});
    //check if user already exist 
    if(exists){
        return res.json({success:false,message:"User already exist"})
    }
    //check email format or valid email
    if(!validator.isEmail(email)){
        return res.json({success:false,message:"Enter valid email"})
    }
    // check password length
    if(password.length<8){
         return res.json({success:false,message:"Enter strong password"})
    }

    //hashing user password
    const salt =await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const newUser = new userModel({
        name:name,
        email:email,
        password:hashedPassword
    })

    const user = await newUser.save();
    
    if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET is not defined during signup');
        return res.json({ success: false, message: "Server configuration error" });
    }

    const token = createToken(user._id);
    console.log('Generated token during signup:', token);
    res.json({success:true,token});

  } catch (error) {
    console.error('Signup error:', error);
    res.json({success:false,message:"Error"})
  }
}

export {loginUser,SignupUser};