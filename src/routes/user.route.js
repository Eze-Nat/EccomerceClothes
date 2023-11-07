import { Router } from "express";
import { test, updateUser, deleteUser, getUserCart, getUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";




const router = Router();

router.get('/test', test)
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser)
// router.get('/cart/:id', verifyToken, getUserCart)
router.get('/:id', verifyToken, getUser)

export default router