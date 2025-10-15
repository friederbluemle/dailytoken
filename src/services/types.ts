export interface NewsResource {
  title: string;
  url: string;
}

export interface ApiTokenResponse {
  id?: string;
  address?: string; // main contract address
  name?: string;
  description?: string;
  symbol?: string;
  chainId?: number; // e.g., 1 (Ethereum), 56 (BSC), 137 (Polygon)
  categories?: string[];
  logo?: string;
  price?: number; // USD
  priceChange?: number; // absolute delta in USD (not used)
  priceChangePercentage?: number; // percent change 24h
  marketCap?: number; // USD
  fullyDilutedValuation?: number; // USD
  totalVolume?: number; // USD
  totalSupply?: number;
  circulatingSupply?: number;
  holders?: number;
  resources?: NewsResource[];
  summary?: string;
}

export interface DailyToken {
  id: string;
  name: string;
  symbol: string;
  contractAddress: string;
  chainSlug: string; // e.g., 'ethereum', 'bsc'
  chainId: number; // e.g., 1, 56
  priceUsd: number;
  changePct: number;
  logoUrl?: string;
  marketCapUsd?: number;
  fdvUsd?: number;
  volumeUsd?: number;
  totalSupply?: number;
  circulatingSupply?: number;
  holdersCount?: number;
  resources?: NewsResource[];
  summary?: string;
}
