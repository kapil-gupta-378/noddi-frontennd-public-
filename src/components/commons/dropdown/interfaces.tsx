export interface DropdownOption {
    label: string
    handleOnClick: (data: any) => void
}

export interface DropdownProps {
    options: DropdownOption[]
    id?: number
    disabled?: boolean
}