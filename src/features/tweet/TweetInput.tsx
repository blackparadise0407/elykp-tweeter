import { KeyboardEventHandler, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlinePicture } from 'react-icons/ai'
import { MdGroup, MdPublic } from 'react-icons/md'
import ReactTextareaAutosize from 'react-textarea-autosize'

import { Button, Card } from 'components'
import { useCreateTweetMutation } from 'hooks/useCreateTweetMutation'
import { useCurrentUserQuery } from 'hooks/useCurrentUserQuery'

export default function TweetInput() {
    const { t } = useTranslation()
    const [createTweet, { loading }] = useCreateTweetMutation()
    const { data: userData } = useCurrentUserQuery()
    const [val, setVal] = useState('')

    const handleCreateTweet = async () => {
        if (userData?.currentUser) {
            try {
                await createTweet({
                    variables: {
                        createTweetInput: {
                            text: val,
                            userId: userData.currentUser.id,
                        },
                    },
                })
                setVal('')
            } catch (e) {}
        }
    }

    const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = async (
        e,
    ) => {
        if (e.key === 'Enter') {
            // Control enter
            if (e.ctrlKey) {
                setVal((prev) => (prev += '\r\n'))
                return
            }
            // Enter
            e.preventDefault()
            await handleCreateTweet()
        }
    }

    return (
        <Card title={t('tweet_something')}>
            <div className="flex gap-3">
                <img
                    className="w-10 h-10 rounded-lg"
                    src="https://i.pravatar.cc/40"
                    alt=""
                />
                <div className="flex-grow">
                    <ReactTextareaAutosize
                        className="textarea bg-white dark:bg-neutral-800 text-dark dark:text-white"
                        maxRows={5}
                        minRows={2}
                        placeholder={t('what_happening')}
                        value={val}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setVal(e.target.value)}
                    />
                    <div className="flex items-center gap-3">
                        <AiOutlinePicture className="cursor-pointer text-lg text-blue-500" />
                        <div className="relative max-w-[140px] sm:max-w-[200px] md:max-w-[234px] w-full">
                            <div className="flex items-center gap-1 cursor-pointer text-blue-500 peer">
                                <MdPublic className="text-lg" />
                                <span className="font-medium text-xs">
                                    {t('everyone_can_reply')}
                                </span>
                            </div>
                            <div
                                className="absolute hidden top-[calc(100%+15px)] left-0 px-3 py-2 bg-white dark:bg-neutral-800 shadow border border-gray-200 dark:border-neutral-700  rounded-lg 
                                before:content-[''] before:absolute before:w-full before:h-[20px] before:opacity-0 before:bottom-full before:left-0
                                peer-hover:block hover:block
                            "
                            >
                                <h6 className="text-gray-700 dark:text-white">
                                    {t('who_can_reply')}
                                </h6>
                                <span className="text-xs text-gray-500 dark:text-gray-300">
                                    {t('choose_who_can_reply_to_this_tweet')}
                                </span>
                                <div className="flex flex-col text-gray-600 dark:text-gray-400 mt-3">
                                    <span className="flex items-center gap-2 p-3 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors rounded-lg cursor-pointer">
                                        <MdPublic className="text-lg" />
                                        <span className="text-xs">
                                            {t('everyone')}
                                        </span>
                                    </span>
                                    <span className="flex items-center gap-2 p-3 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors rounded-lg cursor-pointer">
                                        <MdGroup className="text-lg" />
                                        <span className="text-xs">
                                            {t('people_you_follow')}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-grow"></div>
                        <Button
                            className="text-xs capitalize"
                            loading={loading}
                            onClick={handleCreateTweet}
                        >
                            {t('tweet')}
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    )
}
