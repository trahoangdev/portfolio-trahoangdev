import { UserDiagnostics } from './UserDiagnostics';

export interface UserDiagnosticsSource {
  capture(): Promise<UserDiagnostics>;
}
