import api from './api'

export const publicService = {
  getSettings: async () => {
    return await api.get('/public/settings')
  },

  submitLead: async (data) => {
    return await api.post('/leads', data)
  },

  getStats: async () => {
    return await api.get('/public/stats')
  },

  getServices: async () => {
    return await api.get('/public/services')
  },

  // Appointment booking endpoints
  getAvailableSlots: async (serviceId, date) => {
    return await api.get(`/services/${serviceId}/available-slots?date=${date}`)
  },

  bookAppointment: async (data) => {
    return await api.post('/appointments', data)
  }
}
