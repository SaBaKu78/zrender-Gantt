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
