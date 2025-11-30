import { Tool } from '@/domain/tools/Tool';
import { ToolCollection } from '@/domain/tools/ToolCollection';
import { ToolRepository } from '@/domain/tools/ToolRepository';
import { TOOL_DATA } from './toolData';

export class StaticToolRepository implements ToolRepository {
  async findAll(): Promise<ToolCollection> {
    const tools = TOOL_DATA.map(
      (record) =>
        new Tool({
          id: record.id,
          name: record.name,
          techId: record.techId,
          category: record.category,
          description: record.description,
        })
    );

    return new ToolCollection(tools);
  }
}
