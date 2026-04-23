import type { UserDiagnosticsSource } from '@/features/system/domain/UserDiagnosticsSource';
import type { UserDiagnostics } from '@/features/system/domain/UserDiagnostics';

export class IntroDiagnosticsController {
  constructor(private readonly diagnosticsSource: UserDiagnosticsSource) {}

  async loadDiagnostics(): Promise<UserDiagnostics> {
    return this.diagnosticsSource.capture();
  }
}
