import clsx from 'clsx'
import { t as translate } from 'i18next'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { Link, NavLink } from 'react-router-dom'

import { Avatar, Dropdown, DropdownItem } from 'components'
import { useCurrentUserQuery } from 'features/user/hooks/useCurrentUserQuery'

const items = [
    { to: '/', transKey: 'home' },
    { to: '/explore', transKey: 'explore' },
    { to: '/bookmarks', transKey: 'bookmarks' },
]

export default function NavBar() {
    const { t } = useTranslation()
    const { data } = useCurrentUserQuery()

    const dropdownItems: DropdownItem[] = useMemo(
        () => [
            {
                key: 1,
                label: t('my_profile'),
            },
            {
                key: 2,
                label: t('group_chat'),
            },
            {
                key: 3,
                label: t('settings'),
            },
            {
                key: 4,
                label: t('logout'),
            },
        ],
        [],
    )

    return (
        <nav className="bg-white dark:bg-neutral-800 text-black dark:text-white px-2 md:px-10 lg:px-20 flex justify-between items-center">
            <Link
                to="/"
                className="text-black dark:text-white font-semibold justify-self-start py-5 hover:text-black hover:dark:text-white"
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
            {data?.currentUser && (
                <div className="flex items-center gap-3 justify-self-end py-5">
                    <Avatar
                        size="base"
                        avatarId={data?.currentUser?.avatarId}
                    />

                    <Dropdown items={dropdownItems}>
                        {({ isOpen }) => (
                            <div className="flex items-center gap-1">
                                <h6>{data.currentUser.username}</h6>
                                {isOpen ? (
                                    <AiFillCaretUp />
                                ) : (
                                    <AiFillCaretDown />
                                )}
                            </div>
                        )}
                    </Dropdown>
                </div>
            )}
        </nav>
    )
}
