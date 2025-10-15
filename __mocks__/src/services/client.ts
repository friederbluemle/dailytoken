import type {DailyToken} from '../../../src/services/types';

function chainIdToSlug(id?: number): string {
  switch (id) {
    case 1:
      return 'ethereum';
    case 56:
      return 'bsc';
    case 137:
      return 'polygon';
    case 10:
      return 'optimism';
    case 42161:
      return 'arbitrum';
    case 8453:
      return 'base';
    default:
      return 'ethereum';
  }
}

export async function getDailyToken(): Promise<DailyToken> {
  const json = require('../../../__tests__/fixtures/api-reponse.json');
  const token: DailyToken = {
    id: json.id ?? 'unknown',
    name: json.name ?? 'Unknown',
    symbol: json.symbol ?? 'TKN',
    contractAddress: json.address ?? '',
    chainSlug: chainIdToSlug(json.chainId) ?? 'ethereum',
    chainId: json.chainId ?? 1,
    priceUsd: json.price ?? 0,
    changePct: json.priceChangePercentage ?? 0,
    resources: Array.isArray(json.resources)
      ? json.resources.filter((r: any) => r && r.title && r.url)
      : undefined,
    summary: json.summary,
  };
  return token;
}
