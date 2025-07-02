import api from "@/core/api";

export const getDashboardSchedules = async () => {
  try {
    const response = await api.get('/dashboard/schedules');

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}