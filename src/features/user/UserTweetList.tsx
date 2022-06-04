import { useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineCheckCircle } from 'react-icons/ai'

import { Spinner } from 'components'
import { useGetTweetQuery } from 'features/tweet/hooks/useGetTweetQuery'
import Tweet from 'features/tweet/Tweet'
import { cache } from 'graphqlClient'
import { useInfiniteScroll } from 'hooks/useInfiniteScroll'

import { useGetUserFromUrl } from './hooks/useGetUserFromUrl'

const FETCH_LIMIT = 5

export default function UserTweetList() {
    const { t } = useTranslation()
    const { data: userData } = useGetUserFromUrl()
    const tweetListRef = useRef<HTMLDivElement>(null)
    const [getTweetQueryLazy, { data, loading, fetchMore }] = useGetTweetQuery({
        limit: FETCH_LIMIT,
        beforeCursor: null,
        afterCursor: null,
        userId: userData?.getUser.id,
    })
    const canFetchMore = useMemo(
        () => !!data?.getTweet.cursor.afterCursor,
        [data?.getTweet.cursor.afterCursor],
    )

    useInfiniteScroll(tweetListRef, loading, canFetchMore, () => {
        fetchMore({
            variables: {
                getTweetInput: {
                    limit: FETCH_LIMIT,
                    afterCursor: data?.getTweet.cursor.afterCursor ?? null,
                },
            },
        })
    })

    useEffect(() => {
        getTweetQueryLazy()
        return () => {
            cache.evict({
                id: 'ROOT_QUERY',
                fieldName: 'getTweet',
            })
        }
    }, [])

    return (
        <div className="space-y-6 pb-12" ref={tweetListRef}>
            {data?.getTweet.tweets.map((tweet) => (
                <Tweet key={tweet.id} data={tweet} />
            ))}
            {loading && (
                <div className="flex items-center justify-center gap-2">
                    <Spinner />
                    <span className="font-medium text-sm text-gray-500 dark:text-white">
                        {t('fetching_new_tweets')}
                    </span>
                </div>
            )}
            {!loading && !canFetchMore && (
                <div className="flex items-center justify-center gap-1">
                    <AiOutlineCheckCircle className="text-xl text-green-500" />
                    <span className="text-center text-black dark:text-white">
                        {t('you_are_all_caught_up')}
                    </span>
                </div>
            )}
        </div>
    )
}
