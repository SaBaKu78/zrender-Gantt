import axios from '../util/axios'

export function getResourceList(params) {
  return new Promise((resolve, reject) => {
    axios({
      url: '/resource/resource/search',
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
