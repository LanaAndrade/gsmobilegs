import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TestScreen from '../screens/TestScreen';
import ValidateProfileScreen from '../screens/ValidateProfileScreen';
import AppObjectiveScreen from '../screens/AppObjectiveScreen';
import ProgressScreen from '../screens/ProgressScreen';
import MicroCoursesScreen from '../screens/MicroCoursesScreen';
import RecommendationsScreen from '../screens/RecommendationsScreen';
import SplashScreen from '../screens/SplashScreen';
import { theme } from '../theme';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function getTabIconName(routeName: string) {
  if (routeName === 'Home') return 'home';
  if (routeName === 'Perfil') return 'person';
  if (routeName === 'Teste') return 'list';
  if (routeName === 'Recomendações') return 'sparkles';
  if (routeName === 'Microcursos') return 'game-controller';
  return 'ellipse';
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.action,
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.muted,
        },
        tabBarIcon: ({ size, color }) => {
          const iconName = getTabIconName(route.name);
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
      <Tab.Screen name="Teste" component={TestScreen} />
      <Tab.Screen name="Recomendações" component={RecommendationsScreen} />
      <Tab.Screen name="Microcursos" component={MicroCoursesScreen} />
    </Tab.Navigator>
  );
}

function MainDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerTitle: 'Nexus Career',
        headerTitleAlign: 'center',
        headerTintColor: '#020617',
        headerBackground: () => (
          <LinearGradient
            colors={['#00F28A', '#00C96A']}
            style={{ flex: 1 }}
          />
        ),
        drawerActiveTintColor: theme.colors.action,
        drawerInactiveTintColor: theme.colors.text,
        drawerStyle: {
          backgroundColor: theme.colors.background,
          width: 280,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeTabs}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Teste de Carreira"
        component={TestScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Microcursos"
        component={MicroCoursesScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="game-controller" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Progresso"
        component={ProgressScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="trending-up" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Sobre o App"
        component={AppObjectiveScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="information-circle" size={size} color={color} />
          ),
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
      card: theme.colors.background,
      text: theme.colors.text,
      border: theme.colors.muted,
      primary: theme.colors.primary,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: true,
          headerTitle: 'Nexus Career',
          headerTitleAlign: 'center',
          headerTintColor: '#020617',
          headerBackground: () => (
            <LinearGradient
              colors={['#00F28A', '#00C96A']}
              style={{ flex: 1 }}
            />
          ),
        }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Main"
          component={MainDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ValidateProfile" component={ValidateProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
