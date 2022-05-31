import { memo, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineClose } from 'react-icons/ai'

import { Backdrop } from 'components'
import { Button } from 'components/Button'
import { Divider } from 'components/Divider'

interface ModalProps {
    open?: boolean
    title?: ReactNode
    children?: ReactNode
    okLabel?: ReactNode
    cancelLabel?: ReactNode
    onClose?: () => void
    onOk?: () => void
}

export default memo(function Modal({
    title,
    open = false,
    children,
    okLabel,
    cancelLabel,
    onClose,
    onOk,
}: ModalProps) {
    const { t } = useTranslation()
    if (!open) return null
    return (
        <Backdrop centerChildren>
            <div className="relative bg-white dark:bg-neutral-700 p-5 shadow rounded-lg max-w-[636px] w-full">
                <div className="pr-6">
                    {typeof title === 'string' ? (
                        <span className="font-semibold text-xs md:text-sm text-black dark:text-white">
                            {title}
                        </span>
                    ) : (
                        title
                    )}
                </div>
                {onClose && (
                    <AiOutlineClose
                        className="absolute right-5 top-5 text-xl text-neutral-700 dark:text-white cursor-pointer hover:text-neutral-800 hover:dark:text-neutral-300 transition-colors"
                        onClick={onClose}
                    />
                )}
                <Divider className="my-2" />
                <div className="overflow-y-auto max-h-[80vh]">{children}</div>
                <Divider className="my-2" />
                <div className="flex justify-end gap-2">
                    <Button
                        small
                        type="link"
                        className="capitalize"
                        onClick={onClose}
                    >
                        {cancelLabel ? cancelLabel : t('cancel')}
                    </Button>
                    <Button small className="capitalize" onClick={onOk}>
                        {okLabel ? okLabel : t('confirm')}
                    </Button>
                </div>
            </div>
        </Backdrop>
    )
})
