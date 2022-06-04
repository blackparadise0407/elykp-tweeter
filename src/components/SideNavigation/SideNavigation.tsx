import clsx from 'clsx'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

interface SideNavigationItem {
    transKey: string
    to: string
    cb?: () => void
}

interface SideNavigationProps {
    items: SideNavigationItem[]
}

export default memo(function SideNavigation({ items }: SideNavigationProps) {
    const { t } = useTranslation()

    return (
        <div className="py-5 bg-white dark:bg-neutral-800 shadow rounded-lg w-full md:max-w-[304px] md:min-w-[304px] w-full h-fit">
            {items.map(({ to, transKey, cb }) => (
                <NavLink
                    end
                    to={to}
                    className={({ isActive }) =>
                        clsx(
                            'block relative font-semibold text-neutral-500 dark:text-white py-3 px-5 hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-all',
                            isActive &&
                                "!text-blue-500 before:contents-[''] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:rounded-r before:bg-blue-500",
                        )
                    }
                    key={transKey}
                >
                    {t(transKey)}
                </NavLink>
            ))}
        </div>
    )
})
