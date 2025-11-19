import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Question = {
  id: string;
  text: string;
  options: {
    key: string;
    label: string;
  }[];
};

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: 'Você prefere resolver problemas técnicos ou lidar com pessoas?',
    options: [
      { key: 'tecnico', label: 'Técnico' },
      { key: 'pessoas', label: 'Pessoas' },
    ],
  },
  {
    id: 'q2',
    text: 'Como você reage a tarefas repetitivas?',
    options: [
      { key: 'otimiza', label: 'Automatizo o que der' },
      { key: 'rotina', label: 'A rotina não me incomoda' },
    ],
  },
  {
    id: 'q3',
    text: 'O que te motiva mais?',
    options: [
      { key: 'criativo', label: 'Criar algo novo' },
      { key: 'analitico', label: 'Analisar dados e métricas' },
    ],
  },
  {
    id: 'q4',
    text: 'Em um projeto, qual papel te atrai?',
    options: [
      { key: 'lider', label: 'Coordenar pessoas' },
      { key: 'maker', label: 'Mão na massa (código/entregas)' },
    ],
  },
  {
    id: 'q5',
    text: 'Quão confortável você é com ambiguidade?',
    options: [
      { key: 'alta', label: 'Muito confortável' },
      { key: 'baixa', label: 'Prefiro requisitos claros' },
    ],
  },
  {
    id: 'q6',
    text: 'Você se interessa por UX/UI?',
    options: [
      { key: 'simux', label: 'Sim, bastante' },
      { key: 'nao', label: 'Não tanto' },
    ],
  },
  {
    id: 'q7',
    text: 'Você gosta de trabalhar com dados/IA?',
    options: [
      { key: 'dados', label: 'Amo trabalhar com dados/IA' },
      { key: 'neutro', label: 'Sou neutro(a)' },
    ],
  },
  {
    id: 'q8',
    text: 'Cloud e DevOps te animam?',
    options: [
      { key: 'devops', label: 'Sim, muito' },
      { key: 'pouco', label: 'Pouco' },
    ],
  },
];

export default function TestScreen({ navigation }: any) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadAnswers() {
      const saved = await AsyncStorage.getItem('answers');
      if (saved) {
        setAnswers(JSON.parse(saved));
      }
    }
    loadAnswers();
  }, []);

  function handleSelect(questionId: string, optionKey: string) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey,
    }));
  }

  async function handleSubmit() {
    await AsyncStorage.setItem('answers', JSON.stringify(answers));

    const values = Object.values(answers);
    let result = '';

    if (
      values.includes('tecnico') ||
      values.includes('maker') ||
      values.includes('devops')
    ) {
      result = 'Engenharia de Software';
    } else if (
      values.includes('criativo') ||
      values.includes('simux')
    ) {
      result = 'UX/UI Design';
    } else if (
      values.includes('dados') ||
      values.includes('analitico')
    ) {
      result = 'Data Science';
    } else if (
      values.includes('lider') ||
      values.includes('pessoas')
    ) {
      result = 'Gestão de Projetos';
    } else {
      result = 'Análise de Sistemas';
    }

    await AsyncStorage.setItem('result', result);
    navigation.navigate('Recomendações');
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Teste de carreira</Text>
      <Text style={styles.subtitle}>
        Responda com o que mais parece com você agora. Depois vamos usar isso nas recomendações.
      </Text>

      <View style={styles.cardWrapper}>
        {QUESTIONS.map((question) => (
          <View key={question.id} style={styles.card}>
            <Text style={styles.questionText}>{question.text}</Text>
            <View style={styles.optionsRow}>
              {question.options.map((option) => {
                const isActive = answers[question.id] === option.key;

                return (
                  <TouchableOpacity
                    key={option.key}
                    onPress={() => handleSelect(question.id, option.key)}
                    style={[
                      styles.optionChip,
                      isActive && styles.optionChipActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        isActive && styles.optionTextActive,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Enviar respostas</Text>
        </TouchableOpacity>
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
  cardWrapper: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  questionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  optionChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.muted,
    marginRight: 8,
    marginBottom: 8,
  },
  optionChipActive: {
    backgroundColor: theme.colors.action,
  },
  optionText: {
    color: theme.colors.text, // texto branco no chip escuro
    fontSize: 13,
  },
  optionTextActive: {
    color: '#FFFFFF', // texto branco no verde
    fontWeight: '700',
  },
  button: {
    backgroundColor: theme.colors.action,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
    textAlign: 'center',
  },
});
