import {
    CSSProperties,
    memo,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react'

import { Backdrop } from 'components/Backdrop'
import { useEventListener } from 'hooks/useEventListener'

interface DropdownItem {
    key: number
    label: ReactNode
    icon?: ReactNode
}

interface DropdownProps {
    children: ReactNode
    items: DropdownItem[]
}

export default memo(function Dropdown({ children, items }: DropdownProps) {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState(false)
    const [style, setStyle] = useState<CSSProperties>({
        position: 'fixed',
    })

    useEventListener(
        'click',
        () => {
            setOpen(true)
        },
        wrapperRef,
    )

    useEffect(() => {
        if (wrapperRef.current) {
            const { offsetTop, offsetLeft, clientHeight } = wrapperRef.current
            setStyle((s) => ({
                ...s,
                top: `${offsetTop + clientHeight}px`,
                left: `${offsetLeft}px`,
            }))
        }
    }, [])

    return (
        <>
            <div ref={wrapperRef}>{children}</div>
            {open && (
                <Backdrop transparent onClick={() => setOpen(false)}>
                    <div
                        className="bg-white dark:bg-neutral-800 p-3 shadow rounded-lg"
                        style={style}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {items.map(({ label, key }) => (
                            <div key={key}>{label}</div>
                        ))}
                    </div>
                </Backdrop>
            )}
        </>
    )
})
