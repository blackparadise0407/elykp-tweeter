import clsx from 'clsx'
import { memo, useEffect, useRef } from 'react'
import {
    AiOutlineCheckCircle,
    AiOutlineClose,
    AiOutlineCloseCircle,
    AiOutlineInfoCircle,
    AiOutlineWarning,
} from 'react-icons/ai'

import { useEventListener } from 'hooks/useEventListener'
interface ToastProps {
    data: Toast
    onClose?: (id: number) => void
}

const getClassFromVariant = (variant: ToastVariant) => {
    switch (variant) {
        case 'success':
            return 'text-green-500 bg-white'
        case 'warning':
            return 'text-orange-500 bg-white'
        case 'error':
            return 'text-red-500 bg-white'
        case 'info':
            return 'text-blue-500 bg-white'
        default:
            return ''
    }
}

const getLineClassFromVariant = (variant: ToastVariant) => {
    switch (variant) {
        case 'success':
            return 'bg-green-500'
        case 'warning':
            return 'bg-orange-500'
        case 'error':
            return 'bg-red-500'
        case 'info':
            return 'bg-blue-500'
        default:
            return ''
    }
}

const getIconFromVariant = (variant: ToastVariant) => {
    switch (variant) {
        case 'success':
            return <AiOutlineCheckCircle />
        case 'warning':
            return <AiOutlineWarning />
        case 'error':
            return <AiOutlineCloseCircle />
        case 'info':
            return <AiOutlineInfoCircle />
        default:
            return ''
    }
}

export default memo(function Toast({ data, onClose = () => {} }: ToastProps) {
    const overlayRef = useRef<HTMLDivElement>(null)
    const timeout = useRef<NodeJS.Timeout | undefined>(undefined)

    useEventListener(
        'mouseenter',
        () => {
            clearTimeout(timeout.current)
        },
        overlayRef,
    )

    useEventListener(
        'mouseleave',
        () => {
            timeout.current = setTimeout(() => {
                handleClose()
            }, 5000)
        },
        overlayRef,
    )

    const { id, message, variant } = data

    const handleClose = () => {
        onClose(id)
    }

    useEffect(() => {
        timeout.current = setTimeout(() => {
            handleClose()
        }, 5000)
        return () => {
            clearTimeout(timeout.current)
        }
    }, [])

    return (
        <div
            className={clsx(
                'relative flex gap-2 items-center p-3 pr-8 rounded-lg shadow min-w-[350px] max-w-[350px] select-none',
                getClassFromVariant(variant),
            )}
        >
            <div
                className={clsx(
                    'absolute h-full w-3 top-0 -z-[1] -left-[5px] rounded-l-lg',
                    getLineClassFromVariant(variant),
                )}
            ></div>
            <span className="text-xl">{getIconFromVariant(variant)}</span>
            <span className="text-xs md:text-sm font-medium text-black">
                {message}
            </span>
            <div
                ref={overlayRef}
                className="absolute z-[1] top-0 left-0 w-full h-full cursor-pointer"
                onClick={handleClose}
            ></div>
            {/* <AiOutlineClose
                className="absolute top-2 right-2 text-lg cursor-pointer text-black"
                onClick={handleClose}
            /> */}
        </div>
    )
})
