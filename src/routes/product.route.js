import {Router} from 'express';
import { deleteProduct, newProduct, updateProduct, getProducts, searchProduct} from '../controllers/products.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = Router();


router.post('/create', verifyToken, newProduct)
router.delete("/delete/:pid", verifyToken, deleteProduct)
router.put('/update/:pid', verifyToken, updateProduct)
router.get('/product/:pid', getProducts)
router.get('/product', searchProduct)


export default router