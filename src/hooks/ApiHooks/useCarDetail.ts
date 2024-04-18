import { useEffect, useState } from 'react'
import useAxiosPrivate from '../../adapters/xhr/axiosPrivate'
import { constants } from '../../constant'
import { getEndpointUrl } from '../../helper'
import { useParams } from 'react-router-dom'
import { CarWheelProps, CarWheelSetListProps, WheelSetDetailProps } from '../../pages/CarDetail/interface'

export const useCarDetail = () => {
  const [carWheelSetList, setCarWheelSetList] = useState<CarWheelSetListProps>({} as CarWheelSetListProps)
  const [carWheelSet, setCarWheelSet] = useState<WheelSetDetailProps>({} as WheelSetDetailProps)
  const [carDetail, setCarDetail] = useState<{ model: string }>()
  const [userGroupDetail, setUserGroupDetail] = useState<{ name: string }>()
  const [carWheel, setCarWheel] = useState<CarWheelProps>({} as CarWheelProps)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { carId, id, wheelSetId, wheelId } = useParams()

  const axiosPrivate = useAxiosPrivate()
  const { apiEndpoints } = constants

  const getCarWheelSetList = async (carId: string) => {
    try {
      setIsLoading(true)
      const res = await axiosPrivate.get(getEndpointUrl(apiEndpoints.getCarWheelSetByCar, { carId }))
      setIsLoading(false)

      if (res.status === 200) {
        setCarWheelSetList(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getCarWheelSetById = async (wheelSetId: string) => {
    try {
      setIsLoading(true)
      const res = await axiosPrivate.get(getEndpointUrl(apiEndpoints.getCarWheelSetById, { carWheelSetId: wheelSetId }))
      if (res.status === 200) {
        setCarWheelSet(res.data)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getUserGroup = async (id: string) => {
    try {
      setIsLoading(true)
      const res = await axiosPrivate.get(getEndpointUrl(apiEndpoints.getUserGroupById, { id }))
      setIsLoading(false)
      if (res.status === 200) {
        setUserGroupDetail(res.data)
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  const getCar = async (carId: string) => {
    try {
      const res = await axiosPrivate.get(getEndpointUrl(apiEndpoints.getCarDetail, { carId }))
      if (res.status === 200) {
        setCarDetail(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getCarWheelById = async (wheelId: string) => {
    try {
      const res = await axiosPrivate.get(getEndpointUrl(apiEndpoints.getCarWheel, { wheelId }))
      if (res.status === 200) {
        setCarWheel(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (wheelId) {
      getCarWheelById(wheelId as string)
    }

    if (wheelSetId) {
      getCarWheelSetById(wheelSetId as string)
    }

    getCar(carId as string)
    getUserGroup(id as string)
  }, [])

  return {
    carWheelSetList,
    getCarWheelSetList,
    carId,
    id,
    wheelId,
    wheelSetId,
    isLoading,
    carDetail,
    userGroupDetail,
    carWheel,
    carWheelSet
  }
}
