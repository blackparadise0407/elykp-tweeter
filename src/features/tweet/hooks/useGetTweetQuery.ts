import { useLazyQuery, useQuery } from '@apollo/client'

import { GET_TWEET_QUERY } from 'graphqlClient/queries/tweetQuery'

export interface GetTweetInput {
    limit: number
    afterCursor: string | null
    beforeCursor?: string | null
    userId?: string
}

export interface GetTweetOutput {
    tweets: Tweet[]
    cursor: Cursor
}

export const useGetTweetQuery = (query: GetTweetInput) =>
    useLazyQuery<
        { getTweet: GetTweetOutput },
        {
            getTweetInput: GetTweetInput
        }
    >(GET_TWEET_QUERY, {
        variables: { getTweetInput: query },
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true,
    })
