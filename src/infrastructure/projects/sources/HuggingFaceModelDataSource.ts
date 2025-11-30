import type { ProjectDataSource, ExternalProjectRecord } from '@/application/projects/ports/ProjectDataSource';
import { formatMonthYear } from '@/application/projects/utils/ProjectDateFormatter';
import type { ProjectProfile } from '@/domain/projects/ProjectProfile';
import type { HttpClient } from '@/domain/shared/HttpClient';

interface HuggingFaceModel {
  id: string;
  tags?: string[];
  pipeline_tag?: string;
  library_name?: string;
  private?: boolean;
  createdAt?: string;
  updatedAt?: string;
  lastModified?: string;
  likes?: number;
  downloads?: number;
  modelId?: string;
  cardData?: {
    license?: string;
  };
}

const MODEL_IMAGE = 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg';

export class HuggingFaceModelDataSource implements ProjectDataSource {
  constructor(private readonly httpClient: HttpClient) {}

  async fetchProjects(profile: ProjectProfile): Promise<ExternalProjectRecord[]> {
    if (!profile.hasHuggingFaceUser()) {
      return [];
    }

    const username = profile.getHuggingFaceUser()!;
    const models = await this.httpClient.get<HuggingFaceModel[]>(
      `https://huggingface.co/api/models`,
      {
        query: {
          author: username,
          limit: 200,
        },
      }
    );

    return models
      .filter((model) => model.private !== true)
      .map((model) => this.toRecord(model));
  }

  private toRecord(model: HuggingFaceModel): ExternalProjectRecord {
    const tags = model.tags ?? [];
    const categories = ['Hugging Face Model'];
    const languages = new Set<string>();

    if (model.pipeline_tag) {
      categories.push(normalizeLabel(model.pipeline_tag));
    }

    if (model.library_name) {
      languages.add(normalizeLabel(model.library_name));
    }

    for (const tag of tags) {
      if (isLanguageTag(tag)) {
        languages.add(normalizeLabel(tag));
      }
    }

    const updatedAt = model.updatedAt ?? model.lastModified ?? model.createdAt ?? new Date().toISOString();

    return {
      id: `hf-model:${model.id}`,
      title: model.id.split('/').pop() ?? model.id,
      summary: buildSummary(model),
      date: formatMonthYear(updatedAt),
      updatedAt,
      categories,
      languages: Array.from(languages),
      link: `https://huggingface.co/${model.id}`,
      image: MODEL_IMAGE,
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

const LANGUAGE_KEYWORDS = new Set([
  'python',
  'javascript',
  'typescript',
  'rust',
  'go',
  'java',
  'c++',
  'c',
  'c#',
  'scala',
  'swift',
  'r',
  'php',
  'html',
  'css',
  'json',
  'sql',
  'bash',
  'powershell',
  'julia',
  'pytorch',
  'tensorflow',
  'flax',
  'keras',
  'onnx',
  'jax',
]);

function isLanguageTag(tag: string): boolean {
  const normalized = tag.toLowerCase();
  if (LANGUAGE_KEYWORDS.has(normalized)) {
    return true;
  }

  if (/^[a-z]{2}$/.test(normalized)) {
    return true;
  }

  if (normalized.startsWith('language:')) {
    return true;
  }

  return false;
}

function buildSummary(model: HuggingFaceModel): string {
  const segments: string[] = [];

  if (model.pipeline_tag) {
    segments.push(`${normalizeLabel(model.pipeline_tag)} pipeline`);
  }

  if (model.library_name) {
    segments.push(`using ${normalizeLabel(model.library_name)}`);
  }

  if (model.cardData?.license) {
    segments.push(`${model.cardData.license.toUpperCase()} license`);
  }

  if (model.likes) {
    segments.push(`${model.likes} likes`);
  }

  if (model.downloads) {
    segments.push(`${model.downloads} downloads`);
  }

  if (segments.length === 0) {
    return 'Hugging Face model card.';
  }

  return segments.join(' · ');
}
