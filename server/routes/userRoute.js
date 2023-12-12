import express from 'express';

import { getUsers, signup, login, getFavorites, getUsersTest, 
         middleware_verifyToken,
         updateUser} 
    from '../controller/userController.js';
import { middleware_verifyAdmin } from '../controller/adminController.js';


const router = express.Router();

console.log("In userRoute");

// router.get('/test1', (req,res) => {res.send('hello test')});
router.get('/', 
    middleware_verifyToken,
    middleware_verifyAdmin,
    getUsers);
router.put('/:id', 
            middleware_verifyToken,
            updateUser);
router.post('/signup', signup);
router.post('/login', login);


router.get('/favorites', 
            middleware_verifyToken,
            getFavorites);


export default router;

