import { ToolCollection } from './ToolCollection';

export interface ToolRepository {
  findAll(): Promise<ToolCollection>;
}
