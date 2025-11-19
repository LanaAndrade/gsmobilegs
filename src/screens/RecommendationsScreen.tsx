import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../theme';

export default function RecommendationsScreen({ navigation }: any) {
  const [career, setCareer] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const stored = await AsyncStorage.getItem('result');
        if (stored) {
          setCareer(stored);
        } else {
          setCareer(null);
        }
      } catch (e) {
        setCareer(null);
      } finally {
        setLoading(false);
      }
    }
    const unsubscribe = navigation.addListener('focus', load);
    load();
    return unsubscribe;
  }, [navigation]);

  const hasCareer = !!career && !loading;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Recomendações</Text>
      <Text style={styles.subtitle}>
        Aqui você vê uma sugestão de área com base nas respostas do teste de carreira.
      </Text>

      <View style={styles.card}>
        {loading && (
          <Text style={styles.infoText}>Carregando recomendação...</Text>
        )}

        {!loading && !hasCareer && (
          <View>
            <Text style={styles.infoText}>
              Ainda não encontramos uma recomendação ativa.
            </Text>
            <Text style={styles.infoText}>
              Faça o teste de carreira para gerar uma sugestão personalizada.
            </Text>
            <TouchableOpacity
              style={styles.buttonGhost}
              onPress={() => navigation.navigate('Teste')}
            >
              <Text style={styles.buttonGhostText}>Ir para o teste</Text>
            </TouchableOpacity>
          </View>
        )}

        {hasCareer && (
          <View>
            <Text style={styles.sectionLabel}>Área sugerida</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{career}</Text>
            </View>

            <Text style={styles.description}>
              Essa área foi sugerida com base nas suas preferências sobre tipo de trabalho,
              interesses e forma de atuar em projetos. Use isso como um ponto de partida
              para explorar trilhas, microcursos e conteúdos relacionados.
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Microcursos')}
            >
              <Text style={styles.buttonText}>Ver microcursos relacionados</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 16,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 16,
  },
  infoText: {
    fontSize: 14,
    color: theme.colors.cardText,
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.cardText,
    marginBottom: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.action,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 16,
  },
  button: {
    backgroundColor: theme.colors.action,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  buttonGhost: {
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.muted,
    alignItems: 'center',
    backgroundColor: theme.colors.card,
  },
  buttonGhostText: {
    color: theme.colors.cardText,
    fontWeight: '700',
    fontSize: 14,
  },
});
