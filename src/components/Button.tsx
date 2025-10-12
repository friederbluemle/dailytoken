import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'light';
  leftIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  leftIcon,
}) => {
  const isLight = variant === 'light';
  return (
    <TouchableOpacity
      style={[
        styles.base,
        isLight ? styles.light : styles.primary,
        disabled && (isLight ? styles.lightDisabled : styles.primaryDisabled),
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityLabel={title}
      accessibilityRole="button"
      accessibilityState={{
        disabled: disabled || loading,
        busy: loading,
      }}
      accessibilityHint={`Performs ${title.toLowerCase()} action`}
    >
      <View style={styles.content}>
        {leftIcon ? <View style={styles.leftIcon}>{leftIcon}</View> : null}
        {loading && (
          <ActivityIndicator
            color={isLight ? '#111827' : '#ffffff'}
            style={styles.spinner}
          />
        )}
        <Text
          style={[
            styles.text,
            {color: isLight ? '#111827' : '#FFFFFF'},
            disabled &&
              (isLight ? styles.textDisabledLight : styles.textDisabled),
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 18,
    width: '100%',
  },
  primary: {
    backgroundColor: '#000000',
  },
  primaryDisabled: {
    backgroundColor: '#222222',
  },
  light: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 3},
    elevation: 2,
  },
  lightDisabled: {
    backgroundColor: '#f3f4f6',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIcon: {
    marginRight: 8,
  },
  spinner: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  textDisabled: {
    color: '#808080',
  },
  textDisabledLight: {
    color: '#9ca3af',
  },
});
