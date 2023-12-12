import express from 'express';
import mongoose from 'mongoose';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../model/userModel.js';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

// Retrieving the secret key from environment variable
// (which is stored in the /.env file)
const secretKey = process.env.JWT_SECRET;

const router = express.Router();

export const middleware_verifyToken = (req, res, next) => {

    const authorizationHeader = req.headers['authorization'];
    console.log("In middleware_verifyToken. Authorization header =", authorizationHeader);
    if (!authorizationHeader) 
    {
        console.log("Error: Token is not provided in authorization header");
        return res.status(403).json({error: 'Token is not provided in authorization header'})
    }
    jwt.verify(authorizationHeader.replace('Bearer ', ''), secretKey, (err, decoded) => {
        if (err)
        {
            return res.status(401).json({error: 'Failed to authenticate token. ' + err.message})
        }
        console.log("In middleware_verifyToken. Decoded from jwt token:", decoded);
        req.user = decoded;  //decodes contains: {username, role}
        next();  // Move on to the next middleware (we have 2 middleWares)
    })
}

export const getUsersTest = async (req, res) => {
    try {
        const usersResponse = "users test";
        res.status(200).json(usersResponse);
    }
    catch (error)
    {
        res.status(404).json({error: error.message});
    }
}

export const getUsers = async (req, res) => {
    console.log("In getUsers");
    
    try {
        // We filter out username which is empty or contains only spaces
        const usersResponse = 
            await UserModel.find({ username: { $regex: /\S/ } }).sort({ username: 1 });
        res.status(200).json(usersResponse);
    }
    catch (error)
    {
        res.status(404).json({error: error.message});
    }
}


export const getFavorites = async (req, res) => {
    try {
        const usersResponse = await UserModel.find();
        res.status(200).json(usersResponse);
    }
    catch (error)
    {
        res.status(404).json({error: error.message});
    }
}


export const signup = async (req, res) => {
    // Destructuring the request body
    let {username, password, role, image, approvedByAdmin} = req.body;

    console.log("User signup. username:", username)
    const { error } = validateSignup(req.body);
    if (error) 
    {
        console.log("User signup failed. username:", username, 
                    " Details:", error.details[0].message)
        return res.status(400).send("Error: " + error.details[0].message);
    }

    let user = await UserModel.findOne({username: username});
    if (user) 
    {
        console.log("User signup failed. username:", username, 
                    " Details: Username already exists")

        return res.status(400).send({Error: "Username already exists"})
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    approvedByAdmin = false;
    if (username == "admin")
    {
        // username admin should sign up before the system is released to all users
        // and here we give him approval right away
        approvedByAdmin = true;
    }

    const userModel = new UserModel(
        {username: username, 
         password: password, 
         role: role, 
         image: image, 
         approvedByAdmin: approvedByAdmin
        });
    try
    {
        await userModel.save();
        res.status(201).json({username: userModel.username, role: userModel.role});
    }
    catch(error)
    {
       console.log("User signup failed. username:", username, "Details:", error.message)
       res.status(409).json({error: error.message});
    }
}


export const login = async (req, res) => {
    // Destructuring the request body
    const { username, password } = req.body;

    console.log("User login. username:", username);

    const { error } = validateLogin(req.body);
    if (error) 
    {
        console.log("User login failed. username:", username, 
                    " Details:", error.details[0].message)
        res.status(400).send(error.details[0].message);
    }

    const user = await UserModel.findOne({ username: username });
    if (!user) {
        console.log("User login failed. username:", username, "Details: User not found");
        return res.status(404).send("User not found");
    }
    console.log("user who tries to login: " + user);

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        console.log("User login failed. username:", username, "Details: Invalid password");
        return res.status(400).send("Invalid password");
    }

    if (!user.approvedByAdmin)
    {
        return res.status(400).send("Admin didn't approve you.");
    }

    const token = jwt.sign({username: user.username, role: user.role}, 
                            secretKey, {expiresIn: '4h'});

    // Return success response with user information
    res.status(200).json({ username: user.username, role: user.role, token: token });
};


export const updateUser = async (req, res) => {
    try {
        console.log("In updateUser. received:", req.body);

        const { error } = validateUpdateUser(req.body);
        if (error) 
        {
            console.log("updateUser failed. Received:", req.body, 
                        " Details:", error.details[0].message)
            res.status(400).send(error.details[0].message);
        }
    
        const memory = await UserModel.findOneAndUpdate(
            {
                username: req.body.username
            },
            {
                role: req.body.role, 
                approvedByAdmin: req.body.approvedByAdmin
            }
            );
        res.status(200).json(memory);
    }
    catch (error)
    {
        res.status(404).json({error: error.message});
    }
}


function validateSignup(user) {
    const schema = Joi.object(
        {
            username: Joi.string().min(2).max(20).required(),
            password: Joi.string()
                .min(8)
                .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4,})(?=.*[)!@%$#^&*-_*(]).{8,}$/)
                .message('Password must contain at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 4 digits, and 1 special character'),
            role: Joi.string().min(2).valid('admin','user','guest').required(),
            image: Joi.string().min(2).max(50).optional()
        }
    );
    return schema.validate(user);
}

function validateLogin(user) {
    const schema = Joi.object(
        {
            username: Joi.string().min(2).max(20).required(),
            password: Joi.string().min(2).max(100).required(),
        }
    );
    return schema.validate(user);
}


function validateUpdateUser(user) {
    const schema = Joi.object(
        {
            username: Joi.string().min(2).max(20).required(),
            role: Joi.string().min(2).max(20).required(),
            approvedByAdmin: Joi.boolean().required()
        }
    );
    return schema.validate(user);
}
