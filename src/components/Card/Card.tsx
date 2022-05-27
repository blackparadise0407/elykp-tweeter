import { memo, ReactNode } from 'react'

interface CardProps {
    title: ReactNode
    children?: ReactNode
}

export default memo(function Card({ title, children }: CardProps) {
    return (
        <div className="bg-white dark:bg-neutral-800 px-5 py-2.5 rounded-lg shadow">
            {typeof title === 'string' ? (
                <div className="text-xs font-semibold text-black dark:text-white">
                    {title}
                </div>
            ) : (
                title
            )}
            <div className="w-full h-[1px] bg-gray-200 dark:bg-neutral-700 my-2"></div>
            {children}
        </div>
    )
})
