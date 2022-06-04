import { useMutation } from '@apollo/client'

import {
    CREATE_TWEET_MUTATION,
    GET_TOP_TWEETED_TAG_COUNT,
    GET_TWEET_QUERY,
} from 'graphqlClient/queries/tweetQuery'

export const useCreateTweetMutation = () =>
    useMutation<
        { createTweet: any },
        {
            createTweetInput: {
                userId: string
                text: string
                photoId?: string
                tags: string[]
                private?: boolean
            }
        }
    >(CREATE_TWEET_MUTATION, {
        refetchQueries: [
            GET_TWEET_QUERY,
            'GetTweetQuery',
            GET_TOP_TWEETED_TAG_COUNT,
            'GetTopTweetedTagCount',
        ],
    })
