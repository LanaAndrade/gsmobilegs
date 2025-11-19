import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../theme';

export default function AppObjectiveScreen({ navigation }: any) {
  function goToTest() {
    navigation.navigate('Teste');
  }

  function goToMicroCourses() {
    navigation.navigate('Microcursos');
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Objetivo do aplicativo</Text>

        <Text style={styles.paragraph}>
          O CareerMatch+ foi pensado para ajudar você a entender melhor seu
          perfil, explorar áreas de interesse e acompanhar o seu desenvolvimento
          profissional de um jeito simples.
        </Text>

        <Text style={styles.sectionTitle}>O que você pode fazer aqui</Text>

        <View style={styles.itemRow}>
          <Text style={styles.itemBullet}>•</Text>
          <Text style={styles.itemText}>
            Responder um teste rápido para ter uma visão inicial de possíveis áreas.
          </Text>
        </View>

        <View style={styles.itemRow}>
          <Text style={styles.itemBullet}>•</Text>
          <Text style={styles.itemText}>
            Acompanhar seu progresso em trilhas e microcursos.
          </Text>
        </View>

        <View style={styles.itemRow}>
          <Text style={styles.itemBullet}>•</Text>
          <Text style={styles.itemText}>
            Registrar suas habilidades e interesses em um só lugar.
          </Text>
        </View>

        <View style={styles.itemRow}>
          <Text style={styles.itemBullet}>•</Text>
          <Text style={styles.itemText}>
            Usar as recomendações como apoio para planejar próximos passos.
          </Text>
        </View>

        <Text style={[styles.paragraph, styles.finalParagraph]}>
          A ideia não é definir seu futuro, e sim servir como um apoio para você
          experimentar, se conhecer melhor e tomar decisões com mais clareza.
        </Text>

        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.button} onPress={goToTest}>
            <Text style={styles.buttonText}>Fazer teste de carreira</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={goToMicroCourses}>
            <Text style={styles.secondaryButtonText}>Ver microcursos</Text>
          </TouchableOpacity>
        </View>
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
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.cardText,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.cardText,
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 15,
    color: '#1F2933',
    marginBottom: 12,
    lineHeight: 22,
  },
  finalParagraph: {
    marginTop: 16,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 4,
  },
  itemBullet: {
    fontSize: 18,
    color: theme.colors.action,
    marginRight: 8,
  },
  itemText: {
    flex: 1,
    color: '#1F2933',
    fontSize: 15,
    lineHeight: 22,
  },
  buttonsRow: {
    marginTop: 24,
  },
  button: {
    backgroundColor: theme.colors.action,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#020617',
    fontWeight: '700',
    fontSize: 15,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: theme.colors.cardText,
    fontWeight: '600',
    fontSize: 15,
  },
});
