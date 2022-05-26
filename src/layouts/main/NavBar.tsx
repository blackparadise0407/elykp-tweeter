import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

const items = [
    { to: '/', transKey: 'home' },
    { to: '/explore', transKey: 'explore' },
    { to: '/bookmarks', transKey: 'bookmarks' },
]

export default function NavBar() {
    const { t } = useTranslation()
    return (
        <nav className="bg-white dark:bg-zinc-800 text-black dark:text-white px-20 flex items-center">
            <p className="font-semibold justify-self-start py-5">
                ElykP Tweeter
            </p>
            <div className="flex mx-auto self-stretch items-center gap-20">
                {items.map(({ to, transKey }) => (
                    <NavLink
                        className={({ isActive }) =>
                            clsx(
                                'relative capitalize h-full w-20 flex justify-center items-center text-stone-500 dark:text-white',
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
            <div className="justify-self-end py-5">User</div>
        </nav>
    )
}
