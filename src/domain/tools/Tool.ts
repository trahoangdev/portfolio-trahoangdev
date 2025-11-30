import { Tag } from '../shared/Tag';

export interface ToolProps {
  readonly id: string;
  readonly name: string;
  readonly techId: string;
  readonly category: string;
  readonly description?: string;
}

export interface ToolSnapshot {
  id: string;
  name: string;
  techId: string;
  category: {
    label: string;
    slug: string;
  };
  description?: string;
}

export class Tool {
  private readonly id: string;
  private readonly name: string;
  private readonly techId: string;
  private readonly category: Tag;
  private readonly description?: string;

  constructor(props: ToolProps) {
    this.id = props.id.trim();
    this.name = props.name.trim();
    this.techId = props.techId.trim();
    this.category = new Tag({ label: props.category });
    this.description = props.description?.trim();

    this.ensureInvariants();
  }

  private ensureInvariants(): void {
    if (!this.id) {
      throw new Error('Tool requires a stable identifier.');
    }

    if (!this.name) {
      throw new Error('Tool requires a display name.');
    }

    if (!this.techId) {
      throw new Error('Tool requires a tech identifier.');
    }
  }

  getCategory(): Tag {
    return this.category;
  }

  getTechId(): string {
    return this.techId;
  }

  getName(): string {
    return this.name;
  }

  createSnapshot(): ToolSnapshot {
    return {
      id: this.id,
      name: this.name,
      techId: this.techId,
      category: {
        label: this.category.getLabel(),
        slug: this.category.getSlug(),
      },
      description: this.description,
    };
  }
}
