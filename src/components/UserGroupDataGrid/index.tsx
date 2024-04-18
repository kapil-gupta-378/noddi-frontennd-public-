/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { UserGroupsListTable } from './UserGroupsListTable'
import { UserGroupsSearch } from './UserGroupsSearch'
import Autocomplete from '../commons/AutoComplete/intex'
import { Button, Grid } from '@mui/material'
import { getEndpointUrl } from '../../helper'
import { constants } from '../../constant'
import useAxiosPrivate from '../../adapters/xhr/axiosPrivate'
import { toast } from 'react-hot-toast'
import { UserGroupInterface } from '../../interfaces'

const UserGroupsDataGrid = ({
  columns,
  rows,
  isLoading,
  dataSearch,
  perPageSize = 10,
  page,
  setPage,
  onRowsPerPageChange,
  totalDataCount,
  pageName,
  handleAddUserGroup,
  searchKey,
  searchPlaceholder,
  membershipId,
  getUpdatedUserGroup
}: any) => {
  const { apiEndpoints } = constants
  const axiosPrivate = useAxiosPrivate()

  const [value, setValue] = useState<UserGroupInterface>({} as UserGroupInterface)
  const [autoCompleteOptions, setAutoCompleteOptions] = useState([])

  const addUserToGroup = async () => {
    const addUserGroupToMembership: string = getEndpointUrl(apiEndpoints.addUserGroupToMembership)
    try {
      await axiosPrivate.post(addUserGroupToMembership, { mebership_program_id: membershipId, user_group_id: value.id })
      setValue({} as UserGroupInterface)
      getUpdatedUserGroup()
      toast.success('New User Group added successfully.')
    } catch (error: any) {
      toast.error('User Group already exists!')
    }
  }

  const getAllUserByValue = async (searchString: string) => {
    const getUserListUrl: string = getEndpointUrl(apiEndpoints.getUserGroups, { search: searchString, page: 1 })
    try {
      const userListResponse = await axiosPrivate.get(getUserListUrl)
      setAutoCompleteOptions(userListResponse.data.results)
    } catch (error) {
      // Handle error
    }
  }

  const onInputChangeHandler = (e: React.SyntheticEvent<Element, Event>) => {
    if (e?.target) {
      const value = (e.target as HTMLInputElement).value
      getAllUserByValue(value)
    }
  }

  const filterOptionsHandler = (options: UserGroupInterface[], params: any) => {
    const { inputValue } = params
    let filtered = [] as UserGroupInterface[]
    if (options && inputValue) {
      const regex = new RegExp(inputValue, 'i') // Create case-insensitive regular expression
      filtered = options.filter((option) => {
        const fullName = `${option.name} ${option.id}`
        return regex.test(fullName) // Use regular expression test() method for matching
      })
    }
    return filtered
  }

  const onChangeHandler = (_: any, newValue: UserGroupInterface) => {
    setValue(newValue ? newValue : '')
  }

  const getOptionLabelHandler = (option: UserGroupInterface) => (option.name ? `${option.name}` : '')
  const renderOptionHandler = (props: any, option: UserGroupInterface) => <li {...props}>{`${option.name}`}</li>

  return (
    <>
      <Box
        component='main'
        sx={{
          flexGrow: 1
        }}
      >
        <Container maxWidth='xl'>
          <Stack spacing={4}>
            {pageName !== 'userMembership' && (
              <Stack direction='row' justifyContent='space-between' spacing={4}>
                <Stack spacing={1}>
                  <Typography variant='h4'>User Groups</Typography>
                </Stack>
              </Stack>
            )}
            <Card className={`${pageName === 'userMembership' && 'membership-search-wrp'}`}>
              {pageName === 'userMembership' ? (
                <Grid xs={12} md={8}>
                  <Stack alignItems='center' direction='row' spacing={3}>
                    <Autocomplete
                      value={value}
                      onInputChange={onInputChangeHandler}
                      onChange={onChangeHandler}
                      filterOptions={filterOptionsHandler}
                      autoCompleteOptions={autoCompleteOptions}
                      getOptionLabel={getOptionLabelHandler}
                      renderOption={renderOptionHandler}
                      placeholder='Search User Groups by Name'
                    />
                    <Button disabled={!value.id} onClick={addUserToGroup} variant='contained'>
                      Add
                    </Button>
                  </Stack>
                </Grid>
              ) : (
                <UserGroupsSearch dataSearch={dataSearch} searchPlaceholder={searchPlaceholder} />
              )}
              <UserGroupsListTable
                count={totalDataCount || 0}
                items={rows}
                columns={columns}
                isLoading={isLoading}
                rowsPerPage={perPageSize}
                onRowsPerPageChange={onRowsPerPageChange}
                page={page}
                setPage={setPage}
                pageName={pageName}
                handleAddUserGroup={handleAddUserGroup}
                searchKey={searchKey}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default UserGroupsDataGrid
