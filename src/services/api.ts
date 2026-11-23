// Configuração da API (catalogo-filmes-api).
//
// A URL vem do .env (raiz do projeto): EXPO_PUBLIC_API_URL=http://localhost:3000
// Variáveis EXPO_PUBLIC_ são copiadas para dentro do app, em texto puro:
// use só para dados NÃO sensíveis. O segredo do JWT fica SOMENTE no servidor.
//
// Onde "localhost" funciona:
//   - Web (tecla "w") e simulador iOS: http://localhost:3000
//   - Emulador Android:               http://10.0.2.2:3000
//   - Celular físico (Expo Go):       http://<IP-do-seu-computador>:3000
export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';

/** Erro de resposta HTTP, com o status para o chamador decidir o que fazer (ex.: 401 -> sair). */
export class ErroHttp extends Error {
  constructor(public status: number) {
    super(`Erro HTTP ${status}`);
  }
}

/** GET que devolve JSON tipado; se houver token, envia "Authorization: Bearer <token>". */
export async function getJson<T>(caminho: string, token?: string): Promise<T> {
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const resposta = await fetch(`${API_URL}${caminho}`, { headers });
  if (!resposta.ok) throw new ErroHttp(resposta.status);
  return (await resposta.json()) as T;
}
