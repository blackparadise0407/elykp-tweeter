import dayjs from 'dayjs'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineSync } from 'react-icons/ai'
import { BsChatRight, BsHeart, BsBookmark } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import ReactTextareaAutosize from 'react-textarea-autosize'

import { Avatar, Button } from 'components'

interface TweetProps {
    data: Tweet
}

export default memo(function Tweet({ data }: TweetProps) {
    const { t } = useTranslation()
    if (!data) return null

    const { text, user, updatedAt } = data

    return (
        <div className="bg-white dark:bg-neutral-800 p-5 rounded-lg shadow">
            <div className="flex items-center gap-4">
                <Avatar />
                <div className="flex flex-col">
                    <span className="">
                        <Link
                            to={`/${user.username}`}
                            className="font-medium text-base text-black hover:text-black dark:text-white hover:dark:text-white hover:underline cursor-pointer"
                        >
                            {user.username}
                        </Link>
                    </span>
                    <span className="font-medium text-xs text-gray-400">
                        {dayjs(updatedAt).format('DD MMMM [at] HH:mm')}
                    </span>
                </div>
            </div>
            <div className="mt-5">
                <p className="text-neutral-600 dark:text-white text-sm md:text-base">
                    {text}
                </p>
                {/* <img
                    className="rounded-lg mt-5"
                    src="https://images.unsplash.com/photo-1653580137336-8bf40907aba4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    alt=""
                /> */}
            </div>
            <ul className="flex items-center justify-end gap-4 text-gray-400 font-medium text-xs mt-3 mb-1">
                <li>499 Comments</li>
                <li>59k Retweets</li>
                <li>234 Saved</li>
            </ul>
            <div className="flex py-1 border-t border-b dark:border-neutral-600">
                <Button
                    type="link"
                    block
                    className="flex items-center gap-3 font-medium"
                >
                    <BsChatRight className="text-gray-800 dark:text-gray-300" />
                    <span className="text-sm hidden sm:block capitalize text-gray-800 dark:text-gray-300">
                        {t('comment')}
                    </span>
                </Button>
                <Button type="link" block className="flex items-center gap-3">
                    <AiOutlineSync className="text-gray-800 dark:text-gray-300" />
                    <span className="text-sm hidden sm:block capitalize text-gray-800 dark:text-gray-300">
                        {t('retweet')}
                    </span>
                </Button>
                <Button type="link" block className="flex items-center gap-3">
                    <BsHeart className="text-gray-800 dark:text-gray-300" />
                    <span className="text-sm hidden sm:block capitalize text-gray-800 dark:text-gray-300">
                        {t('like')}
                    </span>
                </Button>
                <Button type="link" block className="flex items-center gap-3">
                    <BsBookmark className="text-gray-800 dark:text-gray-300" />
                    <span className="text-sm hidden sm:block capitalize text-gray-800 dark:text-gray-300">
                        {t('save')}
                    </span>
                </Button>
            </div>
            <div className="flex items-center gap-4 mt-2">
                <Avatar />
                <ReactTextareaAutosize
                    className="textarea bg-neutral-100 dark:bg-neutral-700 text-black dark:text-white py-2 md:py-2.5 px-3 rounded-lg border border-gray-200 dark:border-neutral-600"
                    maxRows={5}
                    minRows={1}
                    placeholder={t('tweet_your_reply')}
                />
            </div>
        </div>
    )
})
