import { HTMLProps, MouseEventHandler, ReactNode } from 'react'

export type HTMLType = 'button' | 'submit' | 'reset' | undefined

export type ButtonType = 'primary' | 'secondary' | 'link'

export interface ButtonProps
    extends Omit<HTMLProps<HTMLButtonElement>, 'onClick' | 'classID'> {
    htmlType?: HTMLType
    children?: ReactNode
    icon?: ReactNode
    block?: boolean
    loading?: boolean
    type?: ButtonType
    small?: boolean
    onClick?: MouseEventHandler<HTMLButtonElement>
}

export { default as Button } from './Button'
