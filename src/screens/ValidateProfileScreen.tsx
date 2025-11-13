import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../theme';

type Draft = { 
  name?: string; 
  role?: string; 
  skills?: string; 
  progress?: number; 
  areasInteresse?: string[] 
};

function normalizeSkills(s?: string): string[] {
  return (s ?? '')
    .split(/,|;/)
    .map(t => t.trim())
    .filter(Boolean);
}

function validateProfile(draft: Draft) {
  const name = (draft.name ?? '').trim();
  const role = (draft.role ?? '').trim();
  const skillsArr = normalizeSkills(draft.skills);
  const progress = draft.progress;
  const areasInteresse = draft.areasInteresse ?? [];

  const errors: Record<string, string> = {};
  
  // Validação de nome
  if (!name) {
    errors.name = 'Nome é obrigatório';
  } else if (name.length < 2) {
    errors.name = 'Nome deve ter pelo menos 2 caracteres';
  } else if (name.length > 50) {
    errors.name = 'Nome deve ter no máximo 50 caracteres';
  }

  // Validação de cargo/área
  if (!role) {
    errors.role = 'Área/cargo é obrigatório';
  } else if (role.length < 3) {
    errors.role = 'Área/cargo deve ter pelo menos 3 caracteres';
  }

  // Validação de skills
  if (skillsArr.length === 0) {
    errors.skills = 'Adicione ao menos 1 habilidade';
  } else if (skillsArr.length > 10) {
    errors.skills = 'Máximo de 10 habilidades permitidas';
  }

  // Validação de áreas de interesse
  if (areasInteresse.length === 0) {
    errors.areasInteresse = 'Selecione ao menos 1 área de interesse';
  } else if (areasInteresse.length > 5) {
    errors.areasInteresse = 'Máximo de 5 áreas de interesse';
  }

  // Validação de progresso
  if (progress !== undefined) {
    if (typeof progress !== 'number') {
      errors.progress = 'Progresso deve ser um número';
    } else if (progress < 0 || progress > 1) {
      errors.progress = 'Progresso deve estar entre 0 e 1';
    } else if (progress < 0.1) {
      errors.progress = 'Progresso muito baixo (mínimo 10%)';
    }
  }

  const ok = Object.keys(errors).length === 0;
  
  const normalized = {
    name,
    role,
    skills: skillsArr.join(', '),
    progress: progress === undefined ? 0.1 : Math.min(1, Math.max(0.1, progress)),
    areasInteresse: areasInteresse.slice(0, 5) // Limita a 5 áreas
  };

  return { ok, errors, normalized };
}

