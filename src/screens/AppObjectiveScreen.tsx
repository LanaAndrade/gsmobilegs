// src/screens/AppObjectiveScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../theme';

export default function AppObjectiveScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.title}>🎯 Objetivo do Aplicativo</Text>

      <Text style={styles.paragraph}>
        O CareerMatch+ tem como propósito oferecer uma plataforma móvel que promova o
        autoconhecimento e a qualificação profissional por meio da tecnologia.
      </Text>

      <Text style={styles.sectionTitle}>Principais objetivos:</Text>

      <View style={styles.bullet}>
        <Text style={styles.bulletDot}>•</Text>
        <Text style={styles.bulletText}>Realizar autoavaliação de competências.</Text>
      </View>

      <View style={styles.bullet}>
        <Text style={styles.bulletDot}>•</Text>
        <Text style={styles.bulletText}>Acompanhar trilhas de aprendizado em áreas emergentes — como IA, sustentabilidade e soft skills.</Text>
      </View>

      <View style={styles.bullet}>
        <Text style={styles.bulletDot}>•</Text>
        <Text style={styles.bulletText}>Monitorar o progresso pessoal e gerar recomendações personalizadas de carreira e estudo.</Text>
      </View>

      <View style={styles.bullet}>
        <Text style={styles.bulletDot}>•</Text>
        <Text style={styles.bulletText}>Facilitar a inclusão digital e produtiva por meio de microcursos gamificados.</Text>
      </View>

      <Text style={[styles.paragraph, { marginTop: 16 }]}>
        Esse aplicativo busca unir autoconhecimento, educação continuada e tecnologia, ajudando cada usuário a trilhar o caminho ideal de desenvolvimento profissional.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  title: { fontSize: 22, fontWeight: '700', color: theme.colors.text, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.text, marginTop: 12, marginBottom: 8 },
  paragraph: { fontSize: 15, color: '#444', marginBottom: 12, lineHeight: 22 },
  bullet: { flexDirection: 'row', alignItems: 'flex-start', marginVertical: 4 },
  bulletDot: { fontSize: 18, color: theme.colors.action, marginRight: 8 },
  bulletText: { flex: 1, color: '#333', fontSize: 15, lineHeight: 22 },
});
