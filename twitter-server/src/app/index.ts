import express from 'express'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import { User } from './user/index.';
import { Tweet } from './tweet';
import cors from 'cors';
import { GraphqlContext } from '../interfaces';
import JWTService from '../services/jwt';

export async function initServer() {
    const app = express();

    app.use(bodyParser.json());
    app.use(cors());

    const graphqlServer = new ApolloServer<GraphqlContext>({
        typeDefs: `
            ${User.types}
            ${Tweet.types}

            type Query {
                ${User.queries}
            }

            type Mutation {
                ${Tweet.mutations}
            }

        `,
        resolvers: {
            Query: {
                ...User.resolvers.queries
            },
            Mutation: {
                ...Tweet.resolvers.mutations
            },
            ...Tweet.resolvers.extraResolvers
        }
    });

    await graphqlServer.start();

    app.use("/graphql", expressMiddleware(graphqlServer, {
        context: async ({ req, res }) => {
            return {
                user: req.headers.authorization
                    ? JWTService.decodeToken(req.headers.authorization.split("Bearer ")[1])
                    : undefined
            }
        }
    }));

    return app;

}