import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface StatProps {
  label: string;
  value: string;
}

const StatCell: React.FC<StatProps> = ({label, value}) => (
  <View style={styles.cell}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export interface TokenStatsProps {
  marketCapUsd?: number;
  volumeUsd?: number;
  fdvUsd?: number;
  holdersCount?: number;
  totalSupply?: number;
  circulatingSupply?: number;
  symbol?: string; // for supply suffix
}

function formatShort(
  n?: number,
  {currency = false}: {currency?: boolean} = {},
): string {
  if (n == null || isNaN(n)) {
    return '—';
  }
  const abs = Math.abs(n);
  const sign = n < 0 ? '-' : '';
  const units: [number, string][] = [
    [1e12, 'T'],
    [1e9, 'B'],
    [1e6, 'M'],
    [1e3, 'K'],
  ];
  for (const [value, suffix] of units) {
    if (abs >= value) {
      const num = (abs / value)
        .toFixed(2)
        .replace(/\.0+$/, '')
        .replace(/(\.[1-9])0$/, '$1');
      return `${sign}${currency ? '$' : ''}${num}${suffix}`;
    }
  }
  const small = abs
    .toFixed(2)
    .replace(/\.0+$/, '')
    .replace(/(\.[1-9])0$/, '$1');
  return `${sign}${currency ? '$' : ''}${small}`;
}

function formatSupply(n?: number, symbol?: string): string {
  if (n == null || isNaN(n)) {
    return '—';
  }
  const num = formatShort(n, {currency: false});
  const sym = symbol ? ` ${symbol.toUpperCase()}` : '';
  return `${num}${sym}`;
}

export const TokenStats: React.FC<TokenStatsProps> = ({
  marketCapUsd,
  volumeUsd,
  fdvUsd,
  holdersCount,
  totalSupply,
  circulatingSupply,
  symbol,
}) => {
  return (
    <View style={styles.container} accessibilityRole="summary">
      <View style={styles.headerRow}>
        <Text style={styles.headerLeft}>Token stats</Text>
        <Text style={styles.headerRight}>CoinGecko</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.grid}>
        <StatCell
          label="Market cap"
          value={formatShort(marketCapUsd, {currency: true})}
        />
        <StatCell
          label="Volume"
          value={formatShort(volumeUsd, {currency: true})}
        />
        <StatCell label="FDV" value={formatShort(fdvUsd, {currency: true})} />
        <StatCell
          label="Holders"
          value={holdersCount != null ? formatShort(holdersCount) : '—'}
        />
        <StatCell
          label="Total supply"
          value={formatSupply(totalSupply, symbol)}
        />
        <StatCell
          label="Circulating supply"
          value={formatSupply(circulatingSupply, symbol)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    marginHorizontal: 24,
    marginTop: 16,
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
  headerRight: {fontSize: 13, color: '#9ca3af'},
  divider: {height: StyleSheet.hairlineWidth, backgroundColor: '#e5e7eb'},
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: '50%',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e7eb',
  },
  label: {fontSize: 14, color: '#00000080', marginBottom: 6, fontWeight: '400'},
  value: {fontSize: 18, color: '#000', fontWeight: '500'},
});
