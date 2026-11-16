import { expect, test } from '@playwright/test'

test('任务局部更新不会覆盖资源班次线', async ({ page }) => {
  await page.goto('/')
  await expect.poll(() => page.evaluate(() => Boolean((window as any).__gantt__))).toBe(true)

  const before = await page.evaluate(() => {
    const gantt = (window as any).__gantt__
    const scheduleModel = gantt.getModel().getSeries().find(
      (item: any) => item.id === 'resourceSchedule',
    )
    const scheduleData = scheduleModel?.getData()
    if (!scheduleData?.count()) return null
    const store = scheduleData.getStore()

    return {
      count: scheduleData.count(),
      firstStart: Number(store.get(2, 0)),
    }
  })

  expect(before).not.toBeNull()

  const updated = await page.evaluate(() => {
    const gantt = (window as any).__gantt__
    const option = gantt.getOption()
    const taskSeries = (option.series || []).find((item: any) => item.id === 'assignedTasks')
    const resourceSeries = (option.series || []).find((item: any) => item.id === 'resourceRows')
    const data = (taskSeries?.data || []).map((item: any[]) => item.slice())
    const resourceData = (resourceSeries?.data || []).map((item: any[]) => item.slice())
    if (!data.length || !resourceData.length) return false

    gantt.updateTaskItems({
      data,
      affectedIds: [String(data[0][0])],
      resourceData,
    })
    return true
  })

  expect(updated).toBe(true)

  const after = await page.evaluate(() => {
    const gantt = (window as any).__gantt__
    const scheduleModel = gantt.getModel().getSeries().find(
      (item: any) => item.id === 'resourceSchedule',
    )
    const scheduleData = scheduleModel?.getData()
    const store = scheduleData?.getStore()
    return {
      count: scheduleData?.count() || 0,
      firstStart: Number(store?.get(2, 0)),
    }
  })

  expect(after).toEqual(before)
})
