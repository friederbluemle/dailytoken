import React from 'react';

import {describe, expect, it, jest} from '@jest/globals';
import {fireEvent, render, screen} from '@testing-library/react-native';

import {HomeScreen} from '../../src/screens/HomeScreen';

// Mock services client so tests never hit the real network
jest.mock('../../src/services/client', () => {
  const json = require('../fixtures/api-reponse.json');
  return {
    getDailyToken: jest.fn(async () => ({
      id: json.id,
      name: json.name,
      symbol: json.symbol,
      contractAddress: json.address,
      chainSlug: 'ethereum',
      priceUsd: json.price,
      changePct: json.priceChangePercentage,
    })),
  };
});

describe('HomeScreen', () => {
  it('renders Daily Token header and Reveal button initially', () => {
    render(<HomeScreen />);
    expect(screen.getByText('Daily Token')).toBeOnTheScreen();
    const reveal = screen.getByText('Reveal');
    expect(reveal).toBeOnTheScreen();
  });

  it('reveals token card after tapping Reveal', async () => {
    render(<HomeScreen />);
    fireEvent.press(screen.getByText('Reveal'));
    // Wait for token name coming from API fixture (api-reponse.json)
    const nameEl = await screen.findByText(/FOOBAR/i, {}, {timeout: 3000});
    expect(nameEl).toBeOnTheScreen();
    expect(screen.getByText('Trade on Matcha')).toBeOnTheScreen();
  });
});
