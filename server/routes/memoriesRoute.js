import express from 'express';

import { addMemory, deleteMemory, getAllMemories, getFavoritedMemories, getUserMemories, updateMemory} 
    from '../controller/memoryController.js';
import { middleware_verifyToken } 
    from '../controller/userController.js';
import { middleware_verifyAdmin } from '../controller/adminController.js';

console.log("In memoriesRoute");

const router = express.Router();

router.post('/', 
    middleware_verifyToken, // verify jwt token
    addMemory);

router.get('/', 
    middleware_verifyToken, // verify jwt token
    getUserMemories);

router.get('/favorites', 
    middleware_verifyToken, // verify jwt token
    getFavoritedMemories);


router.get('/all', 
    middleware_verifyToken, // verify jwt token
    middleware_verifyAdmin, // verify that this is an admin
    getAllMemories);

router.put('/', 
    middleware_verifyToken, // verify jwt token
    updateMemory);


router.delete('/', 
       middleware_verifyToken, // verify jwt token
       deleteMemory);



export default router;

