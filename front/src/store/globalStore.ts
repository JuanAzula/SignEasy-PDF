import create from 'zustand';

const useGlobalStore = create((set) => ({
  authenticated: false,
  setAuthenticated: (value: boolean) => set({ authenticated: value }),
  displayed: false,
  setDisplayed: (value: boolean) => set({ displayed: value }),
  pdfFile: null,
  setPdfFile: (value: string | null) => set({ pdfFile: value }),
  signedPdfFile: null,
  setSignedPdfFile: (value: string | null) => set({ signedPdfFile: value }),
  signatureData: null,
  setSignatureData: (value: string | null) => set({ signatureData: value }),
}));

export default useGlobalStore;
