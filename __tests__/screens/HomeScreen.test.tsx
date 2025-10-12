import React from 'react';

import {describe, expect, it, jest} from '@jest/globals';
import {act, fireEvent, render, screen} from '@testing-library/react-native';

import {HomeScreen} from '../../src/screens/HomeScreen';

describe('HomeScreen', () => {
  it('renders Daily Token header and Reveal button initially', () => {
    render(<HomeScreen />);
    expect(screen.getByText('Daily Token')).toBeOnTheScreen();
    const reveal = screen.getByText('Reveal');
    expect(reveal).toBeOnTheScreen();
  });

  it('reveals token card after tapping Reveal', async () => {
    jest.useFakeTimers();
    render(<HomeScreen />);
    fireEvent.press(screen.getByText('Reveal'));
    await act(async () => {
      jest.advanceTimersByTime(800);
    });
    expect(screen.getByText('Plasma')).toBeOnTheScreen();
    expect(screen.getByText('Trade on Matcha')).toBeOnTheScreen();
    jest.useRealTimers();
  });
});
