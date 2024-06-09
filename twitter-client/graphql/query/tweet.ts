import { graphql } from "@/gql";

export const getAllTweetsQuery = graphql(`
    query GetAllTweets {
        getAllTweets {
            id
            content
            author {
                firstName
                lastName
                profileImageURL
            }
        }
    }
`)