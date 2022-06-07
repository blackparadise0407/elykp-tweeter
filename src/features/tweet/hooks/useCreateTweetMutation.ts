import { useMutation } from '@apollo/client'

import {
    CREATE_TWEET_MUTATION,
    TOP_TWEETED_TAG_COUNT_QUERY,
    TWEETS_QUERY,
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
            TWEETS_QUERY,
            'TweetsQuery',
            TOP_TWEETED_TAG_COUNT_QUERY,
            'TopTweetedTagCountQuery',
        ],
    })
