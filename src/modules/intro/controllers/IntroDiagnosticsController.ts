import type { UserDiagnosticsSource } from '@/domain/system/UserDiagnosticsSource';
import type { UserDiagnostics } from '@/domain/system/UserDiagnostics';

export class IntroDiagnosticsController {
  constructor(private readonly diagnosticsSource: UserDiagnosticsSource) {}

  async loadDiagnostics(): Promise<UserDiagnostics> {
    return this.diagnosticsSource.capture();
  }
}
