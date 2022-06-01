import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'

import { Avatar } from 'components'
import { useCurrentUserQuery } from 'features/user/hooks/useCurrentUserQuery'

const items = [
    { to: '/', transKey: 'home' },
    { to: '/explore', transKey: 'explore' },
    { to: '/bookmarks', transKey: 'bookmarks' },
]

export default function NavBar() {
    const { t } = useTranslation()
    const { data } = useCurrentUserQuery()

    return (
        <nav className="bg-white dark:bg-neutral-800 text-black dark:text-white px-2 md:px-10 lg:px-20 flex justify-between items-center">
            <Link
                to="/"
                className="text-black dark:text-white font-semibold justify-self-start py-5 hover:text-white hover:dark:text-black"
            >
                ElykP Tweeter
            </Link>
            <div className="mx-auto self-stretch items-center hidden md:flex gap-10 lg:gap-20">
                {items.map(({ to, transKey }) => (
                    <NavLink
                        className={({ isActive }) =>
                            clsx(
                                'relative capitalize h-full w-20 font-medium text-sm flex justify-center items-center text-stone-500 dark:text-white',
                                isActive && 'text-blue-500 dark:text-blue-400',
                            )
                        }
                        key={to}
                        to={to}
                    >
                        {({ isActive }) => (
                            <>
                                {t(transKey)}
                                {isActive && (
                                    <div className="absolute bottom-0 w-full h-1 rounded-t bg-blue-500"></div>
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
            <div className="flex items-center gap-3 justify-self-end py-5">
                {data?.currentUser && (
                    <>
                        <Avatar
                            size="base"
                            userId={data?.currentUser?.avatarId}
                        />

                        <h6>{data.currentUser.username}</h6>
                    </>
                )}
            </div>
        </nav>
    )
}
