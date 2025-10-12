/* eslint-env jest */

import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  const anim = () => ({start: jest.fn(cb => cb?.({finished: true}))});
  rn.Animated.timing = jest.fn(anim);
  rn.Animated.spring = jest.fn(anim);
  rn.Animated.decay = jest.fn(anim);
  rn.Animated.sequence = jest.fn(anim);
  rn.Animated.parallel = jest.fn(anim);
  rn.Animated.stagger = jest.fn(anim);
  rn.Animated.loop = jest.fn(anim);
  const OriginalValue = rn.Animated.Value;
  rn.Animated.Value = function (value) {
    const instance = new OriginalValue(value);
    instance.interpolate = jest.fn(() => ({
      __getValue: () => value,
      interpolate: jest.fn(),
    }));
    return instance;
  };
  return rn;
});
