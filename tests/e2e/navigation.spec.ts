import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to home page', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/trahoangdev/);
    
    // Check main content is visible
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeVisible();
  });

  test('should navigate to project page', async ({ page }) => {
    await page.goto('/');
    
    // Click on Project link in navigation
    await page.click('a[href="/project"]');
    
    // Wait for navigation
    await page.waitForURL('/project');
    
    // Check we're on project page
    await expect(page).toHaveURL('/project');
    await expect(page).toHaveTitle(/Project/);
  });

  test('should use skip link for keyboard navigation', async ({ page }) => {
    await page.goto('/');
    
    // Press Tab to focus skip link
    await page.keyboard.press('Tab');
    
    // Check skip link is focused
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeFocused();
    
    // Press Enter to use skip link
    await page.keyboard.press('Enter');
    
    // Check main content is focused
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeFocused();
  });

  test('should navigate between sections on home page', async ({ page }) => {
    await page.goto('/');
    
    // Check intro section is visible
    const introSection = page.locator('section').first();
    await expect(introSection).toBeVisible();
    
    // Scroll to work section
    await page.evaluate(() => {
      const workSection = document.querySelector('[aria-labelledby="work-heading"]');
      workSection?.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Wait for scroll
    await page.waitForTimeout(500);
    
    // Check work section is in viewport
    const workSection = page.locator('[aria-labelledby="work-heading"]');
    await expect(workSection).toBeInViewport();
  });

  test('should have accessible navigation', async ({ page }) => {
    await page.goto('/');
    
    // Check navigation has aria-label
    const nav = page.locator('nav[aria-label="Main navigation"]');
    await expect(nav).toBeVisible();
    
    // Check navigation links have proper attributes
    const projectLink = page.locator('nav a[href="/project"]');
    await expect(projectLink).toHaveAttribute('aria-label');
  });
});
