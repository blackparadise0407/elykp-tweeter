import clsx from 'clsx'
import { forwardRef, HTMLProps, LegacyRef, memo, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface TextFieldProps {
    inputProps?: HTMLProps<HTMLInputElement>
    label?: string
    icon?: ReactNode
    error?: string
}

const TextField = forwardRef(
    (
        { inputProps, label, icon, error }: TextFieldProps,
        ref: LegacyRef<HTMLInputElement>,
    ) => {
        const { t } = useTranslation()
        return (
            <div className="w-full">
                {label && (
                    <label className="inline-block font-medium text-xs md:text-sm mx-3 mb-1 text-black dark:text-white">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 ml-3 text-xl text-gray-500">
                            {icon}
                        </span>
                    )}
                    <input
                        className={clsx(
                            'w-full bg-transparent border border-gray-300 dark:border-neutral-500 rounded-lg text-sm md:text-base font-medium placeholder:text-gray-300 p-3 outline-none text-black dark:text-white  focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-500 transition-all',
                            icon && 'pl-10',
                        )}
                        ref={ref}
                        {...inputProps}
                    />
                </div>
                {error && (
                    <p className="text-red-500 dark:text-red-400 text-xs md:text-sm mx-3 mt-0.5">
                        {t(error)}
                    </p>
                )}
            </div>
        )
    },
)

export default memo(TextField)
