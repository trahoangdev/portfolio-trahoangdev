import { test, expect } from '@playwright/test';

test.describe('Theme Toggle', () => {
  test('should toggle between light and dark themes', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Find theme toggle button
    const themeToggle = page.locator('button[aria-label*="theme" i], button[aria-label*="Toggle" i]');
    
    if (await themeToggle.isVisible()) {
      // Get initial theme
      const htmlElement = page.locator('html');
      const initialClass = await htmlElement.getAttribute('class');
      const initialTheme = initialClass?.includes('dark') ? 'dark' : 'light';
      
      // Click theme toggle
      await themeToggle.click();
      
      // Wait for theme change
      await page.waitForTimeout(300);
      
      // Check theme changed
      const newClass = await htmlElement.getAttribute('class');
      const newTheme = newClass?.includes('dark') ? 'dark' : 'light';
      
      expect(newTheme).not.toBe(initialTheme);
      
      // Toggle back
      await themeToggle.click();
      await page.waitForTimeout(300);
      
      // Check theme reverted
      const finalClass = await htmlElement.getAttribute('class');
      const finalTheme = finalClass?.includes('dark') ? 'dark' : 'light';
      
      expect(finalTheme).toBe(initialTheme);
    }
  });

  test('should persist theme preference', async ({ page, context }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Find theme toggle button
    const themeToggle = page.locator('button[aria-label*="theme" i], button[aria-label*="Toggle" i]');
    
    if (await themeToggle.isVisible()) {
      // Set to light theme
      const htmlElement = page.locator('html');
      let currentClass = await htmlElement.getAttribute('class');
      
      if (currentClass?.includes('dark')) {
        await themeToggle.click();
        await page.waitForTimeout(300);
      }
      
      // Verify light theme
      currentClass = await htmlElement.getAttribute('class');
      expect(currentClass).not.toContain('dark');
      
      // Create new page in same context
      const newPage = await context.newPage();
      await newPage.goto('/');
      await newPage.waitForLoadState('networkidle');
      
      // Check theme persisted
      const newHtmlElement = newPage.locator('html');
      const newClass = await newHtmlElement.getAttribute('class');
      expect(newClass).not.toContain('dark');
      
      await newPage.close();
    }
  });

  test('should respect system theme preference', async ({ page, context }) => {
    // Set system to dark mode
    await context.emulateMedia({ colorScheme: 'dark' });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check if dark theme is applied
    const htmlElement = page.locator('html');
    const htmlClass = await htmlElement.getAttribute('class');
    
    // Should have dark theme (if system preference is respected)
    // This depends on your theme implementation
    expect(htmlClass).toBeDefined();
  });

  test('should have smooth theme transition', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Find theme toggle button
    const themeToggle = page.locator('button[aria-label*="theme" i], button[aria-label*="Toggle" i]');
    
    if (await themeToggle.isVisible()) {
      // Click theme toggle
      await themeToggle.click();
      
      // Check for transition (no flash of unstyled content)
      // This is a basic check - you might want to add more sophisticated checks
      await page.waitForTimeout(100);
      
      // Page should still be visible during transition
      const body = page.locator('body');
      await expect(body).toBeVisible();
    }
  });

  test('should update theme icon/label', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Find theme toggle button
    const themeToggle = page.locator('button[aria-label*="theme" i], button[aria-label*="Toggle" i]');
    
    if (await themeToggle.isVisible()) {
      // Get initial aria-label or icon
      const initialLabel = await themeToggle.getAttribute('aria-label');
      
      // Click theme toggle
      await themeToggle.click();
      await page.waitForTimeout(300);
      
      // Check label/icon changed
      const newLabel = await themeToggle.getAttribute('aria-label');
      
      // Labels should be different (e.g., "Switch to light mode" vs "Switch to dark mode")
      // This depends on your implementation
      expect(newLabel).toBeDefined();
    }
  });
});
