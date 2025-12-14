import express from "express";
import protectRoute from "../middlewares/protectRoute";
import { GetChats, GetMessages, SendMessage } from "../controllers/message.controller";

const router = express.Router();

router.get('/', protectRoute, GetChats);
router.get('/:id', protectRoute, GetMessages);
router.post('/send/:id', protectRoute, SendMessage);


export default router;