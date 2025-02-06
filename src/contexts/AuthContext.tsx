// Paulo Henrique

import { createContext, ReactNode, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { api } from "~services/api"; // Aqui deve ser o caminho correto para a instância da sua API

type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
  user: any; // Aqui você pode armazenar os dados do usuário autenticado
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);  // Adicionamos o estado do usuário

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setTokenState(storedToken);
      getUserByToken(storedToken);  // Busca o usuário com base no token
    }
  }, []);

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);

    if (newToken) {
      localStorage.setItem("token", newToken);
      getUserByToken(newToken);  // Busca o usuário ao definir o token
    } else {
      localStorage.removeItem("token");
    }
  };

  // Função que valida o token e busca o usuário
  async function getUserByToken(token: string | null) {
    if (!token) {
      console.log("Token ausente");
      return;
    }

    try {
      // Fazendo a requisição para a API
      const response = await api.get("/cliente", {
        headers: {
          "Authorization": `Bearer ${token}`  // Enviando o token no cabeçalho da requisição
        }
      });

      // Agora vamos procurar o usuário usando o 'email' armazenado no localStorage
      const storedEmail = localStorage.getItem("email");  // O email do usuário armazenado no localStorage

      if (!storedEmail) {
        console.log("Email não encontrado no localStorage");
        return;
      }

      // Filtrando o usuário com base no email
      const user = response.data.find((user: any) => user.usuario.username === storedEmail); 

      if (user) {
        setUser(user);  // Armazenando o usuário no estado
        // console.log("Usuário encontrado:", user);
      } else {
        console.log("Usuário não encontrado com esse email.");
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  }

  // Função que valida o token no localStorage
  function validateToken() {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      setToken(null);
      toast("Sessão expirada ou token ausente. Por favor, faça login novamente.", {
        position: "top-center",
        toastId: "session-expired",
        hideProgressBar: true,
        autoClose: 3000,
        pauseOnHover: false,
        closeButton: false,
        className: "text-center",
      });
    } else {
      setToken(storedToken);
    }
  }

  useEffect(() => {
    if (token) {
      validateToken();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, user }}>
      {children}
    </AuthContext.Provider>
  );
}
