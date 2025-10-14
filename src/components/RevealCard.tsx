import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Easing,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import MagicWand from '../assets/magic-wand.svg';
import QuestionMark from '../assets/question-mark.svg';
import Wreath from '../assets/wreath.svg';
import {Button} from './Button';

interface RevealCardProps {
  loading?: boolean;
  onReveal: () => void;
  dateLabel?: string;
}

const RevealCard: React.FC<RevealCardProps> = ({
  dateLabel,
  loading,
  onReveal,
}) => {
  const rotate = useRef(new Animated.Value(0)).current;
  const date =
    dateLabel ||
    new Date().toLocaleDateString(undefined, {
      month: 'long',
      day: '2-digit',
    });

  useEffect(() => {
    if (loading) {
      rotate.setValue(0);
      const anim = Animated.loop(
        Animated.timing(rotate, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      );
      anim.start();
      return () => {
        rotate.stopAnimation();
      };
    } else {
      rotate.stopAnimation();
    }
  }, [loading, rotate]);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={require('../assets/card-bg.png')}
        style={styles.card}
        imageStyle={styles.cardBgImage}
        accessible
        accessibilityLabel="Mystery token card"
      >
        <View style={styles.iconRow}>
          <Wreath width={32} height={64} style={styles.wreathLeft} />
          <View style={styles.mysteryWrap}>
            <View style={styles.spinnerWrap} pointerEvents="none">
              {loading ? (
                <Animated.View
                  accessibilityRole="progressbar"
                  style={[styles.spinnerRing, {transform: [{rotate: spin}]}]}
                />
              ) : null}
            </View>
            <View style={styles.mysteryCircle}>
              <QuestionMark
                width={56}
                height={56}
                accessibilityElementsHidden
              />
            </View>
          </View>
          <Wreath width={32} height={64} style={styles.wreathRight} />
        </View>
        <Text style={styles.label}>Reveal token for</Text>
        <Text style={styles.dateLabel}>{date}</Text>
        <View style={styles.cardButton}>
          <Button
            title="Reveal"
            onPress={onReveal}
            disabled={!!loading}
            variant="light"
            leftIcon={<MagicWand width={18} height={18} />}
          />
        </View>
      </ImageBackground>
    </View>
  );
};
export default RevealCard;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#0a0a0a',
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
  mysteryWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerWrap: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerRing: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: '#e5e7eb55',
    borderTopColor: '#e5e7eb',
  },
  mysteryCircle: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#3f3f46',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#9ca3af',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 8,
  },
  dateLabel: {
    color: '#e5e7eb',
    fontSize: 28,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 24,
  },
  cardButton: {
    width: '100%',
  },
  cardBgImage: {
    borderRadius: 28,
    resizeMode: 'cover',
  },
});
