import axios from '../util/axios'

export function getFlight(params) {
  return new Promise((resolve, reject) => {
    axios({
      url: '/flight/searchFlight',
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
