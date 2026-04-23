export interface BrowserFingerprint {
  browser: string;
  operatingSystem: string;
}

export interface BrowserInspector {
  inspect(): BrowserFingerprint;
}
