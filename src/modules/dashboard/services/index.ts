import api from "@/core/api";

export const getDashboardSchedules = async (clinicSlug: string) => {
  try {
    const response = await api.get(`/dashboard/schedules?clinicSlug=${clinicSlug}`);

    return response.data;
  } catch (error) {
    throw error;
  }
}