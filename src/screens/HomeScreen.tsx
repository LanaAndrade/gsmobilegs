import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { theme } from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }: any) {
  const [userName, setUserName] = useState('Lana');
  const [progress, setProgress] = useState(0.75);

  useEffect(() => {
    async function loadData() {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsed = JSON.parse(userData);
        if (parsed?.name) {
          setUserName(parsed.name.split(' ')[0]);
        }
      }

      const profile = await AsyncStorage.getItem('profile');
      if (profile) {
        const parsedProfile = JSON.parse(profile);
        const value = parsedProfile.progress;
        setProgress(typeof value === 'number' ? value : 0.75);
      }
    }

    loadData();
  }, []);

  const progressPercent = Math.round(progress * 100);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Bem-vinda, {userName}</Text>
      <Text style={styles.subtitle}>Continue de onde parou</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.cardHalf}
          onPress={() => navigation.navigate('Perfil')}
        >
          <Text style={styles.cardTitle}>Meu perfil</Text>
          <Text style={styles.cardDesc}>Veja e edite seus dados</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cardHalf}
          onPress={() => navigation.navigate('Teste')}
        >
          <Text style={styles.cardTitle}>Teste de carreira</Text>
          <Text style={styles.cardDesc}>Leva poucos minutos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Seu progresso</Text>
        <View style={styles.progressWrap}>
          <View style={[styles.progressBar, { width: `${progressPercent}%` }]} />
        </View>
        <Text style={styles.cardDesc}>{progressPercent}% completo</Text>

        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.navigate('Progresso')}
        >
          <Text style={styles.linkText}>Ver progresso</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Novas trilhas</Text>
        <Text style={styles.cardDesc}>
          Veja caminhos de aprendizado pensados para o seu perfil.
        </Text>

        <TouchableOpacity
          style={styles.cta}
          onPress={() => navigation.navigate('Recomendações')}
        >
          <Text style={styles.ctaText}>Ver recomendações</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Microcursos</Text>
        <Text style={styles.cardDesc}>
          Explore cursos curtos para testar áreas diferentes antes de se aprofundar.
        </Text>

        <TouchableOpacity
          style={styles.cta}
          onPress={() => navigation.navigate('Microcursos')}
        >
          <Text style={styles.ctaText}>Ver microcursos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sugestão de hoje</Text>
        <Text style={styles.cardDesc}>
          Separe um tempo curto, mas frequente, para estudar. A repetição ajuda muito.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Outras opções</Text>
        <View style={styles.linksRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Sobre o App')}>
            <Text style={styles.smallLink}>Sobre o app</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('ValidateProfile')}>
            <Text style={styles.smallLink}>Validar perfil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.text,
  },
  subtitle: {
    color: '#FFFFFF',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  cardHalf: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
    color: theme.colors.cardText,
  },
  cardDesc: {
    color: '#4B5563',
    marginTop: 4,
    fontSize: 14,
  },
  cta: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.action,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 12,
  },
  ctaText: {
    color: '#020617',
    fontWeight: '700',
  },
  progressWrap: {
    height: 10,
    backgroundColor: theme.colors.muted,
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.colors.action,
  },
  link: {
    marginTop: 8,
  },
  linkText: {
    color: theme.colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  linksRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  smallLink: {
    color: theme.colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
});
