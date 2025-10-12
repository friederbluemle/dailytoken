export function buildMatchaTradeUrl(
  contractAddress: string,
  amountUsd: string = '20',
  chainSlug: string = 'ethereum',
): string | null {
  const usdcAddress = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606EB48';

  if (!chainSlug || !usdcAddress || !contractAddress) {
    return null;
  }

  const baseUrl = `https://matcha.xyz/tokens/${chainSlug}/${contractAddress}`;

  const params: Record<string, string> = {};

  if (Number(amountUsd) > 0) {
    params.sellAmount = String(amountUsd);
  }
  params.sellChain = '1';
  params.sellAddress = usdcAddress.toLowerCase();

  const query = Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');

  return `${baseUrl}?${query}`;
}
