export const tossCards = [
  "Merupakan Kampanye untuk Temukan Tuberkolosis, Obati Sampai Sembuh TBC di Indonesia.",
  "Kampanye untuk menemukan, mendiagnosis, mengobati, dan menyembuhkan pasien TBC serta menghentikan penularan TBC di masyarakat.",
  "TOSS TBC menargetkan 90% penurunan insiden TBC dan 95% penurunan kematian TBC pada tahun 2030.",
];

export type TossAutoGlowState = {
  x: number;
  y: number;
  scale: number;
  opacity: number;
  targetX: number;
  targetY: number;
  targetScale: number;
  targetOpacity: number;
  nextTargetAt: number;
  speed: number;
};

export const initialTossGlowStates: TossAutoGlowState[] = [
  { x: 12, y: 16, scale: 1, opacity: 0.64, targetX: 72, targetY: 34, targetScale: 1.12, targetOpacity: 0.8, nextTargetAt: 0, speed: 0.011 },
  { x: 82, y: 12, scale: 0.92, opacity: 0.6, targetX: 24, targetY: 62, targetScale: 1.18, targetOpacity: 0.76, nextTargetAt: 0, speed: 0.009 },
  { x: 48, y: 72, scale: 1.12, opacity: 0.58, targetX: 88, targetY: 84, targetScale: 0.96, targetOpacity: 0.72, nextTargetAt: 0, speed: 0.01 },
  { x: 8, y: 84, scale: 0.9, opacity: 0.62, targetX: 64, targetY: 22, targetScale: 1.08, targetOpacity: 0.78, nextTargetAt: 0, speed: 0.012 },
  { x: 88, y: 68, scale: 1.04, opacity: 0.56, targetX: 34, targetY: 8, targetScale: 1.16, targetOpacity: 0.74, nextTargetAt: 0, speed: 0.0095 },
];