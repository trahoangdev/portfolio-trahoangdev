export interface ProjectPreferenceRepository {
  loadFeatured(): Promise<string[]>;
  saveFeatured(ids: string[]): Promise<void>;
  addListener(listener: (ids: string[]) => void): () => void;
}
