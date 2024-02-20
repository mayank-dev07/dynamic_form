import React from "react";
import { create } from "zustand";

const useStore = create((set) => ({
  data: [],
  setData: (e) => set(() => ({ data: e })),
}));

export default useStore;
