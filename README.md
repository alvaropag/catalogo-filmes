# Catálogo de Filmes — gabarito da prática (Aula 9)

Expo SDK 57 · React Native 0.86 · TypeScript (strict) · Expo Router

```bash
cp .env.example .env   # URL da API (veja os comentários do arquivo)
npm install
npx expo start      # a = Android (Expo Go), w = Web
npx tsc --noEmit    # verificação de tipos
```

Estrutura (MVVM + camadas):

- `src/models/` — Model (tipos)
- `src/services/` — Model (API, AsyncStorage, SecureStore)
- `src/hooks/` — ViewModel (`useFilmes`)
- `src/context/` — favoritos compartilhados (Context + AsyncStorage)
- `src/components/` e `src/app/` — View (telas/rotas)

## Login com JWT

O app conversa com a `catalogo-filmes-api` (suba a API antes: `npm run seed` e `npm run dev`).

- `POST /auth/login` devolve o `accessToken` (JWT assinado pelo servidor); o app o guarda no
  `expo-secure-store` (na Web, só em memória).
- O token vai em `Authorization: Bearer <token>` (ex.: `GET /auth/me`, rota protegida).
- Se a API responder `401` (token inválido ou expirado), o app faz logout automático.
- Usuário de teste da seed: `aluno` / `aluno123`.
- `src/services/api.ts`, `authService.ts` e `authStorage.ts` (services), `src/context/AuthContext.tsx`
  (sessão) e `src/hooks/useUsuarioLogado.ts` (ViewModel).
