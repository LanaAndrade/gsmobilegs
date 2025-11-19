import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { theme } from '../theme';

type ProgressItem = {
  id: string;
  title: string;
  value: number;
};

export default function ProgressScreen({ navigation }: any) {
  const [progress] = useState<ProgressItem[]>([
    { id: '1', title: 'Trilha IA e automação', value: 0.8 },
    { id: '2', title: 'Sustentabilidade e inovação', value: 0.5 },
    { id: '3', title: 'Soft skills e liderança', value: 0.3 },
  ]);

  function goToRecommendations() {
    navigation.navigate('Recomendações');
  }

  const renderItem = ({ item }: { item: ProgressItem }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <View style={styles.barWrap}>
        <View
          style={[
            styles.barFill,
            { width: `${Math.round(item.value * 100)}%` },
          ]}
        />
      </View>
      <Text style={styles.percent}>
        {Math.round(item.value * 100)}% concluído
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progresso pessoal</Text>
      <FlatList
        data={progress}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity style={styles.button} onPress={goToRecommendations}>
        <Text style={styles.buttonText}>Ver recomendações</Text>
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
    marginBottom: 16,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontWeight: '700',
    color: theme.colors.cardText,
    marginBottom: 8,
  },
  barWrap: {
    height: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: theme.colors.action,
  },
  percent: {
    marginTop: 4,
    color: '#4B5563',
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
