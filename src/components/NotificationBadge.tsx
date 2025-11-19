import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

type NotificationBadgeProps = {
  count: number;
  size?: number;
  color?: string;
};

export default function NotificationBadge(props: NotificationBadgeProps) {
  const { count, size = 18, color = theme.colors.danger } = props;

  if (!count || count === 0) {
    return null;
  }

  const text = count > 99 ? '99+' : count.toString();
  const width = Math.max(size, size * 0.8 * text.length);

  return (
    <View
      style={[
        styles.badge,
        {
          width: width,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
      ]}
    >
      <Text style={[styles.badgeText, { fontSize: size * 0.6 }]}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    minWidth: 18,
    minHeight: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },
});
