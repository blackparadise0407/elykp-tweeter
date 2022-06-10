import clsx from 'clsx'
import { memo, ReactNode, useEffect } from 'react'

interface BackdropProps {
    children: ReactNode
    centerChildren?: boolean
    transparent?: boolean
    onClick?: () => void
}

export default memo(function Backdrop({
    children,
    centerChildren = false,
    transparent = false,
    onClick,
}: BackdropProps) {
    useEffect(() => {
        const main = document.getElementById('main')
        if (main) {
            main.style.overflow = 'hidden'
            main.style.height = '100vh'
            return () => {
                main.style.height = 'auto'
                main.style.overflow = 'unset'
            }
        }
    }, [])
    return (
        <div
            className={clsx(
                'fixed z-[999] top-0 left-0 w-screen h-screen bg-neutral-400 bg-opacity-20 backdrop-blur-sm overflow-y-auto',
                centerChildren && 'flex justify-center items-center',
                transparent && 'bg-opacity-0 backdrop-blur-none',
            )}
            onClick={onClick}
        >
            {children}
        </div>
    )
})
