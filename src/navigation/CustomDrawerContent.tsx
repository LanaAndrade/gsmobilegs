import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../theme';

export default function CustomDrawerContent(props: any) {
  const [userName, setUserName] = useState('Lana Andrade');
  const [userEmail, setUserEmail] = useState('lana@email.com');

  useEffect(() => {
    async function loadUserData() {
      try {
        const savedUser = await AsyncStorage.getItem('userData');

        if (savedUser) {
          const parsed = JSON.parse(savedUser);
          if (parsed?.name) {
            setUserName(parsed.name);
          }
          if (parsed?.email) {
            setUserEmail(parsed.email);
          }
        }
      } catch (error) {
        console.log('Erro ao carregar dados do usuário:', error);
      }
    }

    loadUserData();
  }, []);

  function handleLogout() {
    AsyncStorage.multiRemove(['userToken', 'userData']).then(() => {
      props.navigation.navigate('Login');
    });
  }

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color={theme.colors.primary} />
          </View>
          <Text style={styles.name}>{userName}</Text>
          <Text style={styles.email}>{userEmail}</Text>
        </View>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutRow}>
          <Ionicons name="log-out" size={20} color={theme.colors.text} />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.muted,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: theme.colors.muted,
  },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    color: theme.colors.text,
  },
});
