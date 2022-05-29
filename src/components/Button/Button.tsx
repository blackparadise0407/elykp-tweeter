import clsx from 'clsx'
import { HTMLProps, memo, MouseEventHandler, ReactNode } from 'react'

import { Spinner } from 'components/Spinner'

type HTMLType = 'button' | 'submit' | 'reset' | undefined

type ButtonType = 'primary' | 'secondary' | 'link'

interface ButtonProps
    extends Omit<HTMLProps<HTMLButtonElement>, 'onClick' | 'classID'> {
    htmlType?: HTMLType
    children?: ReactNode
    icon?: ReactNode
    block?: boolean
    loading?: boolean
    type?: ButtonType
    onClick?: MouseEventHandler<HTMLButtonElement>
}

const getStyleFromType = (type: ButtonType) => {
    switch (type) {
        case 'primary':
            return 'bg-blue-500 hover:bg-blue-400 text-white'
        case 'secondary':
            return '!border-blue-500 hover:bg-blue-50 text-blue-500'
        case 'link':
            return 'bg-transparent hover:bg-gray-100 dark:hover:bg-neutral-600 text-black dark:text-white'
        default:
            return ''
    }
}

export default memo(function Button({
    htmlType,
    children,
    icon,
    block = false,
    loading = false,
    type = 'primary',
    disabled,
    className,
    onClick,
    ...rest
}: ButtonProps) {
    return (
        <button
            className={clsx(
                'flex items-center justify-center gap-3 py-2 px-6 font-medium text-xs md:text-base border border-transparent rounded-lg select-none transition-all',
                block && 'w-full block',
                getStyleFromType(type),
                disabled && 'opacity-80 pointer-events-none',
                className,
            )}
            type={htmlType as any}
            onClick={onClick}
            {...rest}
        >
            {loading ? (
                <Spinner />
            ) : (
                <>{icon && <span className="text-lg">{icon}</span>}</>
            )}
            {children}
        </button>
    )
})
