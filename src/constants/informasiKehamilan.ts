export interface InformasiKehamilanCard {
  title: string;
  image: string;
  href: string;
  description: string;
}

export const informasiKehamilanCards: InformasiKehamilanCard[] = [
  {
    title: "Pengelolaan Kehamilan",
    image: "/assets/images/pengelolaan_kehamilan.avif",
    href: "/informasi-kehamilan/pengelolaan",
    description: "Pengelolaan Kehamilan",
  },
  {
    title: "Masalah Kehamilan",
    image: "/assets/images/masalah_kehamilan.avif",
    href: "/informasi-kehamilan/masalah",
    description: "Masalah Kehamilan",
  },
  {
    title: "Larangan Saat Hamil",
    image: "/assets/images/larangan_kehamilan.avif",
    href: "/informasi-kehamilan/larangan",
    description: "Larangan Saat Hamil",
  },
  {
    title: "Tanda Bahaya Kehamilan",
    image: "/assets/images/tanda_bahaya.avif",
    href: "/informasi-kehamilan/tanda-bahaya",
    description: "Tanda Bahaya Kehamilan",
  },
];
