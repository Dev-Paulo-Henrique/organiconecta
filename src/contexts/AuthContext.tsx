import { createContext, ReactNode, useState, useEffect } from "react";
import { toast } from "react-toastify";

type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [token, setTokenState] = useState<string | null>(null);

  // Carregar o token do localStorage quando o componente for montado
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setTokenState(storedToken); // Atualiza o estado com o token do localStorage
    }
  }, []);

  // Função que será usada para definir o token
  const setToken = (newToken: string | null) => {
    setTokenState(newToken); // Atualiza o estado

    if (newToken) {
      localStorage.setItem("token", newToken); // Salva o token no localStorage
    } else {
      localStorage.removeItem("token"); // Remove o token do localStorage se for nulo
    }
  };

  // Função para validar o token
  function validateToken() {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      setToken(null); // Limpa o token no estado
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
      setToken(storedToken); // Se o token existir, atualiza o estado
    }
  }

  // Verifica o token sempre que ele mudar
  useEffect(() => {
    if (token) {
      validateToken();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
