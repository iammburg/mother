export interface TbPatientData {
  nama: string;
  usia: string;
  noRm: string;
  alamat: string;
  tanggal: string;
}

export type TbQuestionAnswer = "Ya" | "Tidak";

export interface TbScreeningAnswers {
  q1: TbQuestionAnswer; // Batuk Berdahak >2 minggu
  q2: TbQuestionAnswer; // Batuk Berdarah
  q3: TbQuestionAnswer; // Demam Hilang timbul >1 bulan
  q4: TbQuestionAnswer; // Keringat malam tanpa aktifitas
  q5: TbQuestionAnswer; // Penurunan BB tanpa penyebab yang jelas
  q6: TbQuestionAnswer; // Pembesaran KGB (leher >2 cm)
  q7: TbQuestionAnswer; // Sesak nafas dan Nyeri dada
  q8: TbQuestionAnswer; // Pernah minum obat paru lama
  q9: TbQuestionAnswer; // Anggota serumah pernah sakit paru/TB
  q10: string[];        // Penyakit lain: ["Asma", "DM", "PPOK", "HIV / AIDS", "Tidak Ada"]
}

export const defaultTbAnswers: TbScreeningAnswers = {
  q1: "Tidak",
  q2: "Tidak",
  q3: "Tidak",
  q4: "Tidak",
  q5: "Tidak",
  q6: "Tidak",
  q7: "Tidak",
  q8: "Tidak",
  q9: "Tidak",
  q10: ["Tidak Ada"],
};

export interface TbQuestionItem {
  id: keyof Omit<TbScreeningAnswers, "q10">;
  num: number;
  question: string;
}

export const tbQuestionsList: TbQuestionItem[] = [
  {
    id: "q1",
    num: 1,
    question: "Batuk Berdahak selama >2 minggu ?",
  },
  {
    id: "q2",
    num: 2,
    question: "Batuk Berdarah ?",
  },
  {
    id: "q3",
    num: 3,
    question: "Demam Hilang timbul >1 bulan ?",
  },
  {
    id: "q4",
    num: 4,
    question: "Keringat malam tanpa aktifitas ?",
  },
  {
    id: "q5",
    num: 5,
    question: "Penurunan BB tanpa penyebab yang jelas ?",
  },
  {
    id: "q6",
    num: 6,
    question: "Pembesaran Kelenjar getah bening (benjolan di daerah leher) dengan ukuran >2 cm ?",
  },
  {
    id: "q7",
    num: 7,
    question: "Sesak nafas dan Nyeri dada ?",
  },
  {
    id: "q8",
    num: 8,
    question: "Pernah minum obat paru dalam waktu lama sebelumnya ?",
  },
  {
    id: "q9",
    num: 9,
    question: "Ada anggota serumah yang pernah sakit paru-paru / TB / Pengobatan paru lama ?",
  },
];

export const q10Options = [
  "Asma",
  "DM",
  "PPOK",
  "HIV / AIDS",
  "Tidak Ada",
];

export interface TbAssessmentResult {
  category: "SUSPEK" | "SEDANG" | "RENDAH";
  statusTitle: string;
  statusBadge: string;
  positiveSymptomsCount: number;
  perawatan: string;
  rujukan: string;
  tempat: string;
  penolong: string;
  catatan: string;
}

export function evaluateTbScreening(answers: Partial<TbScreeningAnswers>): TbAssessmentResult {
  const q1 = answers.q1 ?? "Tidak";
  const q2 = answers.q2 ?? "Tidak";
  const q3 = answers.q3 ?? "Tidak";
  const q4 = answers.q4 ?? "Tidak";
  const q5 = answers.q5 ?? "Tidak";
  const q6 = answers.q6 ?? "Tidak";
  const q7 = answers.q7 ?? "Tidak";
  const q8 = answers.q8 ?? "Tidak";
  const q9 = answers.q9 ?? "Tidak";

  const symptoms = [q1, q2, q3, q4, q5, q6, q7, q8, q9];
  const positiveSymptomsCount = symptoms.filter((ans) => ans === "Ya").length;
  const isPrimarySymptom = q1 === "Ya" || q2 === "Ya";

  if (isPrimarySymptom || positiveSymptomsCount >= 2 || (q9 === "Ya" && positiveSymptomsCount >= 1)) {
    return {
      category: "SUSPEK",
      statusTitle: "Terduga TBC (Suspek TBC)",
      statusBadge: "Potensi Tinggi Terkena TBC",
      positiveSymptomsCount,
      perawatan: "Dokter Spesialis Paru & Dokter Kandungan",
      rujukan: "Puskesmas / Rumah Sakit Terdekat (Tes Cepat Molekuler / TCM Dahak)",
      tempat: "Puskesmas / Rumah Sakit",
      penolong: "Dokter Spesialis & Tim Medis",
      catatan:
        "Hasil skrining menunjukkan gejala klinis/spesifik terduga TBC. Sangat disarankan untuk segera melakukan pemeriksaan dahak Tes Cepat Molekuler (TCM) di Puskesmas/RS terdekat, pemeriksaan rontgen dada dengan pelindung abdomen/janin, serta konsultasi medis.",
    };
  }

  if (positiveSymptomsCount === 1) {
    return {
      category: "SEDANG",
      statusTitle: "Perlu Pemantauan Gejala (Risiko Sedang)",
      statusBadge: "Potensi Risiko Sedang TBC",
      positiveSymptomsCount,
      perawatan: "Bidan dan Dokter di Puskesmas",
      rujukan: "Puskesmas apabila Gejala Berlanjut >2 Minggu",
      tempat: "Polindes atau Puskesmas",
      penolong: "Bidan dan Dokter",
      catatan:
        "Terdapat 1 gejala klinis yang dilaporkan. Lakukan pemantauan gejala secara mandiri. Apabila gejala menetap atau bertambah berat lebih dari 2 minggu, segera periksakan diri ke Puskesmas.",
    };
  }

  return {
    category: "RENDAH",
    statusTitle: "Bukan Terduga TBC (Risiko Rendah)",
    statusBadge: "Tidak Berpotensi TBC",
    positiveSymptomsCount: 0,
    perawatan: "Bidan (Pemeriksaan Kehamilan Rutin)",
    rujukan: "Tidak perlu dirujuk",
    tempat: "Polindes / Posyandu",
    penolong: "Bidan",
    catatan:
      "Hasil skrining menunjukkan bahwa ibu hamil tidak berada dalam kategori terduga TBC. Tetap jaga pola hidup bersih dan sehat (PHBS), konsumsi makanan bergizi, dan lakukan kontrol kehamilan secara teratur.",
  };
}
