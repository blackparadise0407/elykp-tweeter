import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { useCurrentUserQuery } from 'hooks/useCurrentUserQuery'

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
            <p className="font-semibold justify-self-start py-5">
                ElykP Tweeter
            </p>
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
                <img
                    className="w-8 h-8 rounded-lg"
                    src="https://i.pravatar.cc/32"
                    alt=""
                />
                <h6>{data?.currentUser.username}</h6>
            </div>
        </nav>
    )
}
