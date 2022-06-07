import { useQuery } from '@apollo/client'

import { TOP_TWEETED_TAG_COUNT_QUERY } from 'graphqlClient/queries/tweetQuery'

export const useTopTweetedTagCountQuery = () =>
    useQuery<{
        topTweetedTagCount: { id: number; name: string; count: number }[]
    }>(TOP_TWEETED_TAG_COUNT_QUERY)
