import { CSSProperties, memo, useEffect, useRef, useState } from 'react'

import { Backdrop } from 'components/Backdrop'
import { useEventListener } from 'hooks/useEventListener'

import { DropdownProps } from '.'

export default memo(function Dropdown({ children, items }: DropdownProps) {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const menuRef = useRef<HTMLDivElement>(null)
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
        if (wrapperRef.current && menuRef.current) {
            const { innerWidth } = window
            const { offsetTop, offsetLeft, clientHeight } = wrapperRef.current
            const { clientWidth } = menuRef.current
            if (offsetLeft + clientWidth >= innerWidth) {
                console.log('wow')
            }
            setStyle((s) => ({
                ...s,
                top: `${offsetTop + clientHeight}px`,
                left: `${offsetLeft - clientWidth}px`,
            }))
        }
    }, [menuRef.current])

    return (
        <>
            <div ref={wrapperRef}>
                {typeof children === 'function'
                    ? children({ isOpen: open })
                    : children}
            </div>
            {open && (
                <Backdrop onClick={() => setOpen(false)} transparent>
                    <div
                        ref={menuRef}
                        style={style}
                        className="bg-white dark:bg-neutral-800 py-3.5 px-3 min-w-[200px] shadow rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {items.map(({ label, key }) => (
                            <div
                                className="p-3 text-xs cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-600 rounded-lg"
                                key={key}
                            >
                                {label}
                            </div>
                        ))}
                    </div>
                </Backdrop>
            )}
        </>
    )
})
