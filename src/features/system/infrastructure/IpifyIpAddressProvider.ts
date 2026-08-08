import type { IpAddressProvider } from '@/features/system/domain/IpAddressProvider';

interface IpAddressResponse {
  ip?: string;
}

const IPIFY_ENDPOINT = '/api/system/ip';

export class SameOriginIpAddressProvider implements IpAddressProvider {
  async fetch(): Promise<string> {
    const response = await fetch(IPIFY_ENDPOINT);
    if (!response.ok) {
      throw new Error('Failed to fetch IP address');
    }

    const data = (await response.json()) as IpAddressResponse;
    return data.ip ?? 'Unknown';
  }
}
