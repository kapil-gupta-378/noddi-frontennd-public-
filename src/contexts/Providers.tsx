import React from 'react'
import { AuthProvider } from './AuthProvider'
import { EnvProvider } from './EnvProvider'

const Providers = ({ children }) => (
  <EnvProvider>
    <AuthProvider>{children}</AuthProvider>
  </EnvProvider>
)

export default Providers
