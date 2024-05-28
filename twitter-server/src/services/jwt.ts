import jwt from "jsonwebtoken";
import prismaClient from "../clients/db";
import { User } from "@prisma/client";
import { JWTUser } from "../interfaces";

const JWT_SECRET = "S3CRet"

class JWTService {
    public static async generateTokenForUser(user: User) {
        const payload: JWTUser = {
            id: user?.id,
            email: user?.email

        };
        const token = jwt.sign(payload, JWT_SECRET);
        return token;
    }

    public static decodeToken(token: string) {
        try {
            return jwt.verify(token, JWT_SECRET) as JWTUser

        } catch (error) {
            return null
        }
    }

}

export default JWTService;