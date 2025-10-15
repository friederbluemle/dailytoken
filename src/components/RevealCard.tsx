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
                width={100}
                height={100}
                accessibilityElementsHidden
              />
            </View>
          </View>
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
    margin: 24,
  },
  mysteryWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerWrap: {
    position: 'absolute',
    width: 128,
    height: 128,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerRing: {
    position: 'absolute',
    width: 128,
    height: 128,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: '#e5e7eb55',
    borderTopColor: '#e5e7eb',
  },
  mysteryCircle: {
    width: 100,
    height: 100,
    borderRadius: 52,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#3f3f46',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#FFFFFF52',
    fontSize: 18,
    fontWeight: '500',
  },
  dateLabel: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '500',
    marginTop: 8,
    marginBottom: 40,
  },
  cardButton: {
    width: '100%',
  },
  cardBgImage: {
    borderRadius: 28,
    resizeMode: 'cover',
  },
});
