import clsx from 'clsx'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

type SpinnerSize = 'lg' | 'sm' | 'base'

interface SpinnerProps {
    size?: SpinnerSize
    className?: string
}

const getStyleFromSize = (size: SpinnerSize) => {
    switch (size) {
        case 'base':
            return 'text-base'
        case 'lg':
            return 'text-2xl'
        case 'sm':
            return 'text-sm'
        default:
            return ''
    }
}

export default function Spinner({ size = 'base', className }: SpinnerProps) {
    return (
        <AiOutlineLoading3Quarters
            className={clsx(
                'text-neutral-600 dark:text-white animate-spin',
                getStyleFromSize(size),
                className,
            )}
        />
    )
}
