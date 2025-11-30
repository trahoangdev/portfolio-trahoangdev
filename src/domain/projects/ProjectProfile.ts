export interface ProjectProfileProps {
  githubUser?: string | null;
  huggingFaceUser?: string | null;
}

export class ProjectProfile {
  private readonly githubUser?: string;
  private readonly huggingFaceUser?: string;

  constructor(props: ProjectProfileProps) {
    const github = props.githubUser?.trim();
    const huggingFace = props.huggingFaceUser?.trim();

    if (!github && !huggingFace) {
      throw new Error('ProjectProfile requires at least one platform user id.');
    }

    this.githubUser = github || undefined;
    this.huggingFaceUser = huggingFace || undefined;
  }

  getGitHubUser(): string | undefined {
    return this.githubUser;
  }

  hasGitHubUser(): boolean {
    return Boolean(this.githubUser);
  }

  getHuggingFaceUser(): string | undefined {
    return this.huggingFaceUser;
  }

  hasHuggingFaceUser(): boolean {
    return Boolean(this.huggingFaceUser);
  }
}

