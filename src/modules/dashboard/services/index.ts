import api from "@/core/api";
import clinicStore from "@/core/store/clinic";

export const getDashboardSchedules = async () => {
  try {
    const clinic = clinicStore.getState().clinic;
    const clinicSlug = clinic?.slug;

    const response = await api.get(`/dashboard/schedules?clinicSlug=${clinicSlug}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};
