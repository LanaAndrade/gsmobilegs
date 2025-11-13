import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { theme } from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Simulação de base de dados de usuários
const USERS_DB = [
  { email: 'lana@email.com', password: '123456', name: 'Lana Andrade' },
  { email: 'admin@careermatch.com', password: 'admin123', name: 'Administrador' },
  { email: 'teste@email.com', password: 'teste123', name: 'Usuário Teste' }
];

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const onLogin = async () => {
    if (!email || !password) {
      return Alert.alert('Erro', 'Preencha email e senha.');
    }

    if (!validateEmail(email)) {
      return Alert.alert('Erro', 'Digite um email válido.');
    }

    if (!validatePassword(password)) {
      return Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
    }

    setIsLoading(true);

    // Simulação de autenticação
    setTimeout(async () => {
      const user = USERS_DB.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Salvar dados do usuário
        await AsyncStorage.setItem('userToken', 'authenticated');
        await AsyncStorage.setItem('userData', JSON.stringify({
          email: user.email,
          name: user.name,
          loginDate: new Date().toISOString()
        }));
        
        Alert.alert('Sucesso', `Bem-vinda, ${user.name}!`);
        navigation.replace('Main');
      } else {
        Alert.alert('Erro', 'Email ou senha incorretos.');
      }
      setIsLoading(false);
    }, 1500);
  };

  const onForgotPassword = () => {
    Alert.alert(
      'Recuperar Senha',
      'Digite seu email para receber instruções de recuperação:',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Enviar',
          onPress: () => Alert.alert('Sucesso', 'Email de recuperação enviado!')
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/96' }} 
          style={{ width: 96, height: 96, marginBottom: 16 }} 
        />
        <Text style={styles.title}>CareerMatch+</Text>
        <Text style={styles.subtitle}>Descubra onde você pode brilhar na sua carreira!</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
        />

        <TouchableOpacity 
          style={[styles.button, isLoading && styles.buttonDisabled]} 
          onPress={onLogin}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotButton} onPress={onForgotPassword}>
          <Text style={styles.forgotText}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <View style={styles.demoAccounts}>
          <Text style={styles.demoTitle}>Contas de Demonstração:</Text>
          <Text style={styles.demoAccount}>lana@email.com / 123456</Text>
          <Text style={styles.demoAccount}>admin@careermatch.com / admin123</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: theme.colors.background, 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 16 
  },
  card: { 
    width: '100%', 
    maxWidth: 420, 
    backgroundColor: theme.colors.card, 
    borderRadius: 16, 
    padding: 20, 
    elevation: 4, 
    alignItems: 'center' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: '700', 
    color: theme.colors.text 
  },
  subtitle: { 
    fontSize: 14, 
    color: '#556', 
    textAlign: 'center', 
    marginVertical: 8 
  },
  input: { 
    width: '100%', 
    backgroundColor: '#fff', 
    borderColor: theme.colors.muted, 
    borderWidth: 1, 
    borderRadius: 12, 
    padding: 12, 
    marginTop: 12,
    fontSize: 16
  },
  button: { 
    width: '100%', 
    backgroundColor: theme.colors.action, 
    padding: 14, 
    borderRadius: 12, 
    marginTop: 16, 
    alignItems: 'center' 
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
    opacity: 0.6
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: '700',
    fontSize: 16
  },
  forgotButton: {
    marginTop: 16,
    padding: 8
  },
  forgotText: {
    color: theme.colors.primary,
    fontSize: 14
  },
  demoAccounts: {
    marginTop: 20,
    padding: 12,
    backgroundColor: theme.colors.muted,
    borderRadius: 8,
    width: '100%'
  },
  demoTitle: {
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 4
  },
  demoAccount: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace'
  }
});