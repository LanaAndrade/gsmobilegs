import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

interface NotificationBadgeProps {
  count: number;
  size?: number;
}

export default function NotificationBadge({ count, size = 18 }: NotificationBadgeProps) {
  if (count === 0) return null;

  return (
    <View style={[styles.badge, { width: size, height: size }]}>
      <Text style={[styles.badgeText, { fontSize: size * 0.6 }]}>
        {count > 99 ? '99+' : count}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: theme.colors.danger,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -5,
    right: -5,
    minWidth: 18,
    minHeight: 18,
  },
  badgeText: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },
});