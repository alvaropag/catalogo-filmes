// Service: autenticação com JWT na catalogo-filmes-api.
//
//   POST /auth/login  { username, password }  ->  { id, username, name, accessToken }
//   GET  /auth/me     Authorization: Bearer <accessToken>  ->  { id, username, name }
//
// O accessToken é um JWT assinado pelo SERVIDOR (o app nunca conhece o segredo).
// Usuário de teste (seed da API): aluno / aluno123
import type { Usuario } from '../models/Usuario';
import { API_URL, ErroHttp, getJson } from './api';

type RespostaLoginApi = { accessToken: string };
type UsuarioApi = { id: number; username: string; name: string };

/** Faz o login e devolve o JWT. Lança erro se usuário/senha estiverem errados. */
export async function login(usuario: string, senha: string): Promise<string> {
  const resposta = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: usuario, password: senha }),
  });
  if (resposta.status === 400) throw new Error('Usuário ou senha inválidos');
  if (!resposta.ok) throw new ErroHttp(resposta.status);
  return ((await resposta.json()) as RespostaLoginApi).accessToken;
}

/** Dados do dono do token (rota protegida). Responde 401 se o JWT for inválido ou expirou. */
export async function buscarUsuarioLogado(token: string): Promise<Usuario> {
  const u = await getJson<UsuarioApi>('/auth/me', token);
  return { id: u.id, usuario: u.username, nome: u.name };
}
