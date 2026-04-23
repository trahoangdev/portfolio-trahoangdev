import type { ProjectDataSource, ExternalProjectRecord } from '@/features/projects/application/ports/ProjectDataSource';
import { formatMonthYear } from '@/features/projects/application/utils/ProjectDateFormatter';
import type { ProjectProfile } from '@/features/projects/domain/ProjectProfile';
import type { HttpClient } from '@/features/shared/domain/HttpClient';

interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  updated_at: string;
  pushed_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface GitHubProjectDataSourceOptions {
  perPage?: number;
  authToken?: string;
}

export class GitHubProjectDataSource implements ProjectDataSource {
  private readonly perPage: number;
  private readonly authToken?: string;

  constructor(
    private readonly httpClient: HttpClient,
    options: GitHubProjectDataSourceOptions = {}
  ) {
    this.perPage = options.perPage ?? 100;
    this.authToken = options.authToken;
  }

  async fetchProjects(profile: ProjectProfile): Promise<ExternalProjectRecord[]> {
    return []; // Tạm ẩn không lấy dự án từ GitHub nữa
    /*
    if (!profile.hasGitHubUser()) {
      return [];
    }

    const username = profile.getGitHubUser()!;

    try {
      const repositories = await this.requestRepositories(username);

      const projects = repositories
        .filter((repo) => !repo.fork && !repo.archived)
        .map((repo) => this.toProjectRecord(repo, []));

      return projects;
    } catch (error) {
      console.error('[GitHubProjectDataSource] Failed to fetch GitHub projects:', error);
      return [];
    }
    */
  }

  private async requestRepositories(username: string): Promise<GitHubRepository[]> {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'PortfolioProjectFetcher',
    };

    if (this.authToken) {
      headers.Authorization = `Bearer ${this.authToken}`;
    }

    return this.httpClient.get<GitHubRepository[]>(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos`,
      {
        headers,
        query: {
          per_page: this.perPage,
          sort: 'updated',
          direction: 'desc',
        },
      }
    );
  }

  private async fetchLanguages(owner: string, repo: string): Promise<string[]> {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'PortfolioProjectFetcher',
    };

    if (this.authToken) {
      headers.Authorization = `Bearer ${this.authToken}`;
    }

    try {
      const languagesMap = await this.httpClient.get<Record<string, number>>(
        `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`,
        { headers }
      );
      return Object.keys(languagesMap);
    } catch (error) {
      console.warn(`Failed to fetch languages for ${owner}/${repo}`, error);
      return [];
    }
  }

  private toProjectRecord(repo: GitHubRepository, languages: string[]): ExternalProjectRecord {
    const updated = repo.updated_at ?? repo.pushed_at;
    const topics = repo.topics ?? [];
    const isFeatured = topics.includes('featured') || topics.includes('portfolio');

    return {
      id: `github:${repo.full_name}`,
      title: repo.name,
      summary: repo.description ?? 'No description provided.',
      date: formatMonthYear(repo.pushed_at ?? repo.updated_at),
      updatedAt: updated,
      categories: ['GitHub Repository', ...topics.map(normalizeLabel)],
      languages: languages.length > 0 ? languages : (repo.language ? [repo.language] : []),
      link: repo.html_url,
      image: `https://opengraph.githubassets.com/1/${repo.full_name}`,
      featured: isFeatured,
      demoImages: [],
    };
  }
}

const normalizeLabel = (value: string): string =>
  value
    ? value
        .split('-')                                        
        .map(segment =>                                    
          segment.length === 0 
            ? '' 
            : segment.charAt(0).toUpperCase() + segment.slice(1)
        )
        .join(' ')                                         
    : value;        

