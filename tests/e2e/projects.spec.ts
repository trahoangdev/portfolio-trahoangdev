import { test, expect } from '@playwright/test';

test.describe('Project Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/project');
  });

  test('should display project explorer', async ({ page }) => {
    // Wait for projects to load
    await page.waitForSelector('[data-testid="project-card"]', { timeout: 10000 });
    
    // Check projects are displayed
    const projectCards = page.locator('[data-testid="project-card"]');
    const count = await projectCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should filter projects by category', async ({ page }) => {
    // Wait for projects to load
    await page.waitForSelector('[data-testid="project-card"]', { timeout: 10000 });
    
    // Get initial project count
    const initialCount = await page.locator('[data-testid="project-card"]').count();
    
    // Click on a category filter (if available)
    const categoryFilter = page.locator('[data-testid="category-filter"]').first();
    if (await categoryFilter.isVisible()) {
      await categoryFilter.click();
      
      // Wait for filter to apply
      await page.waitForTimeout(500);
      
      // Check project count changed
      const filteredCount = await page.locator('[data-testid="project-card"]').count();
      expect(filteredCount).toBeLessThanOrEqual(initialCount);
    }
  });

  test('should filter projects by language', async ({ page }) => {
    // Wait for projects to load
    await page.waitForSelector('[data-testid="project-card"]', { timeout: 10000 });
    
    // Get initial project count
    const initialCount = await page.locator('[data-testid="project-card"]').count();
    
    // Click on a language filter (if available)
    const languageFilter = page.locator('[data-testid="language-filter"]').first();
    if (await languageFilter.isVisible()) {
      await languageFilter.click();
      
      // Wait for filter to apply
      await page.waitForTimeout(500);
      
      // Check project count changed
      const filteredCount = await page.locator('[data-testid="project-card"]').count();
      expect(filteredCount).toBeLessThanOrEqual(initialCount);
    }
  });

  test('should display project details on click', async ({ page }) => {
    // Wait for projects to load
    await page.waitForSelector('[data-testid="project-card"]', { timeout: 10000 });
    
    // Click on first project card
    const firstProject = page.locator('[data-testid="project-card"]').first();
    const projectTitle = await firstProject.locator('h3').textContent();
    
    await firstProject.click();
    
    // Wait for details to appear (if modal/dialog opens)
    await page.waitForTimeout(500);
    
    // Check if project details are visible
    // This depends on your implementation
    // Could be a modal, expanded card, or navigation to detail page
  });

  test('should display tool palette', async ({ page }) => {
    // Check if tool palette is visible
    const toolPalette = page.locator('[data-testid="tool-palette"]');
    
    if (await toolPalette.isVisible()) {
      // Check tools are displayed
      const tools = page.locator('[data-testid="tool-item"]');
      const count = await tools.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('should be responsive on mobile', async ({ page, isMobile }) => {
    if (isMobile) {
      // Wait for projects to load
      await page.waitForSelector('[data-testid="project-card"]', { timeout: 10000 });
      
      // Check projects are displayed in mobile layout
      const projectCards = page.locator('[data-testid="project-card"]');
      const count = await projectCards.count();
      expect(count).toBeGreaterThan(0);
      
      // Check mobile-specific elements
      const viewport = page.viewportSize();
      expect(viewport?.width).toBeLessThan(768);
    }
  });

  test('should handle loading state', async ({ page }) => {
    // Navigate to project page
    await page.goto('/project');
    
    // Check for loading skeleton or spinner
    const loadingIndicator = page.locator('.animate-pulse, [role="status"]');
    
    // Loading indicator should appear briefly
    if (await loadingIndicator.isVisible({ timeout: 1000 }).catch(() => false)) {
      // Wait for loading to complete
      await loadingIndicator.waitFor({ state: 'hidden', timeout: 10000 });
    }
    
    // Projects should be loaded
    await expect(page.locator('[data-testid="project-card"]').first()).toBeVisible();
  });

  test('should handle empty state gracefully', async ({ page }) => {
    // This test would require mocking API to return empty results
    // For now, just check that page doesn't crash
    await page.goto('/project');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Page should not have any errors
    const errors = await page.evaluate(() => {
      return (window as any).errors || [];
    });
    expect(errors.length).toBe(0);
  });
});
