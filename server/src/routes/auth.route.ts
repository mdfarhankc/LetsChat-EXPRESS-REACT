import express from "express";
import { getMe, LoginController, LogoutController, RegisterController } from "../controllers/auth.controller";
import protectRoute from "../middlewares/protectRoute";

const router = express.Router();

router.get('/me', protectRoute, getMe);
router.post('/login', LoginController);
router.post('/register', RegisterController);
router.post('/logout', LogoutController);


export default router;