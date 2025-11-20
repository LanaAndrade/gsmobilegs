import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../theme';

type Draft = {
  name?: string;
  role?: string;
  skills?: string;
  progress?: number;
  areasInteresse?: string[];
};

function normalizeSkills(value?: string): string[] {
  const base = value ?? '';
  return base
    .split(/,|;/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function validateProfile(draft: Draft) {
  const name = (draft.name ?? '').trim();
  const role = (draft.role ?? '').trim();
  const skillsArray = normalizeSkills(draft.skills);
  const progress = draft.progress;
  const areasInteresse = draft.areasInteresse ?? [];

  const errors: Record<string, string> = {};

  if (!name) {
    errors.name = 'Nome é obrigatório';
  } else if (name.length < 2) {
    errors.name = 'Nome deve ter pelo menos 2 caracteres';
  } else if (name.length > 50) {
    errors.name = 'Nome deve ter no máximo 50 caracteres';
  }

  if (!role) {
    errors.role = 'Área/cargo é obrigatório';
  } else if (role.length < 3) {
    errors.role = 'Área/cargo deve ter pelo menos 3 caracteres';
  }

  if (skillsArray.length === 0) {
    errors.skills = 'Adicione ao menos 1 habilidade';
  } else if (skillsArray.length > 10) {
    errors.skills = 'Máximo de 10 habilidades permitidas';
  }

  if (areasInteresse.length === 0) {
    errors.areasInteresse = 'Selecione ao menos 1 área de interesse';
  } else if (areasInteresse.length > 5) {
    errors.areasInteresse = 'Máximo de 5 áreas de interesse';
  }

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
    skills: skillsArray.join(', '),
    progress:
      progress === undefined
        ? 0.1
        : Math.min(1, Math.max(0.1, progress)),
    areasInteresse: areasInteresse.slice(0, 5),
  };

  return { ok, errors, normalized };
}

export default function ValidateProfile() {
  const navigation = useNavigation();
  const route =
    useRoute<RouteProp<Record<string, { draft?: Draft }>, string>>();

  const draft = route.params?.draft ?? {};

  const name = (draft.name ?? '').trim();
  const role = (draft.role ?? '').trim();
  const skillsArray = normalizeSkills(draft.skills);
  const progress = draft.progress;
  const areasInteresse = draft.areasInteresse ?? [];

  const { ok, errors, normalized } = validateProfile(draft);

  const checks = [
    {
      key: 'Nome',
      ok: !errors.name,
      msg: errors.name || (name ? `OK (${name.length}/50)` : 'Preencha o nome'),
      critical: true,
    },
    {
      key: 'Área/Cargo',
      ok: !errors.role,
      msg: errors.role || (role ? `OK (${role.length})` : 'Informe área/cargo'),
      critical: true,
    },
    {
      key: 'Habilidades',
      ok: !errors.skills,
      msg:
        errors.skills ||
        (skillsArray.length
          ? `OK (${skillsArray.length} habilidades)`
          : 'Adicione habilidades'),
      critical: true,
    },
    {
      key: 'Áreas de interesse',
      ok: !errors.areasInteresse,
      msg:
        errors.areasInteresse ||
        (areasInteresse.length
          ? `OK (${areasInteresse.length} áreas)`
          : 'Selecione áreas'),
      critical: true,
    },
    {
      key: 'Progresso',
      ok: !errors.progress,
      msg:
        errors.progress ||
        (progress === undefined
          ? 'Não definido'
          : `${Math.round((progress ?? 0) * 100)}%`),
      critical: false,
    },
  ];

  const criticalErrors = checks.filter(
    (item) => !item.ok && item.critical,
  ).length;

  const allOk = checks.every((item) => item.ok);

  async function applyAndSave() {
    await AsyncStorage.setItem('profile', JSON.stringify(normalized));

    if (criticalErrors > 0) {
      Alert.alert(
        'Perfil validado',
        `Dados salvos com ${criticalErrors} ajustes necessários.`,
      );
    } else {
      Alert.alert('Perfil validado', 'Perfil salvo com sucesso.');
    }

    navigation.goBack();
  }

  function getStatusColor(okFlag: boolean, critical: boolean) {
    if (okFlag) return theme.colors.success;
    if (critical) return theme.colors.danger;
    return theme.colors.warning;
  }

  function getStatusText(okFlag: boolean, critical: boolean) {
    if (okFlag) return 'OK';
    if (critical) return 'CRÍTICO';
    return 'AVISO';
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Validação do perfil</Text>
      <Text style={styles.subtitle}>
        {allOk
          ? 'Todos os dados estão válidos para uso.'
          : 'Confira os pontos abaixo antes de salvar.'}
      </Text>

      <View style={styles.cardWrapper}>
        {checks.map((item) => (
          <View
            key={item.key}
            style={[
              styles.card,
              {
                borderColor: getStatusColor(item.ok, item.critical),
              },
            ]}
          >
            <View style={styles.row}>
              <Text style={styles.cardKey}>{item.key}</Text>
              <Text
                style={[
                  styles.status,
                  { color: getStatusColor(item.ok, item.critical) },
                ]}
              >
                {getStatusText(item.ok, item.critical)}
              </Text>
            </View>
            <Text style={styles.cardMsg}>{item.msg}</Text>
            {!item.ok && item.critical && (
              <Text style={styles.criticalText}>
                Este campo precisa ser corrigido.
              </Text>
            )}
          </View>
        ))}

        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            Status: {allOk ? 'VALIDADO' : 'PENDENTE'} · Erros:{' '}
            {checks.filter((item) => !item.ok).length} · Críticos:{' '}
            {criticalErrors}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            criticalErrors > 0 && styles.buttonWarning,
          ]}
          onPress={applyAndSave}
        >
          <Text style={styles.buttonText}>
            {allOk
              ? 'Aplicar e salvar'
              : criticalErrors > 0
              ? 'Aplicar correções'
              : 'Salvar com avisos'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonGhost}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonGhostText}>Voltar e editar</Text>
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
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardKey: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  status: {
    fontWeight: '700',
    fontSize: 11,
    textTransform: 'uppercase',
  },
  cardMsg: {
    marginTop: 2,
    color: '#4B5563',
    fontSize: 13,
  },
  criticalText: {
    marginTop: 4,
    color: theme.colors.danger,
    fontSize: 12,
    fontWeight: '600',
  },
  summary: {
    backgroundColor: theme.colors.muted,
    padding: 10,
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 12,
  },
  summaryText: {
    color: theme.colors.text,
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 13,
  },
  button: {
    backgroundColor: theme.colors.action,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonWarning: {
    backgroundColor: theme.colors.warning,
  },
  buttonText: {
    color: '#020617',
    fontWeight: '700',
    fontSize: 15,
  },
  buttonGhost: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: theme.colors.muted,
    backgroundColor: theme.colors.card,
  },
  buttonGhostText: {
    color: '#111827',
    fontWeight: '700',
    fontSize: 14,
  },
});
