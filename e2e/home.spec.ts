import { test, expect } from '@playwright/test'

test.describe('EmmausAI Home Page', () => {
  test('displays hero section', async ({ page }) => {
    await page.goto('/en')
    await expect(page.locator('h1')).toContainText('EmmausAI')
  })

  test('navigation links work', async ({ page }) => {
    await page.goto('/en')
    await page.click('text=Courses')
    await expect(page).toHaveURL(/\/courses/)
  })

  test('Bible study page loads', async ({ page }) => {
    await page.goto('/en/bible-study')
    await expect(page.locator('h1')).toContainText('AI Bible Study')
  })

  test('supports Chinese locale', async ({ page }) => {
    await page.goto('/zh-CN')
    await expect(page.locator('h1')).toContainText('以马忤斯AI')
  })
})
