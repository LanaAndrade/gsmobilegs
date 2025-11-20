import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../theme';

type Course = {
  id: string;
  title: string;
  xp: number;
  done: boolean;
  area: string;
};

const ALL_COURSES: Course[] = [
  { id: '1', title: 'Introdução à IA Generativa', xp: 150, done: false, area: 'Data Science' },
  { id: '2', title: 'Fundamentos de Machine Learning', xp: 180, done: false, area: 'Data Science' },
  { id: '3', title: 'Pensamento Analítico para Dados', xp: 120, done: false, area: 'Data Science' },

  { id: '4', title: 'O que é DevOps?', xp: 140, done: false, area: 'Engenharia de Software' },
  { id: '5', title: 'Ciclo CI/CD em 15 minutos', xp: 160, done: false, area: 'Engenharia de Software' },
  { id: '6', title: 'Introdução ao Docker', xp: 180, done: false, area: 'Engenharia de Software' },
  { id: '7', title: 'Noções básicas de Cloud AWS', xp: 150, done: false, area: 'Engenharia de Software' },

  { id: '8', title: 'Fundamentos de UX Design', xp: 130, done: false, area: 'UX/UI Design' },
  { id: '9', title: 'UI para iniciantes: Tipografia', xp: 110, done: false, area: 'UX/UI Design' },
  { id: '10', title: 'Criando Wireframes Rápidos', xp: 150, done: false, area: 'UX/UI Design' },

  { id: '11', title: 'Comunicação Empática', xp: 120, done: false, area: 'Geral' },
  { id: '12', title: 'Produtividade para Devs', xp: 100, done: false, area: 'Geral' },
  { id: '13', title: 'Resolução de Problemas', xp: 130, done: false, area: 'Geral' },

  { id: '14', title: 'Introdução à Gestão de Projetos', xp: 180, done: false, area: 'Gestão de Projetos' },
  { id: '15', title: 'Liderança para Iniciantes', xp: 170, done: false, area: 'Gestão de Projetos' },
  { id: '16', title: 'Métodos Ágeis e Scrum', xp: 160, done: false, area: 'Gestão de Projetos' },

  { id: '17', title: 'Lógica de Programação', xp: 140, done: false, area: 'Engenharia de Software' },
  { id: '18', title: 'Git e GitHub em 30 min', xp: 160, done: false, area: 'Engenharia de Software' },
  { id: '19', title: 'Introdução ao JavaScript', xp: 150, done: false, area: 'Engenharia de Software' },
  { id: '20', title: 'APIs para Iniciantes', xp: 150, done: false, area: 'Engenharia de Software' },
];

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

export default function Courses({ navigation }: any) {
  const [career, setCareer] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function load() {
      const stored = await AsyncStorage.getItem('result');

      if (stored) {
        setCareer(stored);
        const recTitles = COURSE_RECOMMENDATIONS[stored] ?? [];

        let filtered: Course[];

        if (recTitles.length > 0) {
          filtered = ALL_COURSES.filter(
            c => recTitles.includes(c.title) || c.area === 'Geral',
          );
        } else {
          filtered = ALL_COURSES.filter(
            c => c.area === stored || c.area === 'Geral',
          );
        }

        if (filtered.length === 0) {
          filtered = ALL_COURSES;
        }

        setCourses(filtered);
      } else {
        setCareer(null);
        setCourses(ALL_COURSES);
      }
    }

    const unsubscribe = navigation.addListener('focus', load);
    load();
    return unsubscribe;
  }, [navigation]);

  function handleCompleteCourse(courseId: string) {
    setCourses(prev =>
      prev.map(course =>
        course.id === courseId ? { ...course, done: true } : course,
      ),
    );

    const course = courses.find(c => c.id === courseId);
    if (course) {
      Alert.alert(
        'Concluído',
        `Você completou o curso e ganhou ${course.xp} XP.`,
      );
    }
  }

  function goToProgress() {
    navigation.navigate('Progresso');
  }

  const renderItem = ({ item }: { item: Course }) => (
    <TouchableOpacity
      style={[styles.card, item.done && styles.cardDone]}
      onPress={() => {
        if (!item.done) {
          handleCompleteCourse(item.id);
        }
      }}
      disabled={item.done}
    >
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardXP}>{item.xp} XP</Text>
      <Text style={styles.cardStatus}>
        {item.done ? 'Concluído' : 'Toque para marcar como concluído'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Microcursos</Text>
      <Text style={styles.subtitle}>
        Use esses cursos rápidos para testar áreas antes de mergulhar em trilhas mais longas.
      </Text>

      {career && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{career}</Text>
        </View>
      )}

      <FlatList
        data={courses}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity style={styles.button} onPress={goToProgress}>
        <Text style={styles.buttonText}>Ver meu progresso</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: 12,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.action,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderColor: '#E5E7EB',
    borderWidth: 1,
  },
  cardDone: {
    opacity: 0.7,
  },
  cardTitle: {
    fontWeight: '700',
    color: theme.colors.cardText,
    marginBottom: 4,
  },
  cardXP: {
    color: theme.colors.action,
    fontWeight: '700',
  },
  cardStatus: {
    color: '#4B5563',
    marginTop: 4,
    fontSize: 13,
  },
  button: {
    backgroundColor: theme.colors.action,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
