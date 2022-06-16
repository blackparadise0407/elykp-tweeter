import clsx from 'clsx'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { CSSProperties, memo, useEffect, useRef, useState } from 'react'

import { Backdrop } from 'components/Backdrop'
import { useEventListener } from 'hooks/useEventListener'

import { DropdownProps } from '.'

const variants: Variants = {
    exit: {
        opacity: 0,
        y: 20,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
}

export default memo(function Dropdown({ children, items }: DropdownProps) {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState(false)
    const [style, setStyle] = useState<CSSProperties>({
        position: 'absolute',
    })

    useEventListener(
        'click',
        () => {
            setOpen((o) => !o)
        },
        wrapperRef,
    )

    useEffect(() => {
        if (wrapperRef.current) {
            const { innerWidth } = window
            const { offsetTop, offsetLeft, clientHeight, clientWidth } =
                wrapperRef.current

            setStyle((s) => ({
                ...s,
                top: `${offsetTop + clientHeight + 10}px`,
                right: `${innerWidth - clientWidth - offsetLeft}px`,
            }))
        }
    }, [])

    return (
        <>
            <div
                className={clsx(
                    'cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-600 p-2 rounded-lg transition-colors',
                    open && 'bg-neutral-100 dark:bg-neutral-600',
                )}
                ref={wrapperRef}
            >
                {typeof children === 'function'
                    ? children({ isOpen: open })
                    : children}
            </div>
            <AnimatePresence>
                {open && (
                    <Backdrop onClick={() => setOpen(false)} transparent>
                        <motion.div
                            variants={variants}
                            initial="exit"
                            animate="animate"
                            exit="exit"
                            style={style}
                            className="bg-white dark:bg-neutral-800 py-3.5 px-3 min-w-[200px] shadow dark:shadow-neutral-900 rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {items.map(({ key, icon, label, cb }) => (
                                <div
                                    className="flex items-center gap-2.5 p-3 text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors rounded-lg text-xs font-medium cursor-pointer"
                                    key={key}
                                    onClick={() => {
                                        cb?.()
                                        setOpen(false)
                                    }}
                                >
                                    {icon && (
                                        <span className="text-lg">{icon}</span>
                                    )}
                                    {label}
                                </div>
                            ))}
                        </motion.div>
                    </Backdrop>
                )}
            </AnimatePresence>
        </>
    )
})
