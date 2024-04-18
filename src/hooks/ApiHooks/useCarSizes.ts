import React, { useEffect, useState } from 'react'
import useApiRequest from './useApiRequest'
import { constants } from '../../constant'
import { FilterOption } from '../../interfaces'

export const useCarSizes = () => {
  const [carSizesList, setCardSizesList] = useState<FilterOption[]>([])
  const { getRequest } = useApiRequest()
  const { apiEndpoints } = constants
  const getCardSizesList = async () => {
    const response = await getRequest(apiEndpoints.getCarSizesOption)
    const data = response?.data?.results?.map((value : any) => ({
      value: value.id,
      label: value.name
    }))
    setCardSizesList(data || []);
  }

  useEffect(() => {
    getCardSizesList()
  }, [])

  return {carSizesList}
}
