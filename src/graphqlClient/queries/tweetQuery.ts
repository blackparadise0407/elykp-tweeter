import { gql } from '@apollo/client'

export const CREATE_TWEET_MUTATION = gql`
    mutation CreateTweetMutation($createTweetInput: CreateTweetInput!) {
        createTweet(createTweetInput: $createTweetInput) {
            id
            text
        }
    }
`

export const GET_TWEET_QUERY = gql`
    query GetTweetQuery($getTweetInput: GetTweetInput!) {
        getTweet(getTweetInput: $getTweetInput) {
            tweets {
                id
                text
                user {
                    id
                    username
                }
                photoId
                tags {
                    id
                    name
                }
                createdAt
                updatedAt
            }
            cursor {
                afterCursor
            }
        }
    }
`

export const GET_TOP_TWEETED_TAG_COUNT = gql`
    query GetTopTweetedTagCount {
        getTopTweetedTagCount {
            id
            name
            count
        }
    }
`
