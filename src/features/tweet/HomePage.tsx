import { throttle } from 'lodash'
import { useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { Card, Spinner } from 'components'
import { useEventListener } from 'hooks/useEventListener'
import { useGetTopTweetedTagCountQuery } from 'hooks/useGetTopTweetedTagCountQuery'
import { useGetTweetQuery } from 'hooks/useGetTweetQuery'

import Tweet from './Tweet'
import TweetInput from './TweetInput'

const FETCH_LIMIT = 10

export default function HomePage() {
    const { t } = useTranslation()
    const { data, loading, client, fetchMore } = useGetTweetQuery({
        limit: FETCH_LIMIT,
        beforeCursor: null,
        afterCursor: null,
    })
    const { data: topTweetedTagCount } = useGetTopTweetedTagCountQuery()
    const tweetListRef = useRef<HTMLDivElement>(null)

    const canFetchMore = useMemo(
        () => !!data?.getTweet.cursor.afterCursor,
        [data?.getTweet.cursor.afterCursor],
    )

    useEventListener(
        'scroll',
        throttle(() => {
            if (tweetListRef.current) {
                const { offsetTop, clientHeight } = tweetListRef.current
                const { scrollY, innerHeight } = window
                if (
                    offsetTop + clientHeight - (innerHeight + scrollY) <= 0 &&
                    canFetchMore
                ) {
                    fetchMore({
                        variables: {
                            getTweetInput: {
                                limit: FETCH_LIMIT,
                                afterCursor:
                                    data?.getTweet.cursor.afterCursor ?? null,
                            },
                        },
                    })
                }
            }
        }, 1000),
    )

    useEffect(() => {
        return () => {
            client.clearStore()
        }
    }, [])

    return (
        <div className="container px-2 md:px-10 lg:px-20 mx-auto py-6 flex gap-6 ">
            <div className="flex-grow">
                <TweetInput />
                <div className="mt-6 space-y-6" ref={tweetListRef}>
                    {data?.getTweet.tweets.map((tweet) => (
                        <div key={tweet.id}>
                            <Tweet data={tweet} />
                        </div>
                    ))}
                    {loading && (
                        <div className="flex items-center justify-center gap-2">
                            <Spinner />
                            <span className="font-medium text-sm text-gray-500">
                                {t('fetching_new_tweets')}
                            </span>
                        </div>
                    )}
                </div>
            </div>
            <div className="sticky hidden md:block top-6 max-w-[306px] w-full h-fit space-y-6">
                <Card title={t('trend_for_you')}>
                    <div className="my-3 space-y-6">
                        {topTweetedTagCount?.getTopTweetedTagCount.map(
                            ({ id, name, count }) => (
                                <div className="flex flex-col gap-2" key={id}>
                                    <span className="font-semibold text-neutral-900 dark:text-white text-base hover:underline inline-block cursor-pointer hover:text-neutral-500 transition-colors">
                                        #{name}
                                    </span>
                                    <span className="font-medium text-neutral-400 text-xs">
                                        {count} {t('tweets')}
                                    </span>
                                </div>
                            ),
                        )}
                    </div>
                </Card>
                <Card title={t('who_to_follow')}></Card>
            </div>
        </div>
    )
}