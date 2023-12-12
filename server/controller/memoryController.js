import express from 'express';
import Joi from 'joi';
import MemoryModel from '../model/memoryModel.js';

export const deleteMemory = async (req, res) => {
    try {
      console.log("In deleteMemory. Received ID:", req.query.id);
  
      // Delete the memory by its ID using the Mongoose model directly
      const deletedMemory = await MemoryModel.deleteOne({ _id: req.query.id });
  
      if (deletedMemory.deletedCount === 0) {
        return res.status(404).send("Memory not found");
      }
  
      console.log("Memory deleted:", deletedMemory);
      return res.status(200).send("Memory deleted successfully");
    } catch (error) {
      console.error("Error deleting memory:", error);
      return res.status(500).json({ error: error.message });
    }
  };

export const addMemory = async (req, res) => {
    const { error } = validateAddMemory(req.body);
    if (error) 
    {
        console.log("addMemory failed. Received:", req.body, 
                    " Details:", error.details[0].message)
        res.status(400).send(error.details[0].message);
    }

    // Destructuring the request body
    let {title, description} = req.body;

    const memoryModel = new MemoryModel(
        { username: req.user.username,
          title: title, 
          description: description
        });
    try
    {
        await memoryModel.save();
        res.status(201).json("ok");
    }
    catch(error)
    {
       console.log("Failed to add memory.", error.message)
       res.status(409).json({error: error.message});
    }
}

export const updateMemory = async (req, res) => {
    const { error } = validateUpdateMemory(req.body);
    if (error) 
    {
        console.log("updateMemory failed. Received:", req.body, 
                    " Details:", error.details[0].message)
        res.status(400).send(error.details[0].message);
    }

    // Destructuring the request body
    let {title, description, favorite} = req.body;

    const memory = await MemoryModel.findOneAndUpdate(
        { _id: req.query.id },
        { $set: {title: title, description: description, favorite: favorite} }, // Update the memory
        { new: true } // Return the updated user data
      );
    if (!memory)
    {
        console.log("Cant update memory because it doens't exist. id=", req.query.id);
        return res.status(404).send("Memory was not found.")
    }
    res.status(200).send("ok");

}


export const getAllMemories = async (req, res) => {

    try {
        const response = await MemoryModel.find().sort({ username: 1, title: 1 });
        
        res.status(200).json(response);
    }
    catch (error)
    {
        res.status(404).json({error: error.message});
    }
}

export const getUserMemories = async (req, res) => {
    console.log("In getUserMemories")
    try {
        const response = await MemoryModel.find({username: req.user.username});
        console.log("getUserMemories response:", response);
        res.status(200).json(response);
    }
    catch (error)
    {
        res.status(404).json({error: error.message});
    }
}


export const getFavoritedMemories = async (req, res) => {
    console.log("In getUserMemories")
    try {
        const response = await MemoryModel.find(
            {username: req.user.username, favorite: true});
        console.log("getFavoritedMemories response:", response);
        res.status(200).json(response);
    }
    catch (error)
    {
        res.status(404).json({error: error.message});
    }
}

function validateAddMemory(request) {
    const schema = Joi.object(
        {
            title: Joi.string().min(2).max(50).required(),
            description: Joi.string().min(5).max(500).required(),
            favorite: Joi.boolean()
        }
    );
    return schema.validate(request);
}

function validateUpdateMemory(request) {
    const schema = Joi.object(
        {
            title: Joi.string().min(2).max(50).required(),
            description: Joi.string().min(5).max(500).required(),
            favorite: Joi.boolean()
        }
    );
    return schema.validate(request);
}


