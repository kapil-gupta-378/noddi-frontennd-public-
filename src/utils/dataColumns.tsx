import { userTableColumn } from '../interfaces'

export const userTablecolumns: readonly userTableColumn[] = [
  {
    name: 'Name',
    label: 'Name'
  },
  {
    name: 'email',
    label: 'Email'
  },
  {
    name: 'phone_number',
    label: 'Phone Number'
  }
]

export const userGroupTableColumns: readonly userTableColumn[] = [
  {
    name: 'name',
    label: 'Name'
  }
]

export const userGroupMembershipTableColumns: readonly userTableColumn[] = [
  {
    name: 'name',
    label: 'Name'
  },
  {
    name: 'edit',
    label: 'Edit'
  }
]
