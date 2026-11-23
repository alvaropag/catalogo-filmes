// Dados sensíveis (o JWT) com expo-secure-store (Keychain / Keystore).
// O SecureStore não existe na Web: lá o token fica só em memória (some ao recarregar).
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const CHAVE_TOKEN = 'token';
let tokenEmMemoria: string | null = null; // usado apenas na Web

export async function salvarToken(token: string): Promise<void> {
  if (Platform.OS === 'web') {
    tokenEmMemoria = token;
    return;
  }
  await SecureStore.setItemAsync(CHAVE_TOKEN, token);
}

export async function lerToken(): Promise<string | null> {
  if (Platform.OS === 'web') return tokenEmMemoria;
  return SecureStore.getItemAsync(CHAVE_TOKEN);
}

export async function removerToken(): Promise<void> {
  if (Platform.OS === 'web') {
    tokenEmMemoria = null;
    return;
  }
  await SecureStore.deleteItemAsync(CHAVE_TOKEN);
}
