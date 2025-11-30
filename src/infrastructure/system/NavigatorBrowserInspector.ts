import type { BrowserFingerprint, BrowserInspector } from '@/domain/system/BrowserInspector';

function getUserAgent(): string {
  if (typeof navigator === 'undefined') {
    return '';
  }

  return navigator.userAgent || '';
}

function detectBrowser(userAgent: string): string {
  const ua = userAgent.toLowerCase();

  if (ua.includes('edg/')) {
    return 'Microsoft Edge';
  }

  if (ua.includes('chrome')) {
    return ua.includes('brave') ? 'Brave' : 'Chrome';
  }

  if (ua.includes('safari')) {
    return 'Safari';
  }

  if (ua.includes('firefox')) {
    return 'Firefox';
  }

  if (ua.includes('opera') || ua.includes('opr/')) {
    return 'Opera';
  }

  if (ua.includes('msie') || ua.includes('trident')) {
    return 'Internet Explorer';
  }

  return 'Unknown';
}

function detectOperatingSystem(userAgent: string): string {
  const ua = userAgent.toLowerCase();

  if (ua.includes('windows nt 10')) {
    return 'Windows 10/11';
  }

  if (ua.includes('windows nt 6.3')) {
    return 'Windows 8.1';
  }

  if (ua.includes('windows nt 6.2')) {
    return 'Windows 8';
  }

  if (ua.includes('windows nt 6.1')) {
    return 'Windows 7';
  }

  if (ua.includes('mac os x')) {
    return 'macOS';
  }

  if (ua.includes('iphone') || ua.includes('ipad')) {
    return 'iOS';
  }

  if (ua.includes('android')) {
    return 'Android';
  }

  if (ua.includes('linux')) {
    return 'Linux';
  }

  return 'Unknown';
}

export class NavigatorBrowserInspector implements BrowserInspector {
  inspect(): BrowserFingerprint {
    const userAgent = getUserAgent();
    return {
      browser: detectBrowser(userAgent),
      operatingSystem: detectOperatingSystem(userAgent),
    };
  }
}
