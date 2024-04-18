import React from 'react'
import UserGroupDataGrid from '../../components/UserGroupDataGrid'
import { userGroupTableColumns } from '../../utils/dataColumns'
import { useUserGroup } from '../../hooks/UserGroup'

const UserGroups = () => {
  const { page, setPage, userGroups, isLoading, dataSearch, onRowsPerPageChange, perPageSize, dataCount } = useUserGroup()
  return (
    <div>
      <UserGroupDataGrid
        columns={userGroupTableColumns}
        page={page}
        setPage={setPage}
        rows={userGroups}
        isLoading={isLoading}
        dataSearch={dataSearch}
        onRowsPerPageChange={onRowsPerPageChange}
        perPageSize={perPageSize}
        totalDataCount={dataCount}
        pageName=''
      />
    </div>
  )
}
export default UserGroups
