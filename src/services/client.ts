import {ApiTokenResponse, DailyToken} from './types';

// Default production endpoint; can be overridden via env var
const DEFAULT_ENDPOINT =
  'https://dailytoken-relay-rho.vercel.app/api/token/trending';
const ENDPOINT = process.env.DAILYTOKEN_API_URL ?? DEFAULT_ENDPOINT;

// Required app token header for production relay
const APP_TOKEN_HEADER =
  '8a7144e4d11178082b8d9dc493b21356419f8b3f46b69efdf850231e7bcc5593';

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
  const res = await fetch(ENDPOINT, {
    headers: {
      'x-app-token': APP_TOKEN_HEADER,
    },
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}`);
  }
  const json = (await res.json()) as ApiTokenResponse;

  const id = json.id ?? 'unknown';
  const name = json.name ?? 'Unknown';
  const symbol = json.symbol ?? 'TKN';
  const contractAddress = json.address ?? '';

  const chainSlug = chainIdToSlug(json.chainId);

  const priceUsd = json.price ?? 0;
  const changePct = json.priceChangePercentage ?? 0;

  if (!contractAddress) {
    throw new Error('Missing contract address in API response');
  }

  return {
    id,
    name,
    symbol,
    contractAddress,
    chainSlug,
    priceUsd,
    changePct,
    logoUrl: json.logo,
    marketCapUsd: json.marketCap,
    fdvUsd: json.fullyDilutedValuation,
    volumeUsd: json.totalVolume,
    totalSupply: json.totalSupply,
    circulatingSupply: json.circulatingSupply,
    holdersCount: json.holders,
  };
}
