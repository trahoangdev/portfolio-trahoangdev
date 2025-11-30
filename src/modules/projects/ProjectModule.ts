import { ProjectDataManager } from '@/application/projects/ProjectDataManager';
import { ProjectCatalogService } from '@/application/projects/ProjectCatalogService';
import { ProjectRefreshService } from '@/application/projects/ProjectRefreshService';
import { ProjectCatalogController } from '@/modules/projects/controllers/ProjectCatalogController';
import { ProjectRefreshController } from '@/modules/projects/controllers/ProjectRefreshController';
import { ProjectPreferenceController } from '@/modules/projects/controllers/ProjectPreferenceController';
import { EnvProjectProfileProvider } from '@/infrastructure/projects/EnvProjectProfileProvider';
import { ResilientProjectProfileProvider } from '@/infrastructure/projects/ResilientProjectProfileProvider';
import { StaticProjectProfileProvider } from '@/infrastructure/projects/StaticProjectProfileProvider';
import { LocalStorageProjectPreferenceRepository } from '@/infrastructure/projects/LocalStorageProjectPreferenceRepository';
import { RemoteProjectRepository } from '@/infrastructure/projects/RemoteProjectRepository';
import { GitHubProjectDataSource } from '@/infrastructure/projects/sources/GitHubProjectDataSource';
import { HuggingFaceModelDataSource } from '@/infrastructure/projects/sources/HuggingFaceModelDataSource';
import { HuggingFaceSpaceDataSource } from '@/infrastructure/projects/sources/HuggingFaceSpaceDataSource';
import { FetchHttpClient } from '@/infrastructure/shared/FetchHttpClient';
import { FeaturedProjectService } from '@/application/projects/FeaturedProjectService';

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
      authToken: process.env.NEXT_PUBLIC_PROJECT_GITHUB_TOKEN,
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
