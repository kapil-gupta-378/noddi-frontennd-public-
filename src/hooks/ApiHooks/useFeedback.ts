import React, { useEffect, useState } from 'react'
import { getEndpointUrl } from '../../helper'
import { constants } from '../../constant'
import useAxiosPrivate from '../../adapters/xhr/axiosPrivate'
import { Feedback, RatingAvg } from '../../interfaces'
import { BookingListFilter } from './interfaces'
import moment from 'moment'
interface Rating {
  avg: number
  total: number
}

interface RatingsObject {
  [key: string]: Rating
}

export const useFeedback = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [dataCount, setDataCount] = useState<number>(0)
  const [feedbackSummary, setFeedbackSummary] = useState<RatingAvg[]>([])
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [filterOption, setfilterOption] = useState<BookingListFilter>({} as BookingListFilter)
  const { apiEndpoints } = constants

  const axiosPrivate = useAxiosPrivate()

  const getFeedbacks = async (page: number, filterOption: BookingListFilter) => {
    setIsLoading(true)
    const params = {
      page_size: pageSize,
      page: page,
      search: filterOption.search ? filterOption.search : '',
      start_date: filterOption.start_date ? moment(filterOption.start_date).format('YYYY-MM-DD') : '',
      end_date: filterOption.end_date ? moment(filterOption.end_date).format('YYYY-MM-DD') : '',
      ratings: filterOption.rating || ''
    }
    const getFeedbacksUrl: string = getEndpointUrl(apiEndpoints.getFeedbacks, params)

    await axiosPrivate
      .get(getFeedbacksUrl)
      .then((values: any) => {
        setDataCount(values.data.count)
        setFeedbacks(values.data.results)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }

  const getFeedbacksSummary = async () => {
    setIsLoading(true)
    const getFeedbacksSummaryUrl: string = getEndpointUrl(apiEndpoints.getFeedbackSummary)

    await axiosPrivate
      .get(getFeedbacksSummaryUrl)
      .then((values: any) => {
        const feedbackSummaryData = values.data as RatingsObject
        const feedbackSummary: any = [
          { key: 'customer_rating_car_result', ...feedbackSummaryData['customer_rating_car_result'] },
          { key: 'ease_of_use', ...feedbackSummaryData['ease_of_use'] },
          { key: 'customer_rating_politeness', ...feedbackSummaryData['customer_rating_politeness'] },
          { key: 'customer_rating_communication', ...feedbackSummaryData['customer_rating_communication'] },
          { key: 'customer_rating_overall', ...feedbackSummaryData['customer_rating_overall'] }
        ]
        setFeedbackSummary(feedbackSummary)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getFeedbacks(page, filterOption)
    getFeedbacksSummary()
  }, [])
  useEffect(() => {
    getFeedbacks(page, filterOption)
  }, [page, filterOption])

  useEffect(() => {
    getFeedbacks(1, filterOption)
  }, [pageSize])

  return { feedbacks, isLoading, dataCount, page, setPage, pageSize, setPageSize, feedbackSummary, setfilterOption }
}
