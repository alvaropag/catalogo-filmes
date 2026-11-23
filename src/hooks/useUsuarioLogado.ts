// ViewModel: dados do usuário logado (GET /auth/me com o JWT).
// Se a API responder 401 (token inválido ou expirado), faz logout automático.
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import type { Usuario } from '../models/Usuario';
import { ErroHttp } from '../services/api';
import { buscarUsuarioLogado } from '../services/authService';

export function useUsuarioLogado() {
  const { token, sair } = useAuth();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    let ativo = true;
    buscarUsuarioLogado(token)
      .then((u) => ativo && setUsuario(u))
      .catch((e: unknown) => {
        if (!ativo) return;
        if (e instanceof ErroHttp && e.status === 401) {
          sair(); // sessão expirada: volta para a tela de login
          return;
        }
        setErro(e instanceof Error ? e.message : 'Erro');
      });
    return () => {
      ativo = false;
    };
  }, [token, sair]);

  // Sem token, o usuário é sempre null (valor derivado, sem setState no efeito).
  return { usuario: token ? usuario : null, erro };
}
