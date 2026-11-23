// View: login com JWT. Envia usuário/senha para POST /auth/login e guarda o token.
// Usuário de teste (seed da catalogo-filmes-api): aluno / aluno123
import { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useUsuarioLogado } from '../hooks/useUsuarioLogado';

export default function TelaLogin() {
  const { token, verificando, entrar, sair } = useAuth();
  const { usuario } = useUsuarioLogado();
  const [usuarioDigitado, setUsuarioDigitado] = useState('aluno');
  const [senha, setSenha] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  if (verificando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  const fazerLogin = async () => {
    setEnviando(true);
    setErro(null);
    try {
      await entrar(usuarioDigitado.trim(), senha);
      setSenha('');
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro ao entrar');
    } finally {
      setEnviando(false);
    }
  };

  if (token) {
    return (
      <View style={styles.container}>
        <Text>Logado{usuario ? ` como ${usuario.nome} (@${usuario.usuario})` : ''}.</Text>
        <Text>O JWT está guardado com segurança no aparelho.</Text>
        <Button title="Sair" onPress={sair} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.dica}>Usuário de teste: aluno / aluno123</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={usuarioDigitado}
        onChangeText={setUsuarioDigitado}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        onSubmitEditing={fazerLogin}
      />
      {erro && <Text style={styles.erro}>{erro}</Text>}
      <Button
        title={enviando ? 'Entrando...' : 'Entrar'}
        onPress={fazerLogin}
        disabled={enviando || !usuarioDigitado.trim() || !senha}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  input: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 10 },
  dica: { color: '#64748b' },
  erro: { color: '#dc2626' },
});
