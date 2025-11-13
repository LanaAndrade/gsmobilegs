import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Q = { id: string; text: string; options: { key: string; label: string }[] };

const QUESTIONS: Q[] = [
  { id: 'q1', text: 'Você prefere resolver problemas técnicos ou lidar com pessoas?', options: [
    { key: 'tecnico', label: 'Técnico' }, { key: 'pessoas', label: 'Pessoas' }
  ]},
  { id: 'q2', text: 'Como você reage a tarefas repetitivas?', options: [
    { key: 'otimiza', label: 'Automatizo o que der' }, { key: 'rotina', label: 'A rotina não me incomoda' }
  ]},
  { id: 'q3', text: 'O que te motiva mais?', options: [
    { key: 'criativo', label: 'Criar algo novo' }, { key: 'analitico', label: 'Analisar dados e métricas' }
  ]},
  { id: 'q4', text: 'Em um projeto, qual papel te atrai?', options: [
    { key: 'lider', label: 'Coordenar pessoas' }, { key: 'maker', label: 'Mão na massa (código/entregas)' }
  ]},
  { id: 'q5', text: 'Quão confortável com ambiguidade?', options: [
    { key: 'alta', label: 'Muito confortável' }, { key: 'baixa', label: 'Prefiro requisitos claros' }
  ]},
  { id: 'q6', text: 'Interessado(a) em UX/UI?', options: [
    { key: 'simux', label: 'Sim, bastante' }, { key: 'nao', label: 'Não tanto' }
  ]},
  { id: 'q7', text: 'Interesse em dados/IA?', options: [
    { key: 'dados', label: 'Amo trabalhar com dados/IA' }, { key: 'neutro', label: 'Neutro' }
  ]},
  { id: 'q8', text: 'Cloud & DevOps te animam?', options: [
    { key: 'devops', label: 'Sim, muito' }, { key: 'pouco', label: 'Pouco' }
  ]}
];

export default function TestScreen({ navigation }: any) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('answers');
      if (saved) setAnswers(JSON.parse(saved));
    })();
  }, []);

  const select = (qid: string, key: string) => {
    setAnswers(prev => ({ ...prev, [qid]: key }));
  };

  const submit = async () => {
    await AsyncStorage.setItem('answers', JSON.stringify(answers));

    // IA simples (heurística)
    const values = Object.values(answers);
    let result = '';
    if (values.includes('tecnico') || values.includes('maker') || values.includes('devops')) {
      result = 'Engenharia de Software';
    } else if (values.includes('criativo') || values.includes('simux')) {
      result = 'UX/UI Design';
    } else if (values.includes('dados') || values.includes('analitico')) {
      result = 'Data Science';
    } else if (values.includes('lider') || values.includes('pessoas')) {
      result = 'Gestão de Projetos';
    } else {
      result = 'Análise de Sistemas';
    }
    await AsyncStorage.setItem('result', result);
    navigation.navigate('Recomendações');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Teste de Carreira</Text>
      {QUESTIONS.map(q => (
        <View key={q.id} style={styles.card}>
          <Text style={styles.qtext}>{q.text}</Text>
          <View style={styles.chips}>
            {q.options.map(opt => {
              const active = answers[q.id] === opt.key;
              return (
                <TouchableOpacity
                  key={opt.key}
                  onPress={() => select(q.id, opt.key)}
                  style={[styles.chip, active && { backgroundColor: theme.colors.action }]}
                >
                  <Text style={[styles.chipText, active && { color: '#fff' }]}>{opt.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>Enviar respostas</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 16 },
  title: { fontSize: 22, fontWeight: '700', color: theme.colors.text, marginBottom: 8 },
  card: { backgroundColor: theme.colors.card, borderRadius: 16, padding: 16, marginVertical: 8 },
  qtext: { fontSize: 16, fontWeight: '600', color: theme.colors.text },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: 24, backgroundColor: '#eef' },
  chipText: { color: theme.colors.text },
  button: { backgroundColor: theme.colors.primary, padding: 14, borderRadius: 12, alignItems: 'center', marginVertical: 12 },
  buttonText: { color: '#fff', fontWeight: '700' }
});
