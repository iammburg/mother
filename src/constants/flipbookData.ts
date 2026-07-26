export type FlipbookData = {
  id: string;
  numericId: string;
  title: string;
  subtitle: string;
  folder: string;
  pageCount: number;
  coverImage: string;
};

export const flipbooksData: Record<string, FlipbookData> = {
  "1": {
    id: "flipbook-1",
    numericId: "1",
    title: "Pencegahan Tuberculosis pada Kehamilan",
    subtitle: "Buku Edukasi TBC Bagi Ibu Hamil",
    folder: "/assets/images/flipbook_1",
    pageCount: 66,
    coverImage: "/assets/images/flipbook_1/1.avif",
  },
  "2": {
    id: "flipbook-2",
    numericId: "2",
    title: "Tempat Mengenal TBC",
    subtitle: "Panduan Pengenalan & Penanganan TBC",
    folder: "/assets/images/flipbook_2",
    pageCount: 20,
    coverImage: "/assets/images/flipbook_2/1.avif",
  },
  "3": {
    id: "flipbook-3",
    numericId: "3",
    title: "Deteksi Dini dan Pencegahan Kehamilan dengan Tuberkulosis",
    subtitle: "Modul Deteksi Dini & Pencegahan TB",
    folder: "/assets/images/flipbook_3",
    pageCount: 66,
    coverImage: "/assets/images/flipbook_3/1.avif",
  },
};
