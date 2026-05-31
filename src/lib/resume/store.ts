import { create } from "zustand";
import { persist } from "zustand/middleware";
import { emptyResume, type ResumeData } from "./types";

type State = {
  resume: ResumeData;
  setResume: (r: ResumeData) => void;
  patch: <K extends keyof ResumeData>(key: K, value: ResumeData[K]) => void;
  reset: () => void;
};

export const useResumeStore = create<State>()(
  persist(
    (set) => ({
      resume: emptyResume,
      setResume: (resume) => set({ resume }),
      patch: (key, value) =>
        set((s) => ({ resume: { ...s.resume, [key]: value } })),
      reset: () => set({ resume: emptyResume }),
    }),
    { name: "resumeai-pro" },
  ),
);

export const newId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);
