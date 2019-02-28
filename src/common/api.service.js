import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { API_URL } from '../common/config'

const ApiService = {
  init() {
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = API_URL
  },

  query(resource, params) {
    return Vue.axios
      .get(resource, params)
      .catch((error) => {
        throw new Error(`ApiService ${error}`)
      })
  },

  get(resource, slug = '') {
    return Vue.axios
      .get(`${resource}${slug}`)
      .catch((error) => {
        throw new Error(`ApiService ${error}`)
      })
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params)
  },

  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params)
  },

  put(resource, params) {
    return Vue.axios
      .put(`${resource}`, params)
  },

  delete(resource, slug = '') {
    return Vue.axios
      .delete(`${resource}${slug}`)
      .catch((error) => {
        throw new Error(`ApiService ${error}`)
      })
  }
}

export default ApiService

export const PagesService = {
  getPages() {
    return ApiService.get('pages')
  },
  getPage(path) {
    return ApiService.get('pages',"/" + path)
  },
  createPage(page) {
    return ApiService.post('pages', page)
  },
  updatePage(path, page) {
    return ApiService.update('pages', path, page)
  },
  deletePage(path) {
    return ApiService.delete('pages', "/" + path);
  }
}
