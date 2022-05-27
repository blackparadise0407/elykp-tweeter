import { useQuery } from '@apollo/client'

import { GET_TWEET_QUERY } from 'graphqlClient/queries/tweetQuery'

export interface GetTweetInput {
    limit: number
    afterCursor: string | null
    beforeCursor?: string | null
}

export interface GetTweetOutput {
    tweets: Tweet[]
    cursor: Cursor
}

export const useGetTweetQuery = (query: GetTweetInput) =>
    useQuery<
        { getTweet: GetTweetOutput },
        {
            getTweetInput: GetTweetInput
        }
    >(GET_TWEET_QUERY, {
        variables: { getTweetInput: query },
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true,
    })

// export const useRe = (query: GetTweetInput) =>
//     useApolloClient().watchQuery({
//         query: GET_TWEET_QUERY,
//         variables: { getTweetInput: query },
//     })
