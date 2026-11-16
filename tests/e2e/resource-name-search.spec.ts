import { expect, test } from '@playwright/test'

test('资源名搜索不会清空未分配任务', async ({ page }) => {
  await page.goto('/')
  await expect.poll(() => page.evaluate(() => Boolean((window as any).__gantt__))).toBe(true)

  const before = await page.evaluate(() => {
    const gantt = (window as any).__gantt__
    const boardModel = gantt.getModel().getComponent('unassignedBoard')
    const resources = boardModel?.option?.resources || []
    return {
      count: boardModel?.option?.data?.length || 0,
      resourceName: String(resources[0]?.[0] || ''),
    }
  })

  expect(before.count).toBeGreaterThan(0)
  expect(before.resourceName).not.toBe('')

  await page.getByRole('combobox', { name: '搜索条件' }).selectOption({ label: '资源名' })
  await page.getByRole('searchbox', { name: '搜索关键词' }).fill(before.resourceName)
  await page.getByRole('button', { name: '搜索', exact: true }).click()

  await expect.poll(() => page.evaluate(() => {
    const gantt = (window as any).__gantt__
    const boardModel = gantt.getModel().getComponent('unassignedBoard')
    return boardModel?.option?.data?.length || 0
  })).toBe(before.count)
})