export default function ValidateProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<Record<string, { draft?: Draft }>, string>>();
  const draft = route.params?.draft ?? {};

  const name = (draft.name ?? '').trim();
  const role = (draft.role ?? '').trim();
  const skillsArr = normalizeSkills(draft.skills);
  const progress = draft.progress;
  const areasInteresse = draft.areasInteresse ?? [];

  const { ok, errors, normalized } = validateProfile(draft);

  const checks = [
    { 
      key: 'Nome', 
      ok: !errors.name, 
      msg: errors.name || (name ? `OK (${name.length}/50)` : 'Preencha o nome'),
      critical: true
    },
    { 
      key: 'Área/Cargo', 
      ok: !errors.role, 
      msg: errors.role || (role ? `OK (${role.length})` : 'Informe área/cargo'),
      critical: true
    },
    { 
      key: 'Habilidades', 
      ok: !errors.skills, 
      msg: errors.skills || (skillsArr.length ? `OK (${skillsArr.length} habilidades)` : 'Adicione habilidades'),
      critical: true
    },
    { 
      key: 'Áreas de Interesse', 
      ok: !errors.areasInteresse, 
      msg: errors.areasInteresse || (areasInteresse.length ? `OK (${areasInteresse.length} áreas)` : 'Selecione áreas'),
      critical: true
    },
    { 
      key: 'Progresso', 
      ok: !errors.progress, 
      msg: errors.progress || (progress === undefined ? 'Não definido' : `${Math.round((progress ?? 0) * 100)}%`),
      critical: false
    },
  ];

  const criticalErrors = checks.filter(c => !c.ok && c.critical).length;
  const allOk = checks.every(c => c.ok);

  const applyAndSave = async () => {
    await AsyncStorage.setItem('profile', JSON.stringify(normalized));
    Alert.alert(
      'Perfil Validado', 
      criticalErrors > 0 
        ? `Dados salvos com ${criticalErrors} ajustes necessários.` 
        : 'Perfil salvo com sucesso!'
    );
    navigation.goBack();
  };

  const getStatusColor = (ok: boolean, critical: boolean) => {
    if (ok) return '#2E7D32';
    if (critical) return '#D32F2F';
    return '#FF9800';
  };

  const getStatusText = (ok: boolean, critical: boolean) => {
    if (ok) return 'OK';
    if (critical) return 'CRÍTICO';
    return 'AVISO';
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.title}>Validação do Perfil</Text>
      <Text style={styles.subtitle}>
        {allOk ? '✅ Todos os dados estão válidos!' : '⚠️ Revise os campos abaixo:'}
      </Text>

      {checks.map((c) => (
        <View 
          key={c.key} 
          style={[
            styles.card, 
            { 
              borderColor: getStatusColor(c.ok, c.critical),
              backgroundColor: c.ok ? '#F8FFF8' : '#FFF'
            }
          ]}
        >
          <View style={styles.row}>
            <Text style={styles.cardKey}>{c.key}</Text>
            <Text style={[styles.status, { color: getStatusColor(c.ok, c.critical) }]}>
              {getStatusText(c.ok, c.critical)}
            </Text>
          </View>
          <Text style={styles.cardMsg}>{c.msg}</Text>
          {!c.ok && c.critical && (
            <Text style={styles.criticalText}>Este campo precisa ser corrigido</Text>
          )}
        </View>
      ))}

      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Status: {allOk ? 'VALIDADO' : 'PENDENTE'} | 
          Erros: {checks.filter(c => !c.ok).length} | 
          Críticos: {criticalErrors}
        </Text>
      </View>

      <TouchableOpacity 
        style={[
          styles.button, 
          criticalErrors > 0 && styles.buttonWarning,
          !allOk && { opacity: 0.9 }
        ]} 
        onPress={applyAndSave}
      >
        <Text style={styles.buttonText}>
          {allOk ? '✅ Aplicar e salvar' : 
           criticalErrors > 0 ? '⚠️ Aplicar correções' : '💡 Salvar com avisos'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonGhost} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonGhostText}>← Voltar e editar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { 
    fontSize: 22, 
    fontWeight: '700', 
    color: theme.colors.text, 
    marginBottom: 8 
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20
  },
  card: { 
    backgroundColor: '#fff', 
    borderWidth: 2, 
    borderRadius: 12, 
    padding: 16, 
    marginBottom: 12 
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 8
  },
  cardKey: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: theme.colors.text 
  },
  status: { 
    fontWeight: '700', 
    fontSize: 12,
    textTransform: 'uppercase'
  },
  cardMsg: { 
    marginTop: 4, 
    color: '#445',
    fontSize: 14
  },
  criticalText: {
    marginTop: 6,
    color: '#D32F2F',
    fontSize: 12,
    fontWeight: '600'
  },
  summary: {
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 8,
    marginVertical: 12
  },
  summaryText: {
    color: '#1976D2',
    fontWeight: '600',
    textAlign: 'center'
  },
  button: { 
    backgroundColor: theme.colors.action, 
    padding: 16, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 8 
  },
  buttonWarning: {
    backgroundColor: '#FF9800'
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: '700',
    fontSize: 16
  },
  buttonGhost: { 
    padding: 16, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 12, 
    borderWidth: 1, 
    borderColor: theme.colors.muted, 
    backgroundColor: '#fff' 
  },
  buttonGhostText: { 
    color: theme.colors.text, 
    fontWeight: '700' 
  },
});