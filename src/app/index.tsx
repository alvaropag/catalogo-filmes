// View: tela de lista. Usa apenas o ViewModel (useFilmes) e o contexto.
import { Link } from 'expo-router';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { CartaoFilme } from '../components/CartaoFilme';
import { useFavoritos } from '../context/FavoritosContext';
import { useFilmes } from '../hooks/useFilmes';

export default function TelaFilmes() {
  const { filmes, carregando, erro, recarregar } = useFilmes();
  const { favoritos, ehFavorito, alternarFavorito } = useFavoritos();

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.centro}>
        <Text>Não foi possível carregar: {erro}</Text>
        <Button title="Tentar novamente" onPress={recarregar} />
      </View>
    );
  }

  return (
    <FlatList
      data={filmes}
      keyExtractor={(f) => f.id}
      ListHeaderComponent={
        <View style={styles.cabecalho}>
          <Text>Favoritos: {favoritos.length}</Text>
          <Link href="/login">Conta</Link>
        </View>
      }
      renderItem={({ item }) => (
        <CartaoFilme
          id={item.id}
          titulo={item.titulo}
          ano={item.ano}
          favorito={ehFavorito(item.id)}
          onAlternarFavorito={() => alternarFavorito(item.id)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  cabecalho: { flexDirection: 'row', justifyContent: 'space-between', padding: 16 },
});
