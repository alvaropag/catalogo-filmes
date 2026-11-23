// Contexto global de favoritos (compartilhado entre as telas)
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { carregarFavoritos, salvarFavoritos } from '../services/favoritosStorage';

type FavoritosContextValue = {
  favoritos: string[];
  ehFavorito: (id: string) => boolean;
  alternarFavorito: (id: string) => void;
};

const FavoritosContext = createContext<FavoritosContextValue | null>(null);

export function FavoritosProvider({ children }: { children: ReactNode }) {
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [carregado, setCarregado] = useState(false);

  // carrega do AsyncStorage ao abrir o app
  useEffect(() => {
    carregarFavoritos()
      .then(setFavoritos)
      .finally(() => setCarregado(true));
  }, []);

  // salva sempre que a lista mudar (depois de carregada)
  useEffect(() => {
    if (carregado) salvarFavoritos(favoritos);
  }, [favoritos, carregado]);

  const ehFavorito = (id: string) => favoritos.includes(id);
  const alternarFavorito = (id: string) =>
    setFavoritos((atual) =>
      atual.includes(id) ? atual.filter((f) => f !== id) : [...atual, id],
    );

  return (
    <FavoritosContext value={{ favoritos, ehFavorito, alternarFavorito }}>
      {children}
    </FavoritosContext>
  );
}

export function useFavoritos(): FavoritosContextValue {
  const ctx = useContext(FavoritosContext);
  if (!ctx) throw new Error('useFavoritos deve ser usado dentro de FavoritosProvider');
  return ctx;
}
