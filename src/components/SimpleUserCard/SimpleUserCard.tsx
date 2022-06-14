import { useTranslation } from 'react-i18next'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { Link } from 'react-router-dom'

import { Avatar } from 'components/Avatar'
import { Button } from 'components/Button'

interface SimpleUserCardProps {
    data: User
}

export default function SimpleUserCard({ data }: SimpleUserCardProps) {
    const { t } = useTranslation()
    const {
        id,
        username,
        avatarId,
        followerCount,
        profile: { description },
    } = data
    return (
        <div className="py-3">
            <div className="flex items-center flex-wrap gap-4">
                <Avatar avatarId={avatarId} />
                <div className="flex flex-col justify-between">
                    <span>
                        <Link
                            to={`/${username}`}
                            className="font-semibold text-base text-black hover:text-black dark:text-white hover:dark:text-white hover:underline cursor-pointer"
                        >
                            {username}
                        </Link>
                    </span>
                    <span className="text-xs text-gray-800 dark:text-gray-300 font-medium">
                        {followerCount}{' '}
                        {followerCount <= 1 ? t('follower') : t('followers')}
                    </span>
                </div>
                <div className="flex-grow"></div>
                <Button flat small icon={<AiOutlineUserAdd />}>
                    {t('follow')}
                </Button>
            </div>
            {description && (
                <p className="mt-4 text-sm font-medium text-gray-800 dark:text-gray-300">
                    {description}
                </p>
            )}
        </div>
    )
}
