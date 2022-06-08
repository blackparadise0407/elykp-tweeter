import clsx from 'clsx'
import { memo, ReactNode, useEffect } from 'react'

interface BackdropProps {
    children: ReactNode
    centerChildren?: boolean
    onClick?: () => void
}

export default memo(function Backdrop({
    children,
    centerChildren = false,
    onClick,
}: BackdropProps) {
    useEffect(() => {
        const root = document.getElementById('root')
        if (root) {
            root.style.overflow = 'hidden'
            return () => {
                root.style.overflow = 'unset'
            }
        }
    }, [])
    return (
        <div
            className={clsx(
                'fixed z-[999] top-0 left-0 w-screen h-screen bg-neutral-400 bg-opacity-20 backdrop-blur-sm overflow-y-auto',
                centerChildren && 'flex justify-center items-center',
            )}
            onClick={onClick}
        >
            {children}
        </div>
    )
})
