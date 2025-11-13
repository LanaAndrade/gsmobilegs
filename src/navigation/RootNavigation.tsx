import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TestScreen from '../screens/TestScreen';
import ValidateProfileScreen from '../screens/ValidateProfileScreen';
import AppObjectiveScreen from '../screens/AppObjectiveScreen';
import ProgressScreen from '../screens/ProgressScreen';
import MicroCoursesScreen from '../screens/MicroCoursesScreen';
import SplashScreen from '../screens/SplashScreen';
import { theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: '#fff',
        tabBarActiveTintColor: theme.colors.action,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarStyle: { 
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: theme.colors.muted,
        },
        tabBarIcon: ({ size, color }) => {
          const map: any = { 
            'Home': 'home',
            'Perfil': 'person', 
            'Teste': 'list', 
            'Recomendações': 'sparkles',
            'Microcursos': 'game-controller'
          };
          const name = map[route.name] || 'ellipse';
          return <Ionicons name={name as any} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
      <Tab.Screen name="Teste" component={TestScreen} />
      <Tab.Screen name="Recomendações" component={MicroCoursesScreen} />
      <Tab.Screen name="Microcursos" component={MicroCoursesScreen} />
    </Tab.Navigator>
  );
}

function MainDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: '#fff',
        drawerActiveTintColor: theme.colors.action,
        drawerInactiveTintColor: theme.colors.text,
        drawerStyle: {
          backgroundColor: theme.colors.background,
          width: 280,
        }
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={HomeTabs}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          title: 'Início'
        }}
      />
      <Drawer.Screen 
        name="Perfil" 
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen 
        name="Teste de Carreira" 
        component={TestScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen 
        name="Microcursos" 
        component={MicroCoursesScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="game-controller" size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen 
        name="Progresso" 
        component={ProgressScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="trending-up" size={size} color={color} />
          )
        }}
      />
      <Drawer.Screen 
        name="Sobre o App" 
        component={AppObjectiveScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="information-circle" size={size} color={color} />
          )
        }}
      />
    </Drawer.Navigator>
  );
}

export default function RootNavigation() {
  const navTheme = { 
    ...DefaultTheme, 
    colors: { 
      ...DefaultTheme.colors, 
      background: theme.colors.background,
      card: theme.colors.primary,
      text: '#fff',
      border: theme.colors.muted,
    } 
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Main" 
          component={MainDrawer} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ValidateProfile" 
          component={ValidateProfileScreen} 
          options={{ 
            title: 'Validar Perfil',
            headerStyle: { backgroundColor: theme.colors.primary },
            headerTintColor: '#fff',
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}