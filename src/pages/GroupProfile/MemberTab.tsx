import React from 'react'
import { Avatar, Button, Card, CardContent, Grid, SvgIcon, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import Loader from '../../components/Loader'
import { Stack } from '@mui/system'
import { UserInterface } from '../../interfaces'
import useAxiosPrivate from '../../adapters/xhr/axiosPrivate'
import { getEndpointUrl } from '../../helper'
import Dropdown from '../../components/commons/dropdown'
import { useState } from 'react'
import { constants } from '../../constant'
import { MembersTabProps } from './interface'
import User01Icon from '@untitled-ui/icons-react/build/esm/User01'
import { SeverityPill } from '../../components/severity-pill'
import Autocomplete from '../../components/commons/AutoComplete/intex'
import NotFound from '../../components/commons/NotFound'

export const MembersTab = ({ members, isLoading, refetchDataHandler, groupId }: MembersTabProps) => {
  const [value, setValue] = useState<UserInterface>({} as UserInterface)
  const [autoCompleteOptions, setAutoCompleteOptions] = useState([])
  const axiosPrivate = useAxiosPrivate()
  const { apiEndpoints } = constants

  const handleDeleteUser = async (userId: number) => {
    const deleteGroupMemberUrl: string = getEndpointUrl(apiEndpoints.removeUserFromGroup)
    try {
      await axiosPrivate.post(deleteGroupMemberUrl, { user_id: userId, group_id: Number(groupId) })
      refetchDataHandler()
    } catch (error) {
      refetchDataHandler()
      throw new Error('An error occurred.')
    }
  }

  const handleMakeAdminUser = async (userId: number) => {
    const makeGroupAdminUrl: string = getEndpointUrl(apiEndpoints.makeGroupAdmin)
    try {
      await axiosPrivate.post(makeGroupAdminUrl, { user_id: userId, group_id: Number(groupId) })
      refetchDataHandler()
    } catch (error) {
      throw new Error('An error occurred.')
    }
  }

  const tableMenuOption = [
    {
      label: 'Remove',
      handleOnClick: handleDeleteUser
    },
    {
      label: 'Make Admin',
      handleOnClick: handleMakeAdminUser
    }
  ]

  const getAllUserByValue = async (searchString: string) => {
    const getUserListUrl: string = getEndpointUrl(apiEndpoints.getUsersList, { page_size: 20, search: searchString, page: 1 })
    try {
      const userListResponse = await axiosPrivate.get(getUserListUrl)
      setAutoCompleteOptions(userListResponse.data.results)
    } catch (error) {
      // Handle error
    }
  }

  const addUserToGroup = async () => {
    const addUserToGroupUrl: string = getEndpointUrl(apiEndpoints.addUserToGroup)
    try {
      await axiosPrivate.post(addUserToGroupUrl, { user_id: value.id, group_id: Number(groupId) })
      setValue({} as UserInterface)
      refetchDataHandler()
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

  const onChangeHandler = (_: any, newValue: UserInterface) => {
    setValue(newValue ? newValue : '')
  }

  const filterOptionsHandler = (options: UserInterface[], params: any) => {
    const { inputValue } = params
    let filtered = [] as UserInterface[]
    if (options && inputValue) {
      filtered = options.filter((option) => {
        const fullName = `${option.first_name.toLocaleLowerCase()} ${option.last_name.toLocaleLowerCase()}`
        const email = option.email
        return fullName.includes(inputValue) || email.includes(inputValue)
      })
    }
    return filtered
  }

  const getOptionLabelHandler = (option: UserInterface) => (option.first_name && option.last_name ? `${option.first_name} ${option.last_name}` : '')
  const renderOptionHandler = (props: any, option: UserInterface) => <li {...props}>{`${option.first_name} ${option.last_name}`}</li>

  return (
    <Card sx={{ overflowX: 'auto' }}>
      <CardContent>
        <Grid sx={{ width: '100%', margin: '0 auto' }} container spacing={3}>
          <Grid sx={{ alignSelf: 'center' }} xs={12} md={4}>
            <Stack spacing={1}>
              <Typography variant='h6'>Add members</Typography>
            </Stack>
          </Grid>
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
                placeholder='Search Members by Email, First name, Last name, and Phone number'
              />
              <Button disabled={!value.id} onClick={addUserToGroup} variant='contained'>
                Add
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
      {isLoading ? (
        <Loader />
      ) : (
        <Table sx={{ minWidth: '400px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Members</TableCell>
              <TableCell>Role</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {members.length !== 0 &&
              members.map((member, index) => (
                <TableRow className='cursor-pointer' hover key={index}>
                  <TableCell>
                    <Stack alignItems='center' direction='row' spacing={1}>
                      <Avatar
                        // src={member.avatar}
                        sx={{
                          height: 40,
                          width: 40
                        }}
                      >
                        <SvgIcon>
                          <User01Icon />
                        </SvgIcon>
                      </Avatar>
                      <div>
                        <Typography variant='subtitle2'>{`${member.first_name} ${member.last_name}`}</Typography>
                        <Typography color='text.secondary' variant='body2'>
                          {member.email}
                        </Typography>
                      </div>
                    </Stack>
                  </TableCell>
                  <TableCell>{member.is_admin ? <SeverityPill>OWNER</SeverityPill> : 'Standard'}</TableCell>
                  <TableCell align='right'>
                    <Dropdown disabled={member.is_admin} id={member.id} options={tableMenuOption} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
      <NotFound data={members} isLoading={isLoading} />
    </Card>
  )
}
