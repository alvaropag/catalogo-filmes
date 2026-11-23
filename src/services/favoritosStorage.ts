// Persistência local (dados NÃO sensíveis) com AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE = '@catalogo/favoritos';

export async function carregarFavoritos(): Promise<string[]> {
  const json = await AsyncStorage.getItem(CHAVE);
  return json ? (JSON.parse(json) as string[]) : [];
}

export async function salvarFavoritos(ids: string[]): Promise<void> {
  await AsyncStorage.setItem(CHAVE, JSON.stringify(ids));
}
