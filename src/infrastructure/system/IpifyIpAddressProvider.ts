import type { IpAddressProvider } from '@/domain/system/IpAddressProvider';

interface IpifyResponse {
  ip?: string;
}

const IPIFY_ENDPOINT = 'https://api.ipify.org?format=json';

export class IpifyIpAddressProvider implements IpAddressProvider {
  async fetch(): Promise<string> {
    const response = await fetch(IPIFY_ENDPOINT);
    if (!response.ok) {
      throw new Error('Failed to fetch IP address');
    }

    const data = (await response.json()) as IpifyResponse;
    return data.ip ?? 'Unknown';
  }
}
