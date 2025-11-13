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
  'Sustentabilidade',
  'Soft Skills',
  'Cloud Computing',
  'Cybersecurity'
];

function normalizeSkills(s?: string): string[] {
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
    areasInteresse
  };
  return { ok, errors, normalized };
}

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('Lana Andrade');
  const [role, setRole] = useState('DevOps / Mainframe');
  const [skills, setSkills] = useState('React, Java, COBOL, DevOps');
  const [progress, setProgress] = useState(0.75);
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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>
      
      <TextInput 
        style={styles.input} 
        value={name} 
        onChangeText={setName} 
        placeholder="Nome" 
      />
      <TextInput 
        style={styles.input} 
        value={role} 
        onChangeText={setRole} 
        placeholder="Área atual" 
      />
      <TextInput 
        style={styles.input} 
        value={skills} 
        onChangeText={setSkills} 
        placeholder="Habilidades (separe por vírgula)" 
      />

      {/* Seletor de Áreas de Interesse */}
      <Text style={styles.sectionTitle}>Áreas de Interesse</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedArea}
          onValueChange={setSelectedArea}
          style={styles.picker}
        >
          <Picker.Item label="Selecione uma área..." value="" />
          {AREAS_INTERESSE.map(area => (
            <Picker.Item key={area} label={area} value={area} />
          ))}
        </Picker>
        <TouchableOpacity style={styles.addButton} onPress={addAreaInteresse}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      {/* Áreas selecionadas */}
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
        <View style={[styles.progressBar, { width: `${Math.round((progress ?? 0) * 100)}%` }]} />
      </View>
      <Text style={{ color: '#556' }}>{Math.round((progress ?? 0) * 100)}% completo</Text>

      <TouchableOpacity style={styles.button} onPress={onUpdate}>
        <Text style={styles.buttonText}>Atualizar dados</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: theme.colors.background },
  title: { fontSize: 22, fontWeight: '700', color: theme.colors.text, marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: theme.colors.text, marginTop: 16, marginBottom: 8 },
  input: { 
    backgroundColor: '#fff', 
    borderColor: theme.colors.muted, 
    borderWidth: 1, 
    borderRadius: 12, 
    padding: 12, 
    marginVertical: 8 
  },
  pickerContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12 
  },
  picker: { 
    flex: 1, 
    backgroundColor: '#fff',
    borderColor: theme.colors.muted,
    borderWidth: 1,
    borderRadius: 12,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 12,
    marginLeft: 8
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14
  },
  areasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16
  },
  areaTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.muted,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8
  },
  areaTagText: {
    color: theme.colors.text,
    fontSize: 14,
    marginRight: 6
  },
  areaTagClose: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '700'
  },
  progressWrap: { 
    height: 10, 
    backgroundColor: theme.colors.muted, 
    borderRadius: 10, 
    overflow: 'hidden', 
    marginVertical: 12 
  },
  progressBar: { 
    height: '100%', 
    backgroundColor: theme.colors.action 
  },
  button: { 
    backgroundColor: theme.colors.action, 
    padding: 12, 
    borderRadius: 12, 
    marginTop: 8, 
    alignItems: 'center' 
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: '700' 
  }
});