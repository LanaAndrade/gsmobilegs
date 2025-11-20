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
    text: 'Quando você pensa em trabalho, o que mais te anima?',
    options: [
      { key: 'q1_software', label: 'Construir sistemas e automatizar coisas' },
      { key: 'q1_ux', label: 'Criar interfaces bonitas e intuitivas' },
      { key: 'q1_data', label: 'Mexer com números, gráficos e dados' },
      { key: 'q1_gestao', label: 'Organizar equipes, prazos e entregas' },
    ],
  },
  {
    id: 'q2',
    text: 'Qual atividade você preferiria fazer por duas horas seguidas?',
    options: [
      { key: 'q2_software', label: 'Programar um recurso novo em um app' },
      { key: 'q2_ux', label: 'Desenhar protótipos de tela' },
      { key: 'q2_data', label: 'Explorar dados e buscar padrões' },
      { key: 'q2_gestao', label: 'Planejar tarefas de um projeto' },
    ],
  },
  {
    id: 'q3',
    text: 'Qual dessas frases parece mais com você?',
    options: [
      { key: 'q3_software', label: 'Gosto de entender como as coisas funcionam por dentro' },
      { key: 'q3_ux', label: 'Gosto de tornar algo mais agradável de usar' },
      { key: 'q3_data', label: 'Gosto de descobrir o porquê das coisas com dados' },
      { key: 'q3_gestao', label: 'Gosto de coordenar pessoas e decisões' },
    ],
  },
  {
    id: 'q4',
    text: 'Se tivesse que escolher um curso agora, qual escolheria primeiro?',
    options: [
      { key: 'q4_software', label: 'Desenvolvimento de APIs / Programação' },
      { key: 'q4_ux', label: 'Design de interface / Figma' },
      { key: 'q4_data', label: 'Análise de dados / Machine Learning' },
      { key: 'q4_gestao', label: 'Gestão Ágil / Liderança' },
    ],
  },
  {
    id: 'q5',
    text: 'Em um trabalho em grupo, qual papel você assume naturalmente?',
    options: [
      { key: 'q5_software', label: 'Quem implementa e resolve bugs' },
      { key: 'q5_ux', label: 'Quem cuida da parte visual e da experiência' },
      { key: 'q5_data', label: 'Quem analisa resultados e métricas' },
      { key: 'q5_gestao', label: 'Quem organiza as entregas e prazos' },
    ],
  },
  {
    id: 'q6',
    text: 'O que é mais prazeroso para você?',
    options: [
      { key: 'q6_software', label: 'Resolver um problema complexo com lógica' },
      { key: 'q6_ux', label: 'Criar algo visual que as pessoas gostem de usar' },
      { key: 'q6_data', label: 'Descobrir um insight interessante em dados' },
      { key: 'q6_gestao', label: 'Ver um plano dar certo com a equipe' },
    ],
  },
  {
    id: 'q7',
    text: 'Qual dessas ferramentas você teria mais vontade de aprender primeiro?',
    options: [
      { key: 'q7_software', label: 'Node.js, Java, GitHub' },
      { key: 'q7_ux', label: 'Figma, Design System' },
      { key: 'q7_data', label: 'SQL, Power BI, Pandas' },
      { key: 'q7_gestao', label: 'Notion, Jira, Kanban' },
    ],
  },
  {
    id: 'q8',
    text: 'Como você costuma tomar decisões no trabalho ou estudo?',
    options: [
      { key: 'q8_software', label: 'Testo, erro, ajusto e tento de novo' },
      { key: 'q8_ux', label: 'Faço rascunhos e comparo ideias visuais' },
      { key: 'q8_data', label: 'Busco dados antes de decidir' },
      { key: 'q8_gestao', label: 'Converso com as pessoas e defino prioridades' },
    ],
  },
];

export default function Quiz({ navigation }: any) {
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

    const scores = {
      software: 0,
      ux: 0,
      data: 0,
      gestao: 0,
    };

    const scoringMap: Record<string, keyof typeof scores> = {
      q1_software: 'software',
      q2_software: 'software',
      q3_software: 'software',
      q4_software: 'software',
      q5_software: 'software',
      q6_software: 'software',
      q7_software: 'software',
      q8_software: 'software',

      q1_ux: 'ux',
      q2_ux: 'ux',
      q3_ux: 'ux',
      q4_ux: 'ux',
      q5_ux: 'ux',
      q6_ux: 'ux',
      q7_ux: 'ux',
      q8_ux: 'ux',

      q1_data: 'data',
      q2_data: 'data',
      q3_data: 'data',
      q4_data: 'data',
      q5_data: 'data',
      q6_data: 'data',
      q7_data: 'data',
      q8_data: 'data',

      q1_gestao: 'gestao',
      q2_gestao: 'gestao',
      q3_gestao: 'gestao',
      q4_gestao: 'gestao',
      q5_gestao: 'gestao',
      q6_gestao: 'gestao',
      q7_gestao: 'gestao',
      q8_gestao: 'gestao',
    };

    values.forEach((answer) => {
      const area = scoringMap[answer];
      if (area) {
        scores[area] += 1;
      }
    });

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const bestKey = sorted[0][0] as keyof typeof scores;

    const result =
      bestKey === 'software'
        ? 'Engenharia de Software'
        : bestKey === 'ux'
        ? 'UX/UI Design'
        : bestKey === 'data'
        ? 'Data Science'
        : 'Gestão de Projetos';

    await AsyncStorage.setItem('result', result);
    navigation.navigate('Recomendacoes');
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
    color: theme.colors.text,
    fontSize: 13,
  },
  optionTextActive: {
    color: '#FFFFFF',
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
