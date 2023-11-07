import { Router } from "express";
import { login, register, sigonOut } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
//router.post('/google', google);
router.post('/signout', sigonOut)

export default router