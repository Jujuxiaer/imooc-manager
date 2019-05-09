import JSONP from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd';

export default class Axios {
  static jsonp(options) {
    return new Promise((resolve, reject) => {
      JSONP(options.url, {
        param: 'callback'
      }, (err, response) => {
        if (response.status === 'success') {
          resolve(response.results)
        } else {
          if (err) {
            reject(err.message);
          } else {
            reject(response.status)
          }
        }
      })
    })
  }

  static ajax(options) {
    const baseUrl = 'https://www.easy-mock.com/mock/5cd3e5ca9412184628109f28/mockapi';
    return new Promise((resolve, reject) => {
      axios({
        url: baseUrl + options.url,
        method: 'get',
        timeout: 5000,
        params: (options.data && options.params) || '',
      }).then((response) => {
        let { data } = response;
        if (response.status == "200") {
          if (data.code == '0') {
            resolve(data)
          } else {
            Modal.info({
              title: '提示',
              content: data.msg
            })
          }
        } else {
          reject(response.data)
        }
      })
    })
  }

}