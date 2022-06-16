import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'

import { Card, Spinner } from 'components'
import { useToast } from 'contexts/toast'
import { useCurrentUserQuery } from 'features/user/hooks/useCurrentUserQuery'
import { useFollowMutation } from 'features/user/hooks/useFollowMutation copy'
import { useTopFollowedUsersLazyQuery } from 'features/user/hooks/useTopFollowedUsersLazyQuery'
import { cache } from 'graphqlClient'
import { useInfiniteScroll } from 'hooks/useInfiniteScroll'

import { useTopTweetedTagCountQuery } from './hooks/useTopTweetedTagCountQuery'
import { useTweetsQuery } from './hooks/useTweetsQuery'
import Tweet from './Tweet'
import TweetInput from './TweetInput'
import UserCard from './UserCard'

const FETCH_LIMIT = 5

export default function HomePage() {
    const { t } = useTranslation()
    const { enqueue } = useToast()
    const [getTweetQueryLazy, { data, loading, fetchMore }] = useTweetsQuery()
    const { data: topTweetedTagCount } = useTopTweetedTagCountQuery()
    const { data: currentUser } = useCurrentUserQuery()
    const [topFollowedUsersLazy, { data: topFollowedUsers }] =
        useTopFollowedUsersLazyQuery()
    const [followMutation] = useFollowMutation()

    const tweetListRef = useRef<HTMLDivElement>(null)

    const canFetchMore = useMemo(
        () => !!data?.tweets.cursor.afterCursor,
        [data?.tweets.cursor.afterCursor],
    )

    useInfiniteScroll(tweetListRef, loading, canFetchMore, () => {
        fetchMore({
            variables: {
                tweetsInput: {
                    limit: FETCH_LIMIT,
                    afterCursor: data?.tweets.cursor.afterCursor ?? null,
                },
            },
        })
    })

    const handleFollowUser = useCallback(async (followingId: string) => {
        try {
            await followMutation({
                variables: {
                    followingId,
                },
            })
        } catch (e: any) {
            enqueue(e?.message, { variant: 'error' })
        }
    }, [])

    useEffect(() => {
        getTweetQueryLazy({
            variables: {
                tweetsInput: {
                    limit: FETCH_LIMIT,
                    beforeCursor: null,
                    afterCursor: null,
                },
            },
        })
        return () => {
            cache.evict({
                id: 'ROOT_QUERY',
                fieldName: 'tweets',
            })
        }
    }, [])

    useEffect(() => {
        if (currentUser?.currentUser) {
            topFollowedUsersLazy({
                variables: {
                    userId: currentUser.currentUser.id,
                },
            })
        }
    }, [currentUser?.currentUser])

    return (
        <div className="container px-2 md:px-10 lg:px-20 mx-auto py-6 flex gap-6 ">
            <div className="flex-1">
                <TweetInput />
                <div className="mt-6 space-y-6 pb-6" ref={tweetListRef}>
                    {data?.tweets.tweets.map((tweet) => (
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
            </div>
            <div className="sticky hidden md:block top-6 w-[206px] lg:w-[306px] h-fit space-y-6">
                {!!topTweetedTagCount?.topTweetedTagCount.length && (
                    <Card title={t('trend_for_you')}>
                        <div className="my-3 space-y-6">
                            {topTweetedTagCount?.topTweetedTagCount.map(
                                ({ id, name, count }) => (
                                    <div
                                        className="flex flex-col gap-2"
                                        key={id}
                                    >
                                        <Link
                                            to={`/hashtag/${name}`}
                                            className="font-semibold text-neutral-900 dark:text-white text-base hover:underline inline-block cursor-pointer hover:text-neutral-500 transition-colors"
                                        >
                                            #{name}
                                        </Link>
                                        <span className="font-medium text-neutral-400 text-xs">
                                            {count}{' '}
                                            {count === 1
                                                ? t('tweet')
                                                : t('tweets')}
                                        </span>
                                    </div>
                                ),
                            )}
                        </div>
                    </Card>
                )}
                {!!topFollowedUsers?.topFollowedUsers.length && (
                    <Card title={t('who_to_follow')}>
                        {topFollowedUsers?.topFollowedUsers.map((data) => (
                            <div
                                key={data.user.id}
                                className="border-b border-gray-300 dark:border-neutral-500 last:border-0"
                            >
                                <UserCard
                                    data={data}
                                    onFollow={handleFollowUser}
                                />
                            </div>
                        ))}
                    </Card>
                )}
            </div>
        </div>
    )
}
