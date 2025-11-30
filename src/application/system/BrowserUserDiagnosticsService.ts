import type { UserDiagnosticsSource } from '@/domain/system/UserDiagnosticsSource';
import type { IpAddressProvider } from '@/domain/system/IpAddressProvider';
import type { BrowserInspector } from '@/domain/system/BrowserInspector';
import type { SystemClock } from '@/domain/system/SystemClock';
import { UserDiagnostics } from '@/domain/system/UserDiagnostics';

export class BrowserUserDiagnosticsService implements UserDiagnosticsSource {
  constructor(
    private readonly ipAddressProvider: IpAddressProvider,
    private readonly browserInspector: BrowserInspector,
    private readonly clock: SystemClock,
  ) {}

  async capture(): Promise<UserDiagnostics> {
    const [ipAddress, fingerprint] = await Promise.all([
      this.safeFetchIpAddress(),
      this.safeInspectBrowser(),
    ]);

    const timestamp = this.clock.format(this.clock.now());

    return new UserDiagnostics({
      timestampLabel: timestamp,
      ipAddress,
      browser: fingerprint.browser,
      operatingSystem: fingerprint.operatingSystem,
    });
  }

  private async safeFetchIpAddress(): Promise<string> {
    try {
      return await this.ipAddressProvider.fetch();
    } catch {
      return 'Unavailable';
    }
  }

  private async safeInspectBrowser(): Promise<{ browser: string; operatingSystem: string }> {
    try {
      return this.browserInspector.inspect();
    } catch {
      return { browser: 'Unknown', operatingSystem: 'Unknown' };
    }
  }
}
