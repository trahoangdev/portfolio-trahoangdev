import type { ProjectDataSource, ExternalProjectRecord } from '@/application/projects/ports/ProjectDataSource';
import { formatMonthYear } from '@/application/projects/utils/ProjectDateFormatter';
import type { ProjectProfile } from '@/domain/projects/ProjectProfile';
import type { HttpClient } from '@/domain/shared/HttpClient';

interface HuggingFaceSpace {
  id: string;
  private?: boolean;
  sdk?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  lastModified?: string;
  likes?: number;
  trendingScore?: number;
}

const SPACE_IMAGE = 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg';

export class HuggingFaceSpaceDataSource implements ProjectDataSource {
  constructor(private readonly httpClient: HttpClient) {}

  async fetchProjects(profile: ProjectProfile): Promise<ExternalProjectRecord[]> {
    if (!profile.hasHuggingFaceUser()) {
      return [];
    }

    const username = profile.getHuggingFaceUser()!;
    const spaces = await this.httpClient.get<HuggingFaceSpace[]>(
      `https://huggingface.co/api/spaces`,
      {
        query: {
          author: username,
          limit: 200,
        },
      }
    );

    return spaces
      .filter((space) => space.private !== true)
      .map((space) => this.toRecord(space));
  }

  private toRecord(space: HuggingFaceSpace): ExternalProjectRecord {
    const tags = space.tags ?? [];
    const categories = ['Hugging Face Space'];
    const languages = new Set<string>();

    if (space.sdk) {
      categories.push(`${normalizeLabel(space.sdk)} SDK`);
      languages.add(normalizeLabel(space.sdk));
    }

    for (const tag of tags) {
      if (isRelevantTag(tag)) {
        languages.add(normalizeLabel(tag));
      }
    }

    const updatedAt = space.updatedAt ?? space.lastModified ?? space.createdAt ?? new Date().toISOString();

    return {
      id: `hf-space:${space.id}`,
      title: space.id.split('/').pop() ?? space.id,
      summary: buildSummary(space),
      date: formatMonthYear(updatedAt),
      updatedAt,
      categories,
      languages: Array.from(languages),
      link: `https://huggingface.co/spaces/${space.id}`,
      image: SPACE_IMAGE,
    };
  }
}

function normalizeLabel(value: string): string {
  return value
    .split(/[-_/]/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

const RELEVANT_TAGS = new Set([
  'python',
  'javascript',
  'typescript',
  'rust',
  'docker',
  'gradio',
  'streamlit',
  'static',
  'anycoder',
  'mcp-server',
  'webgpu',
  'webgl',
  'react',
  'vue',
  'svelte',
]);

function isRelevantTag(tag: string): boolean {
  const normalized = tag.toLowerCase();
  return RELEVANT_TAGS.has(normalized) || /^[a-z]{2}$/.test(normalized);
}

function buildSummary(space: HuggingFaceSpace): string {
  const segments: string[] = [];

  if (space.sdk) {
    segments.push(`${normalizeLabel(space.sdk)} SDK`);
  }

  if (space.likes) {
    segments.push(`${space.likes} likes`);
  }

  if (space.trendingScore) {
    segments.push(`Trending score ${space.trendingScore}`);
  }

  if (segments.length === 0) {
    return 'Interactive Hugging Face Space.';
  }

  return segments.join(' · ');
}
