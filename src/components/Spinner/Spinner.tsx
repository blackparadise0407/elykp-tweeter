import clsx from 'clsx'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

type SpinnerSize = 'lg' | 'sm' | 'base'

interface SpinnerProps {
    size?: SpinnerSize
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

export default function Spinner({ size = 'base' }: SpinnerProps) {
    return (
        <AiOutlineLoading3Quarters
            className={clsx('animate-spin', getStyleFromSize(size))}
        />
    )
}
