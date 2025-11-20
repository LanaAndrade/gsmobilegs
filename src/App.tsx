import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigation from './navigation/RootNavigation';

const AppStartupService = {
  async initialize() {
    try {
      console.log('Inicializando app...');
    } catch (error) {
      console.log('Erro na inicialização:', error);
    }
  },
};

export default function App() {
  useEffect(() => {
    AppStartupService.initialize();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <RootNavigation />
    </GestureHandlerRootView>
  );
}
