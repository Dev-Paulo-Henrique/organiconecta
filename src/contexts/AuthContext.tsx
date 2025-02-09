// Paulo Henrique

import { isAxiosError } from 'axios'
import { createContext, ReactNode, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { api } from '~services/api'
import { notifyError } from '~utils/toastify'

type AuthContextType = {
  token: string | null
  setToken: (token: string | null) => void
  user: any
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [token, setTokenState] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setTokenState(storedToken)
      getUserByToken(storedToken)
    }
  }, [])

  const setToken = (newToken: string | null) => {
    setTokenState(newToken)

    if (newToken) {
      localStorage.setItem('token', newToken)
      getUserByToken(newToken)
    } else {
      localStorage.removeItem('token')
    }
  }

  async function getUserByToken(token: string | null) {
    if (!token) {
      console.log('Token ausente')
      return
    }

    try {
      const response = await api.get('/cliente', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const storedEmail = localStorage.getItem('email')

      if (!storedEmail) {
        console.log('Email não encontrado no localStorage')
        return
      }

      const user = response.data.find(
        (user: any) => user.usuario.username === storedEmail,
      )

      if (user) {
        setUser(user)
        console.log('Usuário encontrado:', user)
      } else {
        console.log('Usuário não encontrado com esse email.')
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (
          error.response &&
          error.response.status === 500 &&
          error.response.data.includes('JWT')
        ) {
          console.error(
            'Erro 500 - JWT no corpo da resposta. Validando token...',
          )
          localStorage.removeItem('token')
          localStorage.removeItem('email')
          validateToken()
        }
      } else {
        console.log('Erro desconhecido:', error)
      }
    }
  }

  function validateToken() {
    const storedToken = localStorage.getItem('token')

    if (!storedToken) {
      setToken(null)
      toast(
        'Sessão expirada ou token ausente. Por favor, faça login novamente.',
        {
          position: 'top-center',
          toastId: 'session-expired',
          hideProgressBar: true,
          autoClose: 3000,
          pauseOnHover: false,
          closeButton: false,
          className: 'text-center',
        },
      )
      window.location.assign('/login')
    } else {
      setToken(storedToken)
    }
  }

  useEffect(() => {
    if (token) {
      validateToken()
    }
  }, [token])

  return (
    <AuthContext.Provider value={{ token, setToken, user }}>
      {children}
    </AuthContext.Provider>
  )
}
