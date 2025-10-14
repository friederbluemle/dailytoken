import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';

import Matcha from '../assets/matcha.svg';
import Wreath from '../assets/wreath.svg';
import {Button} from './Button';

interface TokenCardProps {
  name: string; // e.g., Plasma
  symbol: string; // e.g., XPL
  priceUsd: number;
  changePct: number; // e.g., 7.18 means +7.18%
  onTrade: () => void;
  logoUrl?: string;
}

export const TokenCard: React.FC<TokenCardProps> = ({
  name,
  symbol,
  priceUsd,
  changePct,
  onTrade,
  logoUrl,
}) => {
  const changeColor = changePct >= 0 ? '#10b981' : '#ef4444';
  const badge = `${changePct >= 0 ? '▲' : '▼'} ${Math.abs(changePct).toFixed(
    2,
  )}%`;
  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={require('../assets/card-bg.png')}
        style={styles.card}
        imageStyle={styles.cardBgImage}
      >
        <View style={styles.iconRow}>
          <Wreath width={32} height={64} style={styles.wreathLeft} />
          <View style={styles.logoCircle}>
            {logoUrl ? (
              <Image
                source={{uri: logoUrl}}
                style={styles.logoImage}
                resizeMode="cover"
                accessibilityIgnoresInvertColors
                accessible
                accessibilityLabel="Token logo"
              />
            ) : (
              <Text style={styles.logoTicker} accessibilityLabel="Token ticker">
                {symbol?.toUpperCase()}
              </Text>
            )}
          </View>
          <Wreath width={32} height={64} style={styles.wreathRight} />
        </View>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.dot}> · </Text>
          <Text style={styles.symbol}>{symbol}</Text>
        </View>
        <View style={styles.rowCenter}>
          <Text style={styles.price}>${priceUsd.toFixed(4)}</Text>
          <Text
            style={[
              styles.change,
              {backgroundColor: '#0f172a20', color: changeColor},
            ]}
          >
            {badge}
          </Text>
        </View>
        <View style={styles.cardButton}>
          <Button
            title="Trade on Matcha"
            onPress={onTrade}
            variant="light"
            leftIcon={<Matcha width={18} height={18} />}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {paddingHorizontal: 24},
  card: {
    backgroundColor: '#0b3b33',
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 10,
  },
  wreathLeft: {marginRight: 8},
  wreathRight: {marginLeft: 8, transform: [{scaleX: -1}]},
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#83c5be55',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  nameRow: {flexDirection: 'row', alignItems: 'center', marginTop: 6},
  name: {color: '#d1fae5', fontSize: 14},
  dot: {color: '#d1fae5', opacity: 0.8},
  symbol: {color: '#d1fae5', fontSize: 14, opacity: 0.9},
  rowCenter: {flexDirection: 'row', alignItems: 'center', marginTop: 12},
  price: {color: '#ffffff', fontSize: 22, fontWeight: '700'},
  change: {
    marginLeft: 8,
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  cardButton: {width: '100%', marginTop: 16},
  cardBgImage: {
    borderRadius: 28,
    resizeMode: 'cover',
  },
  logoImage: {
    width: 76,
    height: 76,
    borderRadius: 38,
  },
  logoTicker: {
    color: '#d1fae5',
    fontSize: 28,
    fontWeight: '700',
  },
});
