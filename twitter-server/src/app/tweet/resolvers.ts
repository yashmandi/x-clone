import prismaClient from "../../clients/db";
import { GraphqlContext } from "../../interfaces";

interface CreateTweetPayload {
    content: string
    imageURL?: string
}

const mutations = {
    createTweet: async (
        parent: any,
        { payload }: { payload: CreateTweetPayload },
        ctx: GraphqlContext
    ) => {
        if (!ctx.user) throw new Error("You are not authorized to perform this action");
        const tweet = await prismaClient.tweet.create({
            data: {
                content: payload.content,
                imageURL: payload.imageURL,
                author: { connect: { id: ctx.user.id } }
            }
        });
        return tweet;
    }
}

const extraResolvers = {
    Tweet: {
        author: (parent: Tweet) => prismaClient.user.findUnique({ where: { id: parent.authorId } })
    }
}

export const resolvers = { mutations, extraResolvers }