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

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setTokenState(storedToken);
    }
  }, []);

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);

    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
  };

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
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
