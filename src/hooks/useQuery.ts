import React from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Custom hook for parsing query parameters from the current URL search string.
 *
 * This hook uses the `useLocation` hook from React Router to access the current URL's search parameters.
 * It returns a `URLSearchParams` object containing the parsed query parameters.
 *
 * @returns {URLSearchParams} - A `URLSearchParams` object containing parsed query parameters.
 */
export function useQuery() {
  // Retrieve the `search` property from the current location
  const { search } = useLocation()

  // Create and memoize a `URLSearchParams` object using the `search` property
  return React.useMemo(() => new URLSearchParams(search), [search])
}
