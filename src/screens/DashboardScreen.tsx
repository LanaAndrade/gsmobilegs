import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen({ navigation }: any) {
  const [userData, setUserData] = useState<any>({});
  const [progress, setProgress] = useState(0);
  const [completedCourses, setCompletedCourses] = useState(0);
  const [pendingActions, setPendingActions] = useState(0);

  useEffect(() => {
    loadDashboardData();
    
    // Recarregar dados quando a tela ganhar foco
    const unsubscribe = navigation.addListener('focus', () => {
      loadDashboardData();
    });

    return unsubscribe;
  }, [navigation]);

  const loadDashboardData = async () => {
    try {
      const [profile, answers, savedRecs, userData] = await Promise.all([
        AsyncStorage.getItem('profile'),
        AsyncStorage.getItem('answers'),
        AsyncStorage.getItem('savedRecs'),
        AsyncStorage.getItem('userData')
      ]);

      const profileData = profile ? JSON.parse(profile) : {};
      const answersData = answers ? JSON.parse(answers) : {};
      const savedData = savedRecs ? JSON.parse(savedRecs) : [];
      const userDataParsed = userData ? JSON.parse(userData) : {};

      setUserData(userDataParsed);
      setProgress(profileData.progress || 0);
      setCompletedCourses(savedData.length);
      
      // Calcular ações pendentes
      let pending = 0;
      if (Object.keys(answersData).length === 0) pending++; // Teste não feito
      if (!profileData.name || profileData.name === 'Novo Usuário') pending++; // Perfil incompleto
      if (savedData.length === 0) pending++; // Nenhum curso salvo
      
      setPendingActions(pending);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const StatCard = ({ title, value, subtitle, icon, color, onPress }: any) => (
    <TouchableOpacity 
      style={[styles.statCard, { borderLeftColor: color }]} 
      onPress={onPress}
    >
      <View style={styles.statHeader}>
        <Ionicons name={icon} size={24} color={color} />
        <Text style={styles.statValue}>{value}</Text>
      </View>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );

  const QuickAction = ({ title, description, icon, color, onPress }: any) => (
    <TouchableOpacity style={styles.quickAction} onPress={onPress}>
      <View style={[styles.actionIcon, { backgroundColor: color }]}>
        <Ionicons name={icon} size={20} color="#fff" />
      </View>
      <View style={styles.actionText}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionDescription}>{description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </TouchableOpacity>
  );

  const userName = userData?.name?.split(' ')[0] || 'Usuário';

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Olá, {userName}! 👋</Text>
        <Text style={styles.subtitle}>Seu progresso hoje</Text>
      </View>

      {/* Estatísticas */}
      <View style={styles.statsGrid}>
        <StatCard
          title="Progresso Geral"
          value={`${Math.round(progress * 100)}%`}
          subtitle="Perfil completo"
          icon="bar-chart"
          color={theme.colors.action}
          onPress={() => navigation.navigate('Perfil')}
        />
        <StatCard
          title="Cursos Concluídos"
          value={completedCourses}
          subtitle="Microcursos finalizados"
          icon="trophy"
          color={theme.colors.secondary}
          onPress={() => navigation.navigate('Microcursos')}
        />
        <StatCard
          title="Ações Pendentes"
          value={pendingActions}
          subtitle="Para completar"
          icon="alert-circle"
          color={theme.colors.warning}
          onPress={() => navigation.navigate('Teste')}
        />
        <StatCard
          title="Recomendações"
          value="+5"
          subtitle="Trilhas disponíveis"
          icon="sparkles"
          color={theme.colors.primary}
          onPress={() => navigation.navigate('Recomendações')}
        />
      </View>

      {/* Ações Rápidas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>
        <QuickAction
          title="Completar Teste de Carreira"
          description="Descubra suas trilhas ideais"
          icon="list"
          color={theme.colors.primary}
          onPress={() => navigation.navigate('Teste')}
        />
        <QuickAction
          title="Explorar Microcursos"
          description="Aprenda com conteúdo gamificado"
          icon="game-controller"
          color={theme.colors.secondary}
          onPress={() => navigation.navigate('Microcursos')}
        />
        <QuickAction
          title="Ver Progresso Detalhado"
          description="Acompanhe sua evolução"
          icon="trending-up"
          color={theme.colors.action}
          onPress={() => navigation.navigate('Progresso Pessoal')}
        />
        <QuickAction
          title="Atualizar Perfil"
          description="Mantenha seus dados atualizados"
          icon="person"
          color={theme.colors.info}
          onPress={() => navigation.navigate('Perfil')}
        />
      </View>

      {/* Dica do Dia */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dica do Dia 💡</Text>
        <View style={styles.tipCard}>
          <Ionicons name="bulb" size={24} color={theme.colors.secondary} style={styles.tipIcon} />
          <Text style={styles.tipText}>
            "Dedique 15 minutos por dia para aprender algo novo. Pequenos passos consistentes 
            levam a grandes resultados na sua carreira!"
          </Text>
        </View>
      </View>

      {/* Próximos Passos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Próximos Passos</Text>
        <View style={styles.nextSteps}>
          {pendingActions > 0 ? (
            <>
              <Text style={styles.nextStepsText}>
                Você tem {pendingActions} ação{pendingActions > 1 ? 'es' : ''} pendente{pendingActions > 1 ? 's' : ''}:
              </Text>
              {Object.keys(userData).length === 0 && (
                <Text style={styles.step}>• Complete seu perfil</Text>
              )}
              {completedCourses === 0 && (
                <Text style={styles.step}>• Explore microcursos</Text>
              )}
              <Text style={styles.step}>• Faça o teste de carreira</Text>
            </>
          ) : (
            <Text style={styles.nextStepsText}>
              Parabéns! Você está no caminho certo. Continue explorando novas trilhas e microcursos.
            </Text>
          )}
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
  header: {
    padding: 20,
    backgroundColor: theme.colors.primary,
  },
  welcome: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  statCard: {
    width: '47%',
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 16,
    margin: 5,
    borderLeftWidth: 4,
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.text,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  statSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 12,
  },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    elevation: 1,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 2,
  },
  actionDescription: {
    fontSize: 12,
    color: '#666',
  },
  tipCard: {
    backgroundColor: theme.colors.muted,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipIcon: {
    marginRight: 12,
  },
  tipText: {
    fontSize: 14,
    color: theme.colors.text,
    lineHeight: 20,
    fontStyle: 'italic',
    flex: 1,
  },
  nextSteps: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 16,
  },
  nextStepsText: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: 8,
    lineHeight: 20,
  },
  step: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    marginLeft: 8,
  },
});