import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface DailyHeaderProps {
  title?: string;
  dateLabel?: string;
}

export const DailyHeader: React.FC<DailyHeaderProps> = ({
  title = 'Daily Token',
  dateLabel,
}) => {
  return (
    <View style={styles.container} accessibilityRole="header">
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{dateLabel}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0a0a0a',
  },
  date: {
    fontSize: 12,
    color: '#6b7280',
  },
});
