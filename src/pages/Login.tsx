import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Form, Image, Spinner } from 'react-bootstrap'
import Logo from '../assets/images/noddi.png'
import { MdError } from 'react-icons/md'
import AuthContext from '../contexts/AuthProvider'
import axios from '../adapters/xhr/axios'
import SEO from '../components/SEO'
import { dateToDdMmYyyyDashes } from '../utils'

const Login = () => {
  const { updateUserData } = useContext(AuthContext)

  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = async (e) => {
    setIsLoading(true)
    setErrorMessage('')
    e.preventDefault()

    try {
      const response = await axios.post('/v1/login/', JSON.stringify({ email, password }), {
        withCredentials: false,
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response?.data.user.is_superuser) {
        setErrorMessage('You are not an admin user..')
        setIsLoading(false)
        return
      }

      updateUserData(response?.data)
      setEmail('')
      setPassword('')
      setIsLoading(false)
      // navigate(location.state?.from || `/${dateToDdMmYyyy(new Date())}`)
      navigate('/users')
    } catch (error: any) {
      if (error.response.status === 400) {
        setErrorMessage('Invalid login credentials..')
      }
      setIsLoading(false)
    }
  }

  return (
    <>
      <SEO title={'Login'} />
      <div className={'d-flex flex-column min-vh-100'}>
        <Form onSubmit={onSubmit} className={'form-login'}>
          <div className={'text-center mb-4'}>
            <Image className={'mb-4'} src={Logo} alt={''} height={'72'} />
          </div>

          <Form.Group className={'mb-3'} controlId={'formBasicEmail'}>
            <Form.Label>Email address</Form.Label>
            <Form.Control type='email' placeholder={'Enter email'} value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group className={'mb-3'} controlId={'formBasicPassword'}>
            <Form.Label>Password</Form.Label>
            <Form.Control type={'password'} placeholder={'Password'} value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          {/*<Form.Group className={"mb-3"} controlId={"formBasicCheckbox"}>*/}
          {/*    <Form.Check type={"checkbox"} label={"Remember me"}/>*/}
          {/*</Form.Group>*/}

          <Button variant={'primary'} type={'submit'} disabled={isLoading} className={'btn btn-lg w-100'}>
            Login
            {isLoading ? (
              <Spinner className={'ms-2'} animation='border' role='status' size={'sm'}>
                <span className='visually-hidden'>Logging in..</span>
              </Spinner>
            ) : (
              <></>
            )}
          </Button>

          {errorMessage && (
            <p className={'text-start text-danger mt-3'}>
              <MdError className={'mb-1'} /> {errorMessage}
            </p>
          )}
        </Form>
      </div>
    </>
  )
}

export default Login
