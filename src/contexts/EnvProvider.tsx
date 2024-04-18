import React, { createContext, useEffect } from 'react'

const ENV_KEY = 'env'
const PROD = 'live'
const TEST = 'test'

const EnvContext = createContext({})

export const EnvProvider = ({ children }) => {
  const changeEnv = () => {
    if (localStorage.getItem(ENV_KEY) === PROD) {
      localStorage.setItem(ENV_KEY, TEST)
    } else {
      localStorage.setItem(ENV_KEY, PROD)
    }
  }

  useEffect(() => {
    if (localStorage.getItem(ENV_KEY) === null) {
      localStorage.setItem(ENV_KEY, TEST)
    }
  })

  const envIsProd = () => localStorage.getItem(ENV_KEY) === PROD

  const contextData = {
    changeEnv,
    envIsProd
  }

  return <EnvContext.Provider value={contextData}>{children}</EnvContext.Provider>
}

export default EnvContext
