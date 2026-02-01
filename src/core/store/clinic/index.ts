import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ClinicModel {
  id: string;
  name: string;
  slug: string;
  cor: string;
}

interface ClinicStore {
  clinic: ClinicModel | null;
  setClinic: (clinic: ClinicModel) => void;
  logout: () => void;
}

const clinicStore = create<ClinicStore>()(persist(
  (set) => ({
    clinic: null,
    setClinic: (clinic: ClinicModel) => set({ clinic }),
    logout: () => set({ clinic: null }),
  }),
  { 
    name: "clinic", 
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({ clinic: state.clinic })
  }
));

export default clinicStore;