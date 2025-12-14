import express, {Express} from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import AuthRoutes from './routes/auth.route';
import messageRoutes from './routes/message.route';
import { app, server } from './socket/socket';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", AuthRoutes);
app.use("/api/chats", messageRoutes);

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});