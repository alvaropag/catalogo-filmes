// Service (Model): acesso à API.
// Nenhuma tela faz fetch diretamente.
// A lista de filmes é pública (não exige token); o mesmo formato do reactnative.dev/movies.json.
import type { Filme } from '../models/Filme';
import { getJson } from './api';

type MovieApi = { id: string; title: string; releaseYear: string };
type MoviesResponse = {
  title: string;
  description: string;
  movies: MovieApi[];
};

export async function buscarFilmes(): Promise<Filme[]> {
  const json = await getJson<MoviesResponse>('/movies');
  return json.movies.map((m) => ({
    id: m.id,
    titulo: m.title,
    ano: Number(m.releaseYear),
  }));
}
