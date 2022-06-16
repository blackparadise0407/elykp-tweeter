import { ReactNode } from 'react'

export interface DropdownItem {
    key: number
    label?: ReactNode
    icon?: ReactNode
    cb?: () => void
}
export interface DropdownProps {
    children: ReactNode | ((props: { isOpen: boolean }) => ReactNode)
    items: DropdownItem[]
}

export { default as Dropdown } from './Dropdown'
