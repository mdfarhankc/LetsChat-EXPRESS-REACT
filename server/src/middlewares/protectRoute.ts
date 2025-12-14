import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../db/prisma";

interface DecodedToken extends JwtPayload {
    userId: string;
}

declare global {
    namespace Express {
        export interface Request {
            user: {
                id: string;
            }
        }
    }
}

const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;
        if (!token){
            return res.status(401).json({success: false, error: "Unauthorised - No token Provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
        if (!decoded){
            return res.status(401).json({success: false, error: "Unauthorised - Invalid token"});
        }

        const user = await prisma.user.findUnique({where: {id: decoded.userId}, select: {
            id: true, username: true, fullName: true, profilePic: true, gender: true
        }});

        if (!user){
            return res.status(404).json({success: false, error: "User Not Found!"});
        }

        req.user = user;
        next();

    } catch (error: any) {
        console.error("Error in protectRoute middleware", error.message);
        return res.status(500).json({ success: false, error: "Internal Server Error!" });
    }
}

export default protectRoute;