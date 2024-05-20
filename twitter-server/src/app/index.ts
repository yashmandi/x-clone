import express from 'express'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';

export async function initServer() {
    const app = express();

    app.use(bodyParser.json());

    const graphqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                say: String   
            }
        `,
        resolvers: {
            Query: {
                say: () => 'Helloasdads'
            },
        }
    });

    await graphqlServer.start();

    app.use("/graphql", expressMiddleware(graphqlServer));

    return app;

}