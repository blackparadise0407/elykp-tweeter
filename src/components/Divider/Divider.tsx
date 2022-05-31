import clsx from 'clsx'

interface DividerProps {
    className?: string
}

export default function Divider({ className }: DividerProps) {
    return (
        <div
            className={clsx(
                'w-full h-[1px] bg-neutral-200 dark:bg-neutral-500',
                className,
            )}
        ></div>
    )
}
