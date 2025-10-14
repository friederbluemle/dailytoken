import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import LottieView from 'lottie-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {DailyHeader, RevealCard, TokenCard} from '../components';
import {buildMatchaTradeUrl} from '../utils';

function msUntilNextUtcMidnight(now: Date = new Date()): number {
  const next = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 1,
      0,
      0,
      0,
      0,
    ),
  );
  return next.getTime() - now.getTime();
}

function formatHms(ms: number): {h: number; m: number; s: number} {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return {h, m, s};
}

export const HomeScreen = () => {
  const [revealed, setRevealed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remainingMs, setRemainingMs] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const tokenAnim = useRef(new Animated.Value(0)).current;

  const token = {
    name: 'Plasma',
    symbol: 'XPL',
    priceUsd: 0.8964,
    changePct: 7.18,
    // Example ERC-20 address on Ethereum (WETH)
    contractAddress: '0x405fbc9004d857903bfd6b3357792d71a50726b0',
  };

  const handleReveal = () => {
    setLoading(true);
    tokenAnim.setValue(0);
    setTimeout(() => {
      setLoading(false);
      setShowConfetti(true);
      setRevealed(true);
      setRemainingMs(msUntilNextUtcMidnight());
      // Defer only the animation start to the next frame
      requestAnimationFrame(() => {
        Animated.timing(tokenAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }).start();
      });
    }, 1000);
  };

  // Tick countdown when revealed
  useEffect(() => {
    if (!revealed) {
      setRemainingMs(null);
      return;
    }
    // Initialize remaining time if not yet set
    setRemainingMs(prev => (prev == null ? msUntilNextUtcMidnight() : prev));
    const id = setInterval(() => {
      setRemainingMs(curr => {
        const nextVal = (curr == null ? msUntilNextUtcMidnight() : curr) - 1000;
        if (nextVal <= 0) {
          clearInterval(id);
          setRevealed(false);
          return 0;
        }
        return nextVal;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [revealed]);

  const time = useMemo(() => {
    if (remainingMs == null) {
      return null;
    }
    const {h, m, s} = formatHms(remainingMs);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return {h, m, s, label: `Next reveal in ${h}h : ${pad(m)}m : ${pad(s)}s`};
  }, [remainingMs]);

  const date = revealed
    ? new Date().toLocaleDateString(undefined, {
        month: 'short',
        day: '2-digit',
      })
    : undefined;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <DailyHeader dateLabel={date} />
        {revealed ? (
          <>
            <Animated.View
              style={{
                opacity: tokenAnim,
                transform: [
                  {
                    scale: tokenAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.98, 1],
                    }),
                  },
                ],
              }}
            >
              <TokenCard
                name={token.name}
                symbol={token.symbol}
                priceUsd={token.priceUsd}
                changePct={token.changePct}
                onTrade={async () => {
                  const url = buildMatchaTradeUrl(
                    token.contractAddress,
                    '20',
                    'bsc',
                  );
                  if (!url) {
                    return;
                  }
                  try {
                    await Linking.openURL(url);
                  } catch (e) {
                    // no-op: likely no browser available on device/emulator
                  }
                }}
              />
            </Animated.View>
          </>
        ) : (
          <>
            <RevealCard loading={loading} onReveal={handleReveal} />
          </>
        )}
        {revealed && time?.label ? (
          <Text style={styles.countdown} accessibilityLiveRegion="polite">
            {time.label}
          </Text>
        ) : null}
        <View style={{height: 8}} />
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          For discovery & entertainment. Not investment advice.
        </Text>
      </View>
      {/* Preload confetti composition to avoid first-play jank */}
      <LottieView
        source={require('../assets/lottie/confetti.json')}
        autoPlay={false}
        loop={false}
        cacheComposition
        style={{position: 'absolute', width: 1, height: 1, opacity: 0}}
      />
      {showConfetti ? (
        <View
          pointerEvents="none"
          style={styles.confettiOverlay}
          accessibilityLabel="Confetti celebration"
          accessibilityLiveRegion="polite"
        >
          <LottieView
            source={require('../assets/lottie/confetti.json')}
            autoPlay
            loop={false}
            resizeMode="cover"
            style={StyleSheet.absoluteFillObject}
            cacheComposition
            onAnimationFinish={() => setShowConfetti(false)}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
  },
  content: {paddingBottom: 24},
  countdown: {
    textAlign: 'center',
    color: '#9ca3af',
    marginTop: 8,
    fontSize: 13,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 12,
  },
  footerText: {
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 12,
  },
  confettiOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
