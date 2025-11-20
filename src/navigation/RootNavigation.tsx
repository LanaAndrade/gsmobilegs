import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import Login from '../screens/Login';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Quiz from '../screens/Quiz';
import ValidateProfile from '../screens/ValidateProfile';
import About from '../screens/About';
import Progress from '../screens/Progress';
import Courses from '../screens/Courses';
import Recs from '../screens/Recs';
import SplashScreen from '../screens/SplashScreen';
import { theme } from '../theme';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function getTabIconName(routeName: string) {
  if (routeName === 'Home') return 'home';
  if (routeName === 'Perfil') return 'person';
  if (routeName === 'Teste') return 'list';
  if (routeName === 'Recomendacoes') return 'sparkles';
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
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Perfil" component={Profile} />
      <Tab.Screen name="Teste" component={Quiz} />
      <Tab.Screen name="Recomendacoes" component={Recs} />
      <Tab.Screen name="Microcursos" component={Courses} />
    </Tab.Navigator>
  );
}

function MainDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeTabs"
      screenOptions={{
        headerShown: true,
        headerTitle: 'SkillUpPlus2030+',
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
        name="HomeTabs"
        component={HomeTabs}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Perfil"
        component={Profile}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Teste de Carreira"
        component={Quiz}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Microcursos"
        component={Courses}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="game-controller" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Progresso"
        component={Progress}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="trending-up" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Sobre o App"
        component={About}
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
          headerTitle: 'SkillUpPlus2030+',
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
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Main"
          component={MainDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ValidateProfile" component={ValidateProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
