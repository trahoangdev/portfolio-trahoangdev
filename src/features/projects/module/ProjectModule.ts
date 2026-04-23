import { ProjectDataManager } from '@/features/projects/application/ProjectDataManager';
import { ProjectCatalogService } from '@/features/projects/application/ProjectCatalogService';
import { ProjectRefreshService } from '@/features/projects/application/ProjectRefreshService';
import { ProjectCatalogController } from '@/features/projects/module/controllers/ProjectCatalogController';
import { ProjectRefreshController } from '@/features/projects/module/controllers/ProjectRefreshController';
import { ProjectPreferenceController } from '@/features/projects/module/controllers/ProjectPreferenceController';
import { EnvProjectProfileProvider } from '@/features/projects/infrastructure/EnvProjectProfileProvider';
import { ResilientProjectProfileProvider } from '@/features/projects/infrastructure/ResilientProjectProfileProvider';
import { StaticProjectProfileProvider } from '@/features/projects/infrastructure/StaticProjectProfileProvider';
import { LocalStorageProjectPreferenceRepository } from '@/features/projects/infrastructure/LocalStorageProjectPreferenceRepository';
import { RemoteProjectRepository } from '@/features/projects/infrastructure/RemoteProjectRepository';
import { GitHubProjectDataSource } from '@/features/projects/infrastructure/sources/GitHubProjectDataSource';
import { HuggingFaceModelDataSource } from '@/features/projects/infrastructure/sources/HuggingFaceModelDataSource';
import { HuggingFaceSpaceDataSource } from '@/features/projects/infrastructure/sources/HuggingFaceSpaceDataSource';
import { FetchHttpClient } from '@/features/shared/infrastructure/FetchHttpClient';
import { FeaturedProjectService } from '@/features/projects/application/FeaturedProjectService';

export interface ProjectControllers {
  catalog: ProjectCatalogController;
  refresh: ProjectRefreshController;
}

const DEFAULT_PROJECT_PROFILE = {
  githubUser: 'trahoangdev',
};

export function createProjectControllers(): ProjectControllers {
  const httpClient = new FetchHttpClient();
  const sources = [
    new GitHubProjectDataSource(httpClient, {
      authToken: process.env.GITHUB_TOKEN,
    }),
    new HuggingFaceModelDataSource(httpClient),
    new HuggingFaceSpaceDataSource(httpClient),
  ];

  const dataManager = new ProjectDataManager(sources);
  const profileProvider = new ResilientProjectProfileProvider([
    new EnvProjectProfileProvider(),
    new StaticProjectProfileProvider(DEFAULT_PROJECT_PROFILE),
  ]);
  const repository = new RemoteProjectRepository(dataManager, profileProvider);
  const refreshService = new ProjectRefreshService(repository);
  const catalogService = new ProjectCatalogService(refreshService);

  return {
    catalog: new ProjectCatalogController(catalogService),
    refresh: new ProjectRefreshController(catalogService),
  };
}

export function createProjectPreferenceController(): ProjectPreferenceController {
  const repository = new LocalStorageProjectPreferenceRepository();
  const service = new FeaturedProjectService(repository);
  return new ProjectPreferenceController(service);
}
