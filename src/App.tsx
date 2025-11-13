import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import RootNavigation from './navigation/RootNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications';

// Configurar como as notificações são tratadas quando o app está em primeiro plano
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false, // Desabilitar som para evitar irritação
    shouldSetBadge: true,
  }),
});

// Serviço de inicialização simplificado
const AppStartupService = {
  initialize: async () => {
    try {
      console.log('🚀 Inicializando app...');
      
      // Aqui você pode adicionar inicializações futuras
      // como carregar dados do usuário, configurar temas, etc.
      
    } catch (error) {
      console.error('❌ Erro na inicialização:', error);
    }
  }
};

export default function App() {
  useEffect(() => {
    // Inicializar serviços do app
    AppStartupService.initialize();

    // Solicitar permissão para notificações
    const requestPermissions = async () => {
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permissão para notificações não concedida');
        } else {
          console.log('Permissão para notificações concedida');
        }
      } catch (error) {
        console.error('Erro ao solicitar permissão de notificações:', error);
      }
    };

    requestPermissions();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <RootNavigation />
    </GestureHandlerRootView>
  );
}