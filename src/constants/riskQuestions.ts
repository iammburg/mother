export const initialPregnancyScore = 2;

export type RiskQuestion =
  | {
      id: string;
      type: "boolean";
      question: string;
      score: number;
    }
  | {
      id: string;
      type: "multiple";
      question: string;
      options: Array<{
        label: string;
        value: string;
        score: number;
      }>;
    };

export const riskQuestions: RiskQuestion[] = [
  {
    id: "too-young",
    type: "boolean",
    question: "Anda terlalu muda hamil (<= 16 Tahun)?",
    score: 4,
  },
  {
    id: "late-first-pregnancy",
    type: "boolean",
    question: "Anda terlalu lambat hamil pertama/kawin (> 4 Tahun)?",
    score: 4,
  },
  {
    id: "too-old",
    type: "boolean",
    question: "Anda terlalu tua hamil (>= 35 Tahun)?",
    score: 4,
  },
  {
    id: "too-soon",
    type: "boolean",
    question: "Anda terlalu cepat hamil lagi (< 2 Tahun)?",
    score: 4,
  },
  {
    id: "too-long",
    type: "boolean",
    question: "Anda terlalu lama hamil lagi (> 10 Tahun)?",
    score: 4,
  },
  {
    id: "too-many-children",
    type: "boolean",
    question: "Anda terlalu banyak anak (4 atau lebih)?",
    score: 4,
  },
  {
    id: "too-short",
    type: "boolean",
    question: "Anda terlalu pendek (<= 145 cm)?",
    score: 4,
  },
  {
    id: "abortion-history",
    type: "boolean",
    question: "Anda pernah gagal kehamilan atau abortus?",
    score: 4,
  },
  {
    id: "birth-history",
    type: "multiple",
    question: "Anda pernah melahirkan dengan?",
    options: [
      { label: "Vacuum", value: "vacuum", score: 4 },
      { label: "Uri dirogoh", value: "uri-dirogoh", score: 4 },
      { label: "Infus/transfusi", value: "infus-transfusi", score: 4 },
      { label: "Belum pernah", value: "none", score: 0 },
    ],
  },
  {
    id: "c-section-history",
    type: "boolean",
    question: "Anda pernah operasi sesar?",
    score: 4,
  },
  {
    id: "maternal-illness",
    type: "multiple",
    question: "Penyakit pada ibu hamil yang pernah/sedang dialami?",
    options: [
      { label: "Kurang darah", value: "anemia", score: 4 },
      { label: "Malaria", value: "malaria", score: 4 },
      { label: "TBC paru", value: "tbc-paru", score: 4 },
      { label: "Payah jantung", value: "payah-jantung", score: 4 },
      { label: "Kencing manis", value: "kencing-manis", score: 4 },
      { label: "Penyakit menular seksual", value: "pms", score: 4 },
      { label: "Tidak ada", value: "none", score: 0 },
    ],
  },
  {
    id: "swelling-high-blood",
    type: "boolean",
    question: "Ada bengkak pada muka/tungkai dan tekanan darah tinggi?",
    score: 4,
  },
  {
    id: "twins",
    type: "boolean",
    question: "Hamil kembar 2 atau lebih?",
    score: 4,
  },
  {
    id: "hydramnion",
    type: "boolean",
    question: "Hamil kembar air (hydramnion)?",
    score: 4,
  },
  {
    id: "fetal-death",
    type: "boolean",
    question: "Pernah/terdapat bayi mati dalam kandungan?",
    score: 4,
  },
  {
    id: "post-term",
    type: "boolean",
    question: "Kehamilan lebih bulan?",
    score: 4,
  },
  {
    id: "breech",
    type: "boolean",
    question: "Letak bayi sungsang?",
    score: 8,
  },
  {
    id: "transverse",
    type: "boolean",
    question: "Letak bayi lintang?",
    score: 8,
  },
  {
    id: "bleeding",
    type: "boolean",
    question: "Ada perdarahan dalam kehamilan ini?",
    score: 8,
  },
  {
    id: "severe-preeclampsia",
    type: "boolean",
    question: "Ada preeklampsia berat atau kejang-kejang?",
    score: 8,
  },
];

export const getRiskCategory = (score: number) => {
  if (score >= 12) {
    return "Sangat Tinggi";
  }

  if (score >= 6) {
    return "Tinggi";
  }

  return "Rendah";
};