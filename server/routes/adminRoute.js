import express from 'express';

import { middleware_verifyToken} from '../controller/userController.js';
import { adminApproveUser, middleware_verifyAdmin } from '../controller/adminController.js';


const router = express.Router();

router.get(
    '/adminApproveUser',
    middleware_verifyToken, // verify jwt token for normal user (role=user)
    middleware_verifyAdmin, // then verify this is an admin (role=admin)
    adminApproveUser
  );


export default router;

