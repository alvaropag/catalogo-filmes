// Context: guarda o JWT do usuário logado e oferece entrar() e sair().
// O token é persistido com expo-secure-store (veja src/services/authStorage.ts).
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { login } from '../services/authService';
import { lerToken, removerToken, salvarToken } from '../services/authStorage';

type AuthContextType = {
  token: string | null; // null = ninguém logado
  verificando: boolean; // true enquanto lê o token salvo ao abrir o app
  entrar: (usuario: string, senha: string) => Promise<void>;
  sair: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [verificando, setVerificando] = useState(true);

  // Ao abrir o app, restaura a sessão se já existir um token guardado.
  useEffect(() => {
    lerToken()
      .then(setToken)
      .finally(() => setVerificando(false));
  }, []);

  const entrar = useCallback(async (usuario: string, senha: string) => {
    const novoToken = await login(usuario, senha); // POST /auth/login
    await salvarToken(novoToken);
    setToken(novoToken);
  }, []);

  const sair = useCallback(async () => {
    await removerToken();
    setToken(null);
  }, []);

  return <AuthContext value={{ token, verificando, entrar, sair }}>{children}</AuthContext>;
}

export function useAuth(): AuthContextType {
  const contexto = useContext(AuthContext);
  if (!contexto) throw new Error('useAuth precisa estar dentro de <AuthProvider>');
  return contexto;
}
