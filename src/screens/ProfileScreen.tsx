import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { theme } from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const AREAS_INTERESSE = [
  'Inteligência Artificial',
  'Desenvolvimento Web',
  'Desenvolvimento Mobile',
  'Ciência de Dados',
  'DevOps',
  'UX/UI Design',
  'Gestão de Projetos',
  'Marketing Digital',
];

function normalizeSkills(s?: string) {
  return (s ?? '')
    .split(/,|;/)
    .map(t => t.trim())
    .filter(Boolean);
}

function validate(draft: { name: string; role: string; skills: string; progress?: number; areasInteresse: string[] }) {
  const name = draft.name.trim();
  const role = draft.role.trim();
  const skillsArr = normalizeSkills(draft.skills);
  const progress = draft.progress;
  const areasInteresse = draft.areasInteresse;

  const errors: Record<string, string> = {};
  if (!name) errors.name = 'Preencha o nome';
  if (!role) errors.role = 'Informe área/cargo';
  if (skillsArr.length === 0) errors.skills = 'Adicione ao menos 1 skill';
  if (areasInteresse.length === 0) errors.areasInteresse = 'Selecione ao menos 1 área de interesse';

  const progressOk =
    progress === undefined || (typeof progress === 'number' && progress >= 0 && progress <= 1);
  if (!progressOk) errors.progress = 'Progresso deve estar entre 0 e 1';

  const ok = Object.keys(errors).length === 0;
  const normalized = {
    name,
    role,
    skills: skillsArr.join(', '),
    progress: progress === undefined ? undefined : Math.min(1, Math.max(0, progress)),
    areasInteresse,
  };
  return { ok, errors, normalized };
}

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('Lana Andrade');
  const [role, setRole] = useState('DevOps / Mainframe');
  const [skills, setSkills] = useState('React, Java, COBOL, DevOps');
  const [progress, setProgress] = useState<number | undefined>(0.75);
  const [selectedArea, setSelectedArea] = useState('');
  const [areasInteresse, setAreasInteresse] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const json = await AsyncStorage.getItem('profile');
      if (json) {
        const p = JSON.parse(json);
        setName(p.name || name);
        setRole(p.role || role);
        setSkills(p.skills || skills);
        setProgress(p.progress ?? progress);
        setAreasInteresse(p.areasInteresse || []);
      }
    })();
  }, []);

  const addAreaInteresse = () => {
    if (selectedArea && !areasInteresse.includes(selectedArea)) {
      setAreasInteresse([...areasInteresse, selectedArea]);
      setSelectedArea('');
    }
  };

  const removeAreaInteresse = (area: string) => {
    setAreasInteresse(areasInteresse.filter(a => a !== area));
  };

  const onUpdate = async () => {
    const draft = { name, role, skills, progress, areasInteresse };
    const { ok, normalized } = validate(draft);

    if (ok) {
      await AsyncStorage.setItem('profile', JSON.stringify(normalized));
      Alert.alert('Salvo', 'Perfil atualizado com sucesso.');
    } else {
      navigation.navigate('ValidateProfile' as never, { draft } as never);
    }
  };

  const progressPercent = Math.round((progress ?? 0) * 100);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Meu Perfil</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Nome"
          placeholderTextColor="#9CA3AF"
        />

        <Text style={styles.label}>Área atual</Text>
        <TextInput
          style={styles.input}
          value={role}
          onChangeText={setRole}
          placeholder="Área atual"
          placeholderTextColor="#9CA3AF"
        />

        <Text style={styles.label}>Habilidades</Text>
        <TextInput
          style={styles.input}
          value={skills}
          onChangeText={setSkills}
          placeholder="Habilidades (separe por vírgula)"
          placeholderTextColor="#9CA3AF"
        />

        <Text style={styles.label}>Progresso geral (0 a 1)</Text>
        <TextInput
          style={styles.input}
          value={progress !== undefined ? String(progress) : ''}
          onChangeText={t => {
            const v = t.replace(',', '.');
            const n = Number(v);
            if (!t) {
              setProgress(undefined);
            } else if (!Number.isNaN(n)) {
              setProgress(n);
            }
          }}
          keyboardType="numeric"
          placeholder="Ex.: 0.75"
          placeholderTextColor="#9CA3AF"
        />

        <Text style={styles.label}>Áreas de Interesse</Text>
        <View style={styles.pickerContainer}>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedArea}
              onValueChange={setSelectedArea}
              style={styles.picker}
              dropdownIconColor={theme.colors.cardText}
            >
              <Picker.Item label="Selecione uma área..." value="" />
              {AREAS_INTERESSE.map(area => (
                <Picker.Item key={area} label={area} value={area} />
              ))}
            </Picker>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={addAreaInteresse}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.areasContainer}>
          {areasInteresse.map(area => (
            <View key={area} style={styles.areaTag}>
              <Text style={styles.areaTagText}>{area}</Text>
              <TouchableOpacity onPress={() => removeAreaInteresse(area)}>
                <Text style={styles.areaTagClose}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.progressWrap}>
          <View
            style={[
              styles.progressBar,
              { width: `${progressPercent}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {progressPercent}% completo
        </Text>

        <TouchableOpacity style={styles.button} onPress={onUpdate}>
          <Text style={styles.buttonText}>Atualizar dados</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const INPUT_HEIGHT = 48;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 12,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.cardText,
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: theme.colors.muted,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: INPUT_HEIGHT,
    marginBottom: 8,
    color: theme.colors.cardText,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pickerWrapper: {
    flex: 1,
    height: INPUT_HEIGHT,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.muted,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  picker: {
    height: INPUT_HEIGHT,
    color: theme.colors.cardText,
  },
  addButton: {
    marginLeft: 8,
    height: INPUT_HEIGHT,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: theme.colors.action,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#020617',
    fontSize: 20,
    fontWeight: '700',
  },
  areasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    marginTop: 4,
  },
  areaTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.muted,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  areaTagText: {
    color: theme.colors.text,
    fontSize: 14,
    marginRight: 6,
  },
  areaTagClose: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  progressWrap: {
    height: 10,
    backgroundColor: theme.colors.muted,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.colors.action,
  },
  progressText: {
    marginTop: 4,
    marginBottom: 8,
    color: theme.colors.cardText,
    fontSize: 14,
  },
  button: {
    backgroundColor: theme.colors.action,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#020617',
    fontWeight: '700',
  },
});
