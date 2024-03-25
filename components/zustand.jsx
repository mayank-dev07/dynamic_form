import { create } from "zustand";

const useStore = create((set) => ({
  admin: false,
  data: [],
  form: [],
  option :{},
  setData: (e) => set(() => ({ data: e })),
  setForm: (e) => set(() => ({ form: e })),
  setAdmin: (e) => set(() => ({ admin: e })),
  setOption: (e) => set(()=>({option: e})),
}));

export default useStore;
