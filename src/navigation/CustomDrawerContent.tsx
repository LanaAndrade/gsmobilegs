import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CustomDrawerContent(props: any) {
  const [userName, setUserName] = useState('Lana Andrade');
  const [userEmail, setUserEmail] = useState('lana@email.com');

  useEffect(() => {
    (async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const { name, email } = JSON.parse(userData);
        setUserName(name);
        setUserEmail(email);
      }
    })();
  }, []);

  const handleLogout = () => {
    // Limpar dados de autenticação e voltar para a tela de Login
    AsyncStorage.multiRemove(['userToken', 'userData']).then(() => {
      props.navigation.navigate('Login');
    });
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.userInfoSection}>
          <View style={styles.userAvatar}>
            <Ionicons name="person" size={40} color={theme.colors.primary} />
          </View>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
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
  userInfoSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.muted,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  logoutSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: theme.colors.muted,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    color: theme.colors.text,
  },
});