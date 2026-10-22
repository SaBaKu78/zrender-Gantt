import axios from '../util/axios'

export function getTask(params) {
  return new Promise((resolve, reject) => {
    axios({
      url: '/basedata/task/base/task/searchTask',
      method: 'post',
      data: params,
    })
      .then((response) => {
        const {data: {code, data}} = response
        if(code == 200){
          resolve(data)
        }
      })
      .catch((error) => reject(error))
  })
}

export interface AssignmentCreateParams {
  taskId: string | number
  resourceId: string | number
  shiftDailyId: string | number
}

export async function findTaskById(taskId: string | number) {
  const response = await axios({
    url: '/basedata/task/base/task/findById',
    method: 'post',
    data: { taskId },
  })
  const payload = response.data

  if (payload?.code != null && payload.code !== 200) {
    throw new Error(payload.message || `Find task failed with code ${payload.code}`)
  }

  return payload?.data ?? payload
}

export async function assignTask(params: AssignmentCreateParams) {
  const response = await axios({
    url: '/assign',
    method: 'post',
    data: {
      taskId: params.taskId,
      resourceId: params.resourceId,
      shiftDailyId: params.shiftDailyId,
    },
  })
  const payload = response.data

  // assign 接口创建成功时返回 201（Created），与 200 一样属于成功响应。
  if (payload?.code != null && (payload.code < 200 || payload.code >= 300)) {
    throw new Error(payload.message || `Assign task failed with code ${payload.code}`)
  }

  return payload?.data ?? payload
}

export function searchTaskByIds(taskIds) {
  return new Promise((resolve, reject) => {
    axios({
      url: '/api2/ips/basedata/task/base/task/searchTask',
      method: 'post',
      data: {
        taskIds,
      },
    })
      .then((response) => {
        const {
          data: { code, data },
        } = response
        if (code == 200) {
          resolve(data)
        }
      })
      .catch((error) => reject(error))
  })
}
