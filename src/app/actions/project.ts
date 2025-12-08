'use server';

import { createProjectControllers } from '@/modules/projects/ProjectModule';
import { ProjectCatalogDto } from '@/application/projects/ProjectCatalogService';
import { ProjectFilterState } from '@/modules/projects/state/ProjectFilterState';

/**
 * Server Action to fetch project catalog.
 * Runs on the server, so it has access to process.env.GITHUB_TOKEN.
 */
export async function getProjectCatalog(
    categories: string[] = [],
    languages: string[] = []
): Promise<ProjectCatalogDto> {
    // Initialize controls on the server
    const { catalog } = createProjectControllers();

    // Reconstruct the filter state
    const state = new ProjectFilterState(categories, languages);

    // Use the controller to apply logic (which calls the service)
    return catalog.applyFilter(state);
}
