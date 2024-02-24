import api from "../axios";

const driversAPI = {
  getDrivers: () => api.get("/drivers"),
  getOneDriver: async (id) => api.get(`/drivers/${id}`),
  postDrivers: (data) => api.post("/drivers", data),
  editDrivers: async (id, updatedData) =>
    api.put(`/drivers/${id}`, updatedData),
  deleteDrivers: async (id) => api.delete(`/drivers/${id}`),
};

export default driversAPI;
