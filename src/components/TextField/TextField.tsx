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
                    <label className="inline-block font-medium text-xs md:text-sm mx-3 mb-1">
                        {label}
                    </label>
                )}
                <div
                    className="flex items-center bg-transparent border border-gray-300 dark:border-neutral-600 rounded-lg overflow-hidden text-sm md:text-base font-medium
                           placeholder:text-gray-300"
                >
                    {icon && (
                        <span className="ml-3 text-xl text-gray-500">
                            {icon}
                        </span>
                    )}
                    <input
                        className="p-3 flex-grow bg-transparent border-none outline-none text-black dark:text-white"
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
