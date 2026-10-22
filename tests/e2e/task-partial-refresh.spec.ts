import { expect, test } from '@playwright/test'

test('局部任务更新无需滚动即可主动渲染', async ({ page }) => {
  await page.goto('/')
  await expect.poll(() => page.evaluate(() => Boolean((window as any).__gantt__))).toBe(true)

  const result = await page.evaluate(() => {
    const gantt = (window as any).__gantt__
    const option = gantt.getOption()
    const series = (option.series || []).find((item: any) => item.id === 'assignedTasks')
    const data = (series?.data || []).map((item: any[]) => item.slice())
    if (!data.length) return null

    const model = gantt.getModel().getSeries().find((item: any) => item.id === 'assignedTasks')
    const view = gantt._chartsViewsMap[model.__viewId]
    const visibleIndex = data.findIndex((_: any, index: number) => view._data.getItemGraphicEl(index))
    if (visibleIndex < 0) return null
    const taskId = String(data[visibleIndex][0])
    const nextName = '新'
    data[visibleIndex][4] = nextName
    gantt.updateTaskItems({ data, affectedIds: [taskId] })

    return { taskId, nextName }
  })

  expect(result).not.toBeNull()
  await expect.poll(() => page.evaluate((nextName) => {
    const gantt = (window as any).__gantt__
    return gantt.getZr().storage.getDisplayList(true).some(
      (item: any) => item?.style?.text === nextName,
    )
  }, result!.nextName)).toBe(true)
})
