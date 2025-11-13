import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

interface NotificationBadgeProps {
  count: number;
  size?: number;
  color?: string;
}

export default function NotificationBadge({ 
  count, 
  size = 18, 
  color = theme.colors.danger 
}: NotificationBadgeProps) {
  if (count === 0) return null;

  const displayCount = count > 99 ? '99+' : count.toString();

  return (
    <View style={[styles.badge, { 
      width: Math.max(size, size * 0.8 * displayCount.length),
      height: size,
      backgroundColor: color,
      borderRadius: size / 2
    }]}>
      <Text style={[styles.badgeText, { fontSize: size * 0.6 }]}>
        {displayCount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
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