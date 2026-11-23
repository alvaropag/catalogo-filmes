// View: detalhes de um filme (rota dinâmica /filme/:id)
import { Stack, useLocalSearchParams } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useFavoritos } from '../../context/FavoritosContext';
import { useFilmes } from '../../hooks/useFilmes';

export default function DetalhesFilme() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { filmes, carregando } = useFilmes();
  const { ehFavorito, alternarFavorito } = useFavoritos();
  const filme = filmes.find((f) => f.id === id);

  if (carregando) return <Text style={styles.container}>Carregando...</Text>;
  if (!filme) return <Text style={styles.container}>Filme não encontrado.</Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: filme.titulo }} />
      <Text style={styles.titulo}>{filme.titulo}</Text>
      <Text>Ano de lançamento: {filme.ano}</Text>
      <Button
        title={ehFavorito(filme.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        onPress={() => alternarFavorito(filme.id)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  titulo: { fontSize: 24, fontWeight: '700' },
});
