import { expect, test } from '@playwright/test'

test('局部任务更新在目标资源行主动重绘', async ({ page }) => {
  await page.goto('/')
  await expect.poll(() => page.evaluate(() => Boolean((window as any).__gantt__))).toBe(true)

  const result = await page.evaluate(async () => {
    const gantt = (window as any).__gantt__
    const option = gantt.getOption()
    const series = (option.series || []).find((item: any) => item.id === 'assignedTasks')
    const data = (series?.data || []).map((item: any[]) => item.slice())
    if (!data.length) return null

    const targetRow = Number(data[0][1])
    gantt.dispatchAction({
      type: 'dataZoom',
      dataZoomId: 'insideY',
      startValue: Math.max(0, targetRow - 2),
      endValue: targetRow + 4,
    })
    await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())))

    const visibleIndex = data.findIndex((item: any[]) => Number(item[1]) === targetRow)
    const taskId = String(data[visibleIndex][0])
    const nextName = '新'
    data[visibleIndex][4] = nextName
    // 卡片标题优先使用航班号；同时更新两个文本维度，避免窄卡片断言受标题优先级影响。
    data[visibleIndex][14] = nextName
    data[visibleIndex][16] = ''
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
