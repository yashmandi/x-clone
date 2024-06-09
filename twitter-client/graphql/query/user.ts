import { graphql } from "@/gql";

export const verifyUserGoogleTokenQuery = `
    query VerifyUserGoogleToken($token: String!) {
        verifyGoogleToken(token: $token) {
            token
        }
    }
`;

export const getCurrentUserQuery = `
    query getCurrentUser {
        getCurrentUser {
            id
            profileImageURL
            email
            firstName
            lastName
        }
    }
`;
