import { useTranslation } from 'react-i18next'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { Link } from 'react-router-dom'

import { Avatar, Button } from 'components'

interface UserCardProps {
    data: TopFollowedUser
}

export default function UserCard({ data }: UserCardProps) {
    const { t } = useTranslation()
    const { user, count, profile } = data
    return (
        <div className="py-5">
            <div className="flex items-center flex-wrap gap-4">
                <Avatar avatarId={user.avatarId} size="lg" />
                <div className="flex flex-col">
                    <span>
                        <Link
                            to={`/${user.username}`}
                            className="font-medium text-base text-black hover:text-black dark:text-white hover:dark:text-white hover:underline cursor-pointer"
                        >
                            {user.username}
                        </Link>
                    </span>
                    <p className="font-medium text-xs text-gray-800 dark:text-gray-300">
                        {count} {t('followers')}
                    </p>
                </div>
                <div className="flex-grow"></div>
                <Button small flat icon={<AiOutlineUserAdd />}>
                    {t('follow')}
                </Button>
            </div>
            <p className="my-4 text-sm text-gray-800 dark:text-gray-300 line-clamp-2">
                {profile.description}
            </p>
            {profile.coverPhotoId && (
                <div
                    className="w-full h-[80px] rounded-lg"
                    style={{
                        backgroundImage: `url(http://localhost:5000/api/attachment/${profile.coverPhotoId})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                    }}
                ></div>
            )}
        </div>
    )
}
