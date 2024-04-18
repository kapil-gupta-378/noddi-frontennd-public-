import React, { useEffect, useState } from 'react'

const usePaginationAndQuery = (initialPage?: number, initialPageSize?: number, dataFetchCB: (query: string) => any[], filters) => {
  const [page, setPage] = useState<number>(initialPage || 1)
  const [pageSize, setPageSize] = useState<number>(initialPageSize || 10)
  const [query, setQuery] = useState<string>('')
  const [data, setData] = useState<any[]>([])
  const [dataCount, setDataCount] = useState<number>(0)
  const nextPage = () => setPage((prev) => prev + 1)
  const prevPage = () => setPage((prev) => prev - 1)

  useEffect(() => {
    handle(query)
  }, [page, pageSize, query ,filters])

  const handle = async (query: string) => {
    const data = await dataFetchCB(query)
    setData(data?.results)
    setDataCount(data.count as number)
  }

  return {
    page,
    pageSize,
    setPage,
    setPageSize,
    nextPage,
    prevPage,
    query,
    setQuery,
    data,
    dataCount
  }
}

export default usePaginationAndQuery
