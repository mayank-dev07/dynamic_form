import React from "react";
import { create } from "zustand";

const useStore = create((set) => ({
  data: {},
  setData: (e, val) => set((state) => ({ ...state, [e]: val })),
}));

export default useStore;
