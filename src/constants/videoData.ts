export type VideoData = {
  id: string;
  numberTitle: string;
  subtitle: string;
  youtubeId: string;
  youtubeUrl: string;
  thumbnail: string;
};

export const videosData: Record<string, VideoData> = {
  "1": {
    id: "1",
    numberTitle: "Video Edukasi - 1",
    subtitle:
      "Cegah TBC Pada Ibu Hamil! Panduan Lengkap Lindungi Ibu dan Janin dari Tuberkulosis",
    youtubeId: "4mffhZAv_1o",
    youtubeUrl: "https://youtu.be/4mffhZAv_1o",
    thumbnail: "/assets/images/thumbnail/Thumbnail_video-1.avif",
  },
  "2": {
    id: "2",
    numberTitle: "Video Edukasi - 2",
    subtitle:
      "Mengenal TBC dan Cara Ampuh Mencegahnya Pada Ibu Hamil: Lindungi Ibu & Si Kecil Sejak Dini!",
    youtubeId: "30oJ_thgWZ4",
    youtubeUrl: "https://youtu.be/30oJ_thgWZ4",
    thumbnail: "/assets/images/thumbnail/Thumbnail_video-2.avif",
  },
  "3": {
    id: "3",
    numberTitle: "Video Edukasi - 3",
    subtitle: "Video Edukasi TB CARE : Tempat Mengenal Tuberkulosis",
    youtubeId: "cYSjpov6GgI",
    youtubeUrl: "https://youtu.be/cYSjpov6GgI",
    thumbnail: "/assets/images/thumbnail/Thumbnail_video-3.avif",
  },
};
