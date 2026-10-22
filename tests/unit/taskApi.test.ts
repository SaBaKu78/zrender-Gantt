import { afterEach, describe, expect, it, vi } from 'vitest'

vi.mock('../../src/util/axios', () => ({
  default: vi.fn(),
}))

import axios from '../../src/util/axios'
import { assignTask } from '../../src/api/task'

describe('assignTask response handling', () => {
  afterEach(() => vi.clearAllMocks())

  it('treats code 201 as a successful assignment', async () => {
    vi.mocked(axios).mockResolvedValue({
      data: {
        code: 201,
        data: {
          success: true,
          id: '1792045127786379',
          status: 'ASSIGNED',
        },
      },
    } as any)

    await expect(assignTask({
      taskId: 'task-1',
      resourceId: 'resource-1',
      shiftDailyId: 'shift-1',
    })).resolves.toEqual({
      success: true,
      id: '1792045127786379',
      status: 'ASSIGNED',
    })
  })
})
