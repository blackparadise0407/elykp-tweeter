import { memo, useEffect } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

interface ToastProps {
    data: Toast
    onClose?: (id: number) => void
}

const getToastFromVariant = (variant: ToastVariant) => {}

export default memo(function Toast({ data, onClose = () => {} }: ToastProps) {
    const { id, message } = data
    const handleClose = () => {
        onClose(id)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            handleClose()
        }, 5000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <div className="relative p-3 pr-8 bg-white rounded-lg shadow min-w-[350px]">
            <span className="text-xs md:text-sm text-black">{message}</span>
            {id.toString()}
            <AiOutlineCloseCircle
                className="absolute top-2 right-2 text-xl cursor-pointer"
                onClick={handleClose}
            />
        </div>
    )
})
