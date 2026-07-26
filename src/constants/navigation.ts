export type NavigationItem = {
  label: string;
  href: string;
  activePaths?: string[];
};

export const navigationItems: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "T O S S", href: "/toss" },
  {
    label: "Cek Kehamilan\nResiko Tinggi",
    href: "/cek-risiko",
    activePaths: [
      "/pemeriksaan-mandiri",
      "/pemeriksaan-mandiri/hasil",
      "/pemeriksaan-resiko",
      "/pemeriksaan-resiko/hasil",
    ],
  },
  {
    label: "Informasi\nKehamilan",
    href: "/informasi-kehamilan",
    activePaths: [
      "/informasi-kehamilan/pengelolaan",
      "/informasi-kehamilan/masalah",
      "/informasi-kehamilan/larangan",
      "/informasi-kehamilan/tanda-bahaya",
    ],
  },
  { label: "Ibu Hamil\nTanpa TB", href: "/ibu-hamil-tanpa-tb" },
  { label: "Deteksi Dini TB", href: "/deteksi-dini-tb" },
  {
    label: "Education",
    href: "/education",
    activePaths: ["/education/flipbook", "/education/video"],
  },
  { label: "Quiz", href: "/quiz" },
];
