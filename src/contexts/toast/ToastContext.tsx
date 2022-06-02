import {
    AnimatePresence,
    AnimateSharedLayout,
    motion,
    Variants,
} from 'framer-motion'
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useState,
} from 'react'

import { Toast } from 'components'

interface ToastProviderProps {
    children: ReactNode
}

const defaultValue: ToastContext = {
    items: [],
    enqueue: () => {},
    remove: () => {},
}

const variants: Variants = {
    initial: { opacity: 0, x: 200 },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            damping: 20,
            stiffness: 400,
        },
    },
    exit: {
        opacity: 0,
        x: 200,
        transition: {
            type: 'spring',
        },
    },
}

export const ToastContext = createContext<ToastContext>(defaultValue)

export const ToastProvider = ({ children }: ToastProviderProps) => {
    const [toasts, setToasts] = useState<Toast[]>(defaultValue.items)

    const handleEnqueueToast = useCallback(
        (message: string, opts: ToastOptions = {}) => {
            const { variant } = opts
            const toast: Toast = {
                id: Date.now(),
                message,
                variant,
            }
            setToasts((toasts) => [...toasts, toast])
        },
        [],
    )

    const handleRemoveToast = useCallback((id: number) => {
        setToasts((prev) => {
            const toastsCopy = [...prev]
            const foundToastIdx = toastsCopy.findIndex(
                (toast) => toast.id === id,
            )
            if (foundToastIdx > -1) {
                toastsCopy.splice(foundToastIdx, 1)
                return toastsCopy
            }
            return prev
        })
    }, [])

    return (
        <ToastContext.Provider
            value={{
                items: toasts,
                enqueue: handleEnqueueToast,
                remove: handleRemoveToast,
            }}
        >
            {children}
            <div className="fixed top-3 right-3 z-[998] space-y-3">
                <AnimatePresence initial={false}>
                    {toasts.map((toast) => (
                        <motion.div
                            layout
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            key={toast.id}
                            id={toast.id + ''}
                        >
                            <Toast data={toast} onClose={handleRemoveToast} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    )
}

export const useToastContext = () => {
    return useContext(ToastContext)
}
