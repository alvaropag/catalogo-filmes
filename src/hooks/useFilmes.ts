// ViewModel: estado e ações da tela de filmes
import { useCallback, useEffect, useState } from 'react';
import type { Filme } from '../models/Filme';
import { buscarFilmes } from '../services/filmeService';

export function useFilmes() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const recarregar = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      setFilmes(await buscarFilmes());
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro desconhecido');
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    recarregar();
  }, [recarregar]);

  return { filmes, carregando, erro, recarregar };
}
