import prismaClient from "../../clients/db";
import axios from 'axios'
import JWTService from "../../services/jwt";
import { GraphqlContext } from "../../interfaces";
import { User } from "@prisma/client";

interface GoogleTokenResult {
    iss?: string;
    nbf?: string;
    aud?: string;
    sub?: string;
    email: string;
    email_verified: string;
    azp?: string;
    picture?: string;
    given_name?: string;
    family_name?: string;
    iat?: string;
    jti?: string;
    alg?: string;
    kid?: string;
    typ?: string;
}

const queries = {
    verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
        const googleToken = token;
        const googleOauthURL = new URL("https://oauth2.googleapis.com/tokeninfo");
        googleOauthURL.searchParams.set("id_token", googleToken);

        const { data } = await axios.get<GoogleTokenResult>(
            googleOauthURL.toString(),
            {
                responseType: "json"
            }
        );

        let user = await prismaClient.user.findUnique({
            where: { email: data.email },
        });

        if (!user) {
            user = await prismaClient.user.create({
                data: {
                    email: data.email,
                    firstName: data.given_name ?? '',
                    lastName: data.family_name,
                    profileImageURL: data.picture
                },
            });
        }

        if (!user) throw new Error("User with email not found");

        const userToken = await JWTService.generateTokenForUser(user);

        return { token: userToken };
    },
    getCurrentUser: async (parent: any, args: any, ctx: GraphqlContext) => {
        const id = ctx.user?.id;
        if (!id) return null;

        const user = await prismaClient.user.findUnique({ where: { id } });
        return user;
    }
}

const extraResolvers = {
    User: {
        tweets: (parent: User) => prismaClient.tweet.findMany({ where: { id: parent.id } })
    }
}

export const resolvers = { queries, extraResolvers }
