import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../theme';

const COURSE_RECOMMENDATIONS: Record<string, string[]> = {
  'Engenharia de Software': [
    'Git e GitHub em 30 min',
    'Lógica de Programação',
    'Ciclo CI/CD em 15 minutos',
    'Introdução ao JavaScript',
    'APIs para Iniciantes',
  ],
  'UX/UI Design': [
    'Fundamentos de UX Design',
    'UI para iniciantes: Tipografia',
    'Criando Wireframes Rápidos',
    'Comunicação Empática',
  ],
  'Data Science': [
    'Fundamentos de Machine Learning',
    'Pensamento Analítico para Dados',
    'Introdução à IA Generativa',
    'Lógica de Programação',
  ],
  'Gestão de Projetos': [
    'Introdução à Gestão de Projetos',
    'Métodos Ágeis e Scrum',
    'Comunicação Empática',
    'Resolução de Problemas',
  ],
  'Análise de Sistemas': [
    'Lógica de Programação',
    'Pensamento Analítico para Dados',
    'Git e GitHub em 30 min',
    'APIs para Iniciantes',
  ],
};

export default function Recs({ navigation }: any) {
  const [career, setCareer] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [recommended, setRecommended] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const stored = await AsyncStorage.getItem('result');
        if (stored) {
          setCareer(stored);
          const list = COURSE_RECOMMENDATIONS[stored] ?? [];
          setRecommended(list);
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
      <Text style={styles.title}>Recomendacoes</Text>
      <Text style={styles.subtitle}>
        Área sugerida com base nas respostas do teste.
      </Text>

      <View style={styles.card}>
        {loading && <Text style={styles.infoText}>Carregando recomendação...</Text>}

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
              Use essa área como ponto de partida para explorar conteúdos,
              habilidades e microcursos relacionados.
            </Text>

            <Text style={styles.sectionLabel}>Microcursos recomendados</Text>

            {recommended.map((course, index) => (
              <View key={index} style={styles.recoItem}>
                <Text style={styles.recoText}>• {course}</Text>
              </View>
            ))}

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Microcursos')}
            >
              <Text style={styles.buttonText}>Ver microcursos</Text>
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
  recoItem: {
    marginBottom: 6,
  },
  recoText: {
    color: theme.colors.cardText,
    fontSize: 14,
  },
  button: {
    backgroundColor: theme.colors.action,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
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
