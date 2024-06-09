export const types = `#graphql

    type User {
        id: ID!
        firstName: String
        lastName: String
        email: String
        profileImageURL: String 
        tweets: [Tweet]
    }

    type AuthResponse {
        token: String!
    }

    type Query {
        verifyGoogleToken(token: String!): AuthResponse
        getCurrentUser: User
    }
`
