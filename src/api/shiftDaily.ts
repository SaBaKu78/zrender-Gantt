import axios from '../util/axios'

export function getShiftDaily(params) {
  return new Promise((resolve, reject) => {
    axios({
      url: '/task/base/shiftDaily/searchShiftDaily',
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
