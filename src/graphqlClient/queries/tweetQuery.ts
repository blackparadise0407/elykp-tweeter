import { gql } from '@apollo/client'

export const CREATE_TWEET_MUTATION = gql`
    mutation CreateTweetMutation($createTweetInput: CreateTweetInput!) {
        createTweet(createTweetInput: $createTweetInput) {
            id
            text
        }
    }
`

export const TWEETS_QUERY = gql`
    query TweetsQuery($tweetsInput: TweetsInput!) {
        tweets(tweetsInput: $tweetsInput) {
            tweets {
                id
                text
                user {
                    id
                    username
                    avatarId
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

export const TOP_TWEETED_TAG_COUNT_QUERY = gql`
    query TopTweetedTagCountQuery {
        topTweetedTagCount {
            id
            name
            count
        }
    }
`
