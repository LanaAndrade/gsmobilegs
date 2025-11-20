import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { theme } from '../theme';

type Course = {
  id: string;
  title: string;
  xp: number;
  done: boolean;
};

export default function MicroCoursesScreen({ navigation }: any) {
  const [courses, setCourses] = React.useState<Course[]>([
    { id: '1', title: 'Introdução à IA generativa', xp: 150, done: true },
    { id: '2', title: 'Sustentabilidade na prática', xp: 100, done: false },
    { id: '3', title: 'Comunicação empática', xp: 120, done: false },
  ]);

  function handleCompleteCourse(courseId: string) {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId ? { ...course, done: true } : course,
      ),
    );

    const course = courses.find((c) => c.id === courseId);
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

      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
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
    marginBottom: 16,
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
    color: '#020617',
    fontWeight: '700',
  },
});
