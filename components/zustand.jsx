import React from "react";
import { create } from "zustand";

const useStore = create((set) => ({
  data: [],
  form:[],
  setData: (e) => set(() => ({ data: e })),
  setForm:(e)=>set(()=>({form:e}))
}));

export default useStore;
