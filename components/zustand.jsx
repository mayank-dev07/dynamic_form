import { create } from "zustand";

const useStore = create((set) => ({
  admin: false,
  data: [],
  form: [],
  setData: (e) => set(() => ({ data: e })),
  setForm: (e) => set(() => ({ form: e })),
  setAdmin: (e) => set(() => ({ admin: e })),
}));

export default useStore;
