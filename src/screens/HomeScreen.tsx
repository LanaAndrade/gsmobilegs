import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { theme } from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }: any) {
  const [userName, setUserName] = useState('Lana');
  const [progress, setProgress] = useState(0.75);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const { name } = JSON.parse(userData);
        setUserName(name.split(' ')[0]);
      }

      const profile = await AsyncStorage.getItem('profile');
      if (profile) {
        const { progress } = JSON.parse(profile);
        setProgress(progress || 0.75);
      }
    })();

    // Animação de fade-in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Bem-vinda, {userName} 👋</Text>
      <Text style={styles.subtitle}>Continue de onde parou</Text>

      <Animated.View style={[styles.row, { opacity: fadeAnim }]}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Painel')}>
          <Text style={styles.cardTitle}>Meu Perfil</Text>
          <Text style={styles.cardDesc}>Complete seus dados</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Painel', { screen: 'Teste' })}>
          <Text style={styles.cardTitle}>Teste de Carreira</Text>
          <Text style={styles.cardDesc}>Leva 2 minutos</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        <Text style={styles.cardTitle}>Seu Progresso</Text>
        <View style={styles.progressWrap}>
          <View style={[styles.progressBar, { width: `${Math.round(progress * 100)}%` }]} />
        </View>
        <Text style={styles.cardDesc}>{Math.round(progress * 100)}% completo</Text>
      </Animated.View>

      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        <Text style={styles.cardTitle}>Novas trilhas</Text>
        <Text style={styles.cardDesc}>Aprendizado rápido com foco no seu perfil</Text>
        <TouchableOpacity style={styles.cta} onPress={() => navigation.navigate('Painel', { screen: 'Recomendações' })}>
          <Text style={{ color: '#fff', fontWeight: '700' }}>Ver recomendações</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        <Text style={styles.cardTitle}>Dica do Dia</Text>
        <Text style={styles.cardDesc}>A prática constante é a chave para dominar novas habilidades. Dedique 15 minutos por dia para aprender algo novo.</Text>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: theme.colors.background },
  title: { fontSize: 22, fontWeight: '700', color: theme.colors.text },
  subtitle: { color: '#566', marginBottom: 12 },
  row: { flexDirection: 'row', gap: 12 },
  card: { flex: 1, backgroundColor: theme.colors.card, borderRadius: 16, padding: 16, marginVertical: 8, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: '700', marginTop: 8 },
  cardDesc: { color: '#556', marginTop: 4 },
  cta: { alignSelf: 'flex-start', backgroundColor: theme.colors.action, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, marginTop: 12 },
  progressWrap: { height: 10, backgroundColor: theme.colors.muted, borderRadius: 10, overflow: 'hidden', marginVertical: 8 },
  progressBar: { height: '100%', backgroundColor: theme.colors.action },
});