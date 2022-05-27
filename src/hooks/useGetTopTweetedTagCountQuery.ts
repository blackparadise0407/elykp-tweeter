import { useQuery } from '@apollo/client'

import { GET_TOP_TWEETED_TAG_COUNT } from 'graphqlClient/queries/tweetQuery'

export const useGetTopTweetedTagCountQuery = () =>
    useQuery<{
        getTopTweetedTagCount: { id: number; name: string; count: number }[]
    }>(GET_TOP_TWEETED_TAG_COUNT)
