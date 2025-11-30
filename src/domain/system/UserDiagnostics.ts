export interface UserDiagnosticsProps {
  readonly timestampLabel: string;
  readonly ipAddress: string;
  readonly browser: string;
  readonly operatingSystem: string;
}

export class UserDiagnostics {
  private readonly timestampLabel: string;
  private readonly ipAddress: string;
  private readonly browser: string;
  private readonly operatingSystem: string;

  constructor(props: UserDiagnosticsProps) {
    this.timestampLabel = props.timestampLabel.trim() || 'Unknown';
    this.ipAddress = props.ipAddress.trim() || 'Unknown';
    this.browser = props.browser.trim() || 'Unknown';
    this.operatingSystem = props.operatingSystem.trim() || 'Unknown';
  }

  getTimestampLabel(): string {
    return this.timestampLabel;
  }

  getIpAddress(): string {
    return this.ipAddress;
  }

  getBrowser(): string {
    return this.browser;
  }

  getOperatingSystem(): string {
    return this.operatingSystem;
  }

  toDisplayLines(): string[] {
    return [
      `Current date and time: ${this.timestampLabel}`,
      `IP address: ${this.ipAddress}`,
      `Browser type: ${this.browser}`,
      `Operating system: ${this.operatingSystem}`,
    ];
  }
}
