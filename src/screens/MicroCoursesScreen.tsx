import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { theme } from '../theme';
import NotificationService from '../services/NotificationService';

export default function MicroCoursesScreen() {
  const [courses, setCourses] = React.useState([
    { id: '1', title: 'Introdução à IA Generativa', xp: 150, done: true },
    { id: '2', title: 'Sustentabilidade na Prática', xp: 100, done: false },
    { id: '3', title: 'Comunicação Empática', xp: 120, done: false },
  ]);

  const handleCompleteCourse = (courseId: string) => {
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === courseId ? { ...course, done: true } : course
      )
    );

    const course = courses.find(c => c.id === courseId);
    if (course) {
      NotificationService.addNotification({
        title: 'Curso Concluído! 🎉',
        message: `Você completou o curso "${course.title}" e ganhou ${course.xp} XP!`,
        type: 'success',
      });
    }

    Alert.alert('Parabéns!', `Você completou o curso e ganhou ${course?.xp} XP!`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Microcursos Gamificados</Text>
      <FlatList
        data={courses}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.card, item.done && { opacity: 0.7 }]}
            onPress={() => !item.done && handleCompleteCourse(item.id)}
            disabled={item.done}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardXP}>{item.xp} XP</Text>
            <Text style={styles.cardStatus}>
              {item.done ? '✅ Concluído' : '🎯 Toque para concluir'}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 16 },
  title: { fontSize: 22, fontWeight: '700', color: theme.colors.text, marginBottom: 16 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, borderColor: theme.colors.muted, borderWidth: 1 },
  cardTitle: { fontWeight: '700', color: theme.colors.text, marginBottom: 4 },
  cardXP: { color: theme.colors.action, fontWeight: '700' },
  cardStatus: { color: '#666', marginTop: 4 },
});