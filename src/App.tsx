import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications';
import RootNavigation from './navigation/RootNavigation';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

const AppStartupService = {
  async initialize() {
    try {
      console.log('Inicializando app...');
    } catch (error) {
      console.log('Erro na inicialização:', error);
    }
  },
};

async function requestNotificationPermissions() {
  try {
    const { status } = await Notifications.requestPermissionsAsync();

    if (status !== 'granted') {
      console.log('Permissão para notificações não concedida');
    } else {
      console.log('Permissão para notificações concedida');
    }
  } catch (error) {
    console.log('Erro ao solicitar permissão de notificações:', error);
  }
}

export default function App() {
  useEffect(() => {
    AppStartupService.initialize();
    requestNotificationPermissions();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <RootNavigation />
    </GestureHandlerRootView>
  );
}
