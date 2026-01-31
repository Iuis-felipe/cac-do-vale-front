import api from "@/core/api";
import clinicStore from "@/core/store/clinic";

export const getDashboardSchedules = async () => {
  try {
    const clinic = clinicStore.getState().clinic;

    if(!clinic) {
      throw new Error('Clinica não encontrada');
    }

    const response = await api.get(`/dashboard/schedules?clinicId=${clinic.id}`);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}