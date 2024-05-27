import jwt from "jsonwebtoken";
import prismaClient from "../clients/db";
import { User } from "@prisma/client";

const JWT_SECRET = "S3CRet"

class JWTService {
    public static async generateTokenForUser(user: User) {
        const payload = {
            id: user?.id,
            email: user?.email
            
        };
        const token = jwt.sign(payload, JWT_SECRET);
        return token;
    }
}

export default JWTService;