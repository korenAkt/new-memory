import express from 'express';
import Joi from 'joi';
import UserModel from '../model/userModel.js';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const router = express.Router();


export const adminApproveUser = async (req, res) => {
    try {
        const { error } = validateRequest(req.body); 
        if(error)
        {
            return res.status(400).send({error: "[1] " + error.details[0].message});
        }
        const user = await UserModel.findOneAndUpdate(
            { username: req.body.username },
            { $set: {approvedByAdmin: true} }, 
            { new: true } // Return the updated user data
          );
        if (!user)
        {
            return res.status(404).send("User was not found.")
        }
        res.status(200).send("ok");
    }
    catch (error)
    {
        res.status(404).json({error: "[2] " + error.message});
    }
}

export const middleware_verifyAdmin = (req, res, next) => {
    console.log('In middleware_verifyAdmin. req.user is:', req.user);
    if (req.user.role != 'admin') 
    {
        return res.status(403).json({error: 'You must be admin'})
    }
    next();  // Move on to the next middleware (we have 2 middlewares)
}


function validateRequest(request) {
    const schema = Joi.object(
        {
            username: Joi.string().min(2).max(20).required()
        }
    );
    return schema.validate(request);
}
