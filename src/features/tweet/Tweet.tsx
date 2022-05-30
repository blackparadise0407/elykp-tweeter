import dayjs from 'dayjs'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineSync } from 'react-icons/ai'
import { BsChatRight, BsHeart, BsBookmark } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import ReactTextareaAutosize from 'react-textarea-autosize'

import { Avatar, Button } from 'components'
import { HASHTAG_REGEXP } from 'helpers/string'

interface TweetProps {
    data: Tweet
}

const _renderText = (text: string, tags: Tag[]) => {
    if (!tags.length) {
        return text
    }
    const splitText = text.split(HASHTAG_REGEXP)
    const appendText: string[] = []
    splitText.forEach((text) => {
        const foundTag = tags.find((tag) => '#' + tag.name === text)
        if (foundTag) {
            appendText.push(
                `<a href="/hashtag/${foundTag.name}">#${foundTag.name}</a>`,
            )
        } else {
            appendText.push(text)
        }
    })
    return appendText.join(' ')
}

export default memo(function Tweet({ data }: TweetProps) {
    const { t } = useTranslation()
    if (!data) return null

    const { text, tags, user, updatedAt, photoId } = data

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
                <p
                    dangerouslySetInnerHTML={{
                        __html: _renderText(text, tags),
                    }}
                    className="text-neutral-600 dark:text-white text-sm md:text-base"
                ></p>
                {photoId && (
                    <div
                        className="rounded-lg mt-5 w-full aspect-video"
                        style={{
                            background: `url(http://localhost:5000/api/attachment/${photoId})`,
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                        }}
                    />
                )}
            </div>
            <ul className="flex items-center justify-end gap-4 text-gray-400 font-medium text-xs md:text-sm mt-3 mb-1">
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
                    <span className="text-sm hidden lg:block capitalize text-gray-800 dark:text-gray-300">
                        {t('comment')}
                    </span>
                </Button>
                <Button type="link" block className="flex items-center gap-3">
                    <AiOutlineSync className="text-gray-800 dark:text-gray-300" />
                    <span className="text-sm hidden lg:block capitalize text-gray-800 dark:text-gray-300">
                        {t('retweet')}
                    </span>
                </Button>
                <Button type="link" block className="flex items-center gap-3">
                    <BsHeart className="text-gray-800 dark:text-gray-300" />
                    <span className="text-sm hidden lg:block capitalize text-gray-800 dark:text-gray-300">
                        {t('like')}
                    </span>
                </Button>
                <Button type="link" block className="flex items-center gap-3">
                    <BsBookmark className="text-gray-800 dark:text-gray-300" />
                    <span className="text-sm hidden lg:block capitalize text-gray-800 dark:text-gray-300">
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
