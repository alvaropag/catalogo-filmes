// View: componente reutilizável com props tipadas
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type CartaoFilmeProps = {
  id: string;
  titulo: string;
  ano: number;
  favorito?: boolean;
  onAlternarFavorito: () => void;
};

export function CartaoFilme({ id, titulo, ano, favorito = false, onAlternarFavorito }: CartaoFilmeProps) {
  return (
    <View style={styles.cartao}>
      <Link href={{ pathname: '/filme/[id]', params: { id } }} style={styles.info}>
        <Text style={styles.titulo}>{titulo}</Text>
        {'\n'}
        <Text style={styles.ano}>{ano}</Text>
      </Link>
      <Pressable
        onPress={onAlternarFavorito}
        style={({ pressed }) => [styles.botao, pressed && { opacity: 0.6 }]}
      >
        <Text style={styles.botaoTexto}>{favorito ? '★' : '☆'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
  },
  info: { flex: 1 },
  titulo: { fontSize: 18, fontWeight: '600' },
  ano: { color: '#475569' },
  botao: { padding: 8 },
  botaoTexto: { fontSize: 26, color: '#f59e0b' },
});
