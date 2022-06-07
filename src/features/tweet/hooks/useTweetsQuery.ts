import { useLazyQuery } from '@apollo/client'

import { TWEETS_QUERY } from 'graphqlClient/queries/tweetQuery'

export interface TweetsInput {
    limit: number
    afterCursor: string | null
    beforeCursor?: string | null
    userId?: string
}

export interface GetTweetOutput {
    tweets: Tweet[]
    cursor: Cursor
}

export const useTweetsQuery = () =>
    useLazyQuery<
        { tweets: GetTweetOutput },
        {
            tweetsInput: TweetsInput
        }
    >(TWEETS_QUERY, {
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true,
    })
