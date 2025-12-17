import api from './api'

export const publicService = {
  getSettings: async () => {
    return await api.get('/public/settings')
  },

  submitContact: async (data) => {
    return await api.post('/public/contact', data)
  },

  getStats: async () => {
    return await api.get('/public/stats')
  },

  getServices: async () => {
    return await api.get('/public/services')
  }
}
