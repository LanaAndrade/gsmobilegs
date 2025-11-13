// src/screens/ProgressScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { theme } from '../theme';

export default function ProgressScreen() {
  const [progress, setProgress] = useState([
    { id: '1', title: 'Trilha IA e Automação', value: 0.8 },
    { id: '2', title: 'Sustentabilidade e Inovação', value: 0.5 },
    { id: '3', title: 'Soft Skills e Liderança', value: 0.3 },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Progresso Pessoal</Text>
      <FlatList
        data={progress}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <View style={styles.barWrap}>
              <View style={[styles.barFill, { width: `${item.value * 100}%` }]} />
            </View>
            <Text style={styles.percent}>{Math.round(item.value * 100)}% concluído</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Ver Recomendações</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 16 },
  title: { fontSize: 22, fontWeight: '700', color: theme.colors.text, marginBottom: 16 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12 },
  cardTitle: { fontWeight: '700', color: theme.colors.text, marginBottom: 8 },
  barWrap: { height: 10, backgroundColor: theme.colors.muted, borderRadius: 10, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: theme.colors.action },
  percent: { marginTop: 4, color: '#555', fontSize: 13 },
  button: { backgroundColor: theme.colors.action, padding: 12, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontWeight: '700' },
});
