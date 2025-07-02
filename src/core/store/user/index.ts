import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserModel {
  id: string;
  name: string;
  role: string;
  email: string;
}

interface UserStore {
  user: UserModel | null;
  setUser: (user: UserModel) => void;
  logout: () => void;
}

const userStore = create<UserStore>()(persist(
  (set) => ({
    user: null,
    setUser: (user: UserModel) => set({ user }),
    logout: () => set({ user: null }),
  }),
  { 
    name: "user", 
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({ user: state.user })
  }
));

export default userStore;