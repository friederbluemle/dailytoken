import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export interface SummaryProps {
  summary?: string | null;
}

export const Summary: React.FC<SummaryProps> = ({summary}) => {
  const text = typeof summary === 'string' ? summary.trim() : '';
  if (!text) {
    return null;
  }
  return (
    <View style={styles.container} accessibilityRole="summary">
      <View style={styles.headerRow}>
        <Text style={styles.headerLeft}>Summary</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.contentRow}>
        <Text style={styles.summaryText}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    marginHorizontal: 24,
    marginTop: 12,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 4},
    elevation: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerLeft: {fontSize: 14, fontWeight: '500', color: '#111827'},
  divider: {height: StyleSheet.hairlineWidth, backgroundColor: '#e5e7eb'},
  contentRow: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  summaryText: {
    color: '#111827',
    fontSize: 14,
    lineHeight: 22,
  },
});
