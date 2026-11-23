import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { FavoritosProvider } from '../context/FavoritosContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <FavoritosProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Filmes' }} />
          <Stack.Screen name="filme/[id]" options={{ title: 'Detalhes' }} />
          <Stack.Screen name="login" options={{ title: 'Conta' }} />
        </Stack>
      </FavoritosProvider>
    </AuthProvider>
  );
}
