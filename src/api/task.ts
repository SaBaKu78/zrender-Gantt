import axios from '../util/axios'

export function getTask(params) {
  return new Promise((resolve, reject) => {
    axios({
      url: '/basedata/task/base/task/searchTask',
      method: 'post',
      params,
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

export function assignTask(params) {
  return new Promise((resolve, reject) => {
    axios({
      url: '/api2/ips/task/manage/assign',
      method: 'post',
      data: params,
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
