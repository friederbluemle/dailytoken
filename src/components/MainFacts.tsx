import React from 'react';
import {Linking, Pressable, StyleSheet, Text, View} from 'react-native';

export interface MainFactsProps {
  resources?: {title: string; url: string}[];
}

interface FactProps {
  title: string;
  url?: string;
}

const FactRow: React.FC<FactProps> = ({title, url}) => {
  const displayUrl = url && url.length > 46 ? `${url.slice(0, 46)}…` : url;
  const content = (
    <View style={styles.factRow}>
      <Text style={styles.factText}>{title}</Text>
      <Text style={styles.factSubtitle}>{displayUrl}</Text>
    </View>
  );
  if (!url) {
    return content;
  }
  return (
    <Pressable
      accessibilityRole="link"
      accessibilityHint={`Opens: ${url}`}
      onPress={async () => {
        try {
          await Linking.openURL(url);
        } catch {
          // ignore
        }
      }}
    >
      {content}
    </Pressable>
  );
};

export const MainFacts: React.FC<MainFactsProps> = ({resources}) => {
  const items = (resources || []).filter(r => r && r.title);
  if (items.length === 0) {
    return null;
  }
  const visible = items.slice(0, 3);
  return (
    <View style={styles.container} accessibilityRole="summary">
      <View style={styles.headerRow}>
        <Text style={styles.headerLeft}>Main facts</Text>
      </View>
      <View style={styles.divider} />
      {visible.map((r, idx) => (
        <View key={`${r.title}-${idx}`}>
          <FactRow title={r.title} url={r.url} />
          {idx < visible.length - 1 ? <View style={styles.rowDivider} /> : null}
        </View>
      ))}
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
  factRow: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  factText: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 20,
  },
  factSubtitle: {
    color: '#11182755',
    fontSize: 13,
    paddingTop: 8,
  },
  rowDivider: {height: StyleSheet.hairlineWidth, backgroundColor: '#e5e7eb'},
});
