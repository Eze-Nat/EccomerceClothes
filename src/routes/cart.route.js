import {Router} from 'express';
import { newCart, saveCart } from '../controllers/cart.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = Router();

router.post('/cart', verifyToken, saveCart)

export default router