import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Download, AlertCircle, CheckCircle2, ShieldAlert } from "lucide-react";
import { Button } from "~/components/ui/button";

import {
  evaluateTbScreening,
  tbQuestionsList,
  type TbQuestionAnswer,
  type TbAssessmentResult,
} from "~/constants/tbQuestions";

export interface TbHasilSearch {
  nama?: string;
  usia?: string;
  noRm?: string;
  alamat?: string;
  tanggal?: string;
  q1?: TbQuestionAnswer;
  q2?: TbQuestionAnswer;
  q3?: TbQuestionAnswer;
  q4?: TbQuestionAnswer;
  q5?: TbQuestionAnswer;
  q6?: TbQuestionAnswer;
  q7?: TbQuestionAnswer;
  q8?: TbQuestionAnswer;
  q9?: TbQuestionAnswer;
  q10?: string;
}

export const Route = createFileRoute("/deteksi-dini-tb/hasil")({
  validateSearch: (raw: Record<string, unknown>): TbHasilSearch => ({
    nama: String(raw.nama ?? "Tidak diketahui"),
    usia: String(raw.usia ?? "-"),
    noRm: String(raw.noRm ?? "-"),
    alamat: String(raw.alamat ?? "-"),
    tanggal: String(raw.tanggal ?? new Date().toISOString().slice(0, 10)),
    q1: (raw.q1 as TbQuestionAnswer) ?? "Tidak",
    q2: (raw.q2 as TbQuestionAnswer) ?? "Tidak",
    q3: (raw.q3 as TbQuestionAnswer) ?? "Tidak",
    q4: (raw.q4 as TbQuestionAnswer) ?? "Tidak",
    q5: (raw.q5 as TbQuestionAnswer) ?? "Tidak",
    q6: (raw.q6 as TbQuestionAnswer) ?? "Tidak",
    q7: (raw.q7 as TbQuestionAnswer) ?? "Tidak",
    q8: (raw.q8 as TbQuestionAnswer) ?? "Tidak",
    q9: (raw.q9 as TbQuestionAnswer) ?? "Tidak",
    q10: String(raw.q10 ?? "Tidak Ada"),
  }),
  component: HasilSkriningTbPage,
});

function HasilSkriningTbPage() {
  const search = Route.useSearch();
  const assessment = evaluateTbScreening(search);
  const penyakitLainList = (search.q10 ?? "Tidak Ada")
    .split(",")
    .filter(Boolean);

  return (
    <main className="fixed inset-0 flex flex-col overflow-hidden bg-primary font-sans">
      {/* Title */}
      <div className="shrink-0 px-4 pb-6 pt-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-xl font-extrabold tracking-tight text-primary-foreground sm:text-3xl">
            Hasil Skrining Deteksi Dini TBC
          </h1>
        </div>
      </div>

      {/* White scrollable container */}
      <div className="min-h-0 flex-1 overflow-hidden px-4 pb-4">
        <div className="mx-auto h-full max-w-4xl">
          <div className="h-full overflow-hidden rounded-2xl bg-white shadow">
            <div className="h-full overflow-y-auto p-5 sm:p-7">
              <section className="space-y-5">
                <div className="flex items-center justify-between border-b pb-3">
                  <span className="text-2xl font-bold tracking-tight text-primary">
                    Detail Hasil Skrining TBC
                  </span>
                  <span className="text-xs font-semibold text-muted-foreground sm:text-sm">
                    {search.tanggal}
                  </span>
                </div>

                {/* Identitas Pasien */}
                <div className="grid gap-3 sm:grid-cols-2 rounded-xl border border-primary/30 bg-primary/5 p-4">
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Nama Ibu Hamil / Pasien
                    </span>
                    <p className="mt-0.5 text-base font-bold text-foreground">
                      {search.nama}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Usia
                    </span>
                    <p className="mt-0.5 text-base font-bold text-foreground">
                      {search.usia}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      No. Rekam Medis (RM)
                    </span>
                    <p className="mt-0.5 text-base font-bold text-foreground">
                      {search.noRm}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Alamat
                    </span>
                    <p className="mt-0.5 text-base font-bold text-foreground">
                      {search.alamat}
                    </p>
                  </div>
                </div>

                {/* Status Card */}
                <div
                  className={`rounded-xl border p-5 text-center ${
                    assessment.category === "SUSPEK"
                      ? "border-red-400 bg-red-50 text-red-700"
                      : assessment.category === "SEDANG"
                        ? "border-amber-400 bg-amber-50 text-amber-800"
                        : "border-emerald-400 bg-emerald-50 text-emerald-800"
                  }`}>
                  <div className="flex items-center justify-center gap-2">
                    {assessment.category === "SUSPEK" ? (
                      <ShieldAlert className="size-7 text-red-600" />
                    ) : assessment.category === "SEDANG" ? (
                      <AlertCircle className="size-7 text-amber-600" />
                    ) : (
                      <CheckCircle2 className="size-7 text-emerald-600" />
                    )}
                    <span className="text-sm font-semibold uppercase tracking-wider">
                      Hasil Evaluasi Skrining
                    </span>
                  </div>
                  <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                    {assessment.statusTitle}
                  </h2>
                  <p className="mt-1 text-sm font-semibold opacity-90">
                    {assessment.statusBadge}
                  </p>
                </div>

                {/* Detail Penanganan */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    Rekomendasi Penanganan & Fasilitas Kesehatan
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-primary/30 p-4 bg-white">
                      <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                        Perawatan
                      </span>
                      <p className="mt-1 text-base font-bold text-foreground">
                        {assessment.perawatan}
                      </p>
                    </div>

                    <div className="rounded-xl border border-primary/30 p-4 bg-white">
                      <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                        Rujukan
                      </span>
                      <p className="mt-1 text-base font-bold text-foreground">
                        {assessment.rujukan}
                      </p>
                    </div>

                    <div className="rounded-xl border border-primary/30 p-4 bg-white">
                      <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                        Tempat Pelayanan
                      </span>
                      <p className="mt-1 text-base font-bold text-foreground">
                        {assessment.tempat}
                      </p>
                    </div>

                    <div className="rounded-xl border border-primary/30 p-4 bg-white">
                      <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                        Penolong Medis
                      </span>
                      <p className="mt-1 text-base font-bold text-foreground">
                        {assessment.penolong}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ringkasan Gejala yang Diisi */}
                <div className="rounded-xl border border-primary/30 p-4 bg-primary/5">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">
                    Ringkasan Pertanyaan & Gejala Dilaporkan
                  </h3>
                  <div className="grid gap-2 text-xs sm:text-sm">
                    {tbQuestionsList.map((q) => {
                      const answerValue = search[q.id] ?? "Tidak";
                      const isPositive = answerValue === "Ya";
                      return (
                        <div
                          key={q.id}
                          className="flex items-center justify-between gap-3 border-b border-primary/10 pb-1.5 last:border-b-0">
                          <span className="text-muted-foreground font-medium">
                            {q.num}. {q.question}
                          </span>
                          <span
                            className={`shrink-0 font-bold px-2.5 py-0.5 rounded-md text-xs ${
                              isPositive
                                ? "bg-red-100 text-red-700 border border-red-300"
                                : "bg-emerald-100 text-emerald-700 border border-emerald-300"
                            }`}>
                            {answerValue}
                          </span>
                        </div>
                      );
                    })}
                    <div className="flex items-center justify-between gap-3 pt-2">
                      <span className="text-muted-foreground font-medium">
                        10. Penyakit Lain
                      </span>
                      <span className="font-bold text-primary text-xs">
                        {penyakitLainList.join(", ")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Catatan Kesimpulan */}
                <div className="rounded-xl border border-primary/40 bg-primary/10 p-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-1">
                    Catatan &amp; Tindak Lanjut Medis
                  </span>
                  <p className="text-sm leading-relaxed text-foreground font-medium">
                    {assessment.catatan}
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="shrink-0 px-4 pb-6 pt-3">
        <div className="mx-auto flex max-w-4xl items-center justify-center gap-4">
          <Link to="/deteksi-dini-tb/skrining">
            <Button
              variant="ghost"
              className="border-primary-foreground/40 bg-white p-4 text-primary hover:bg-white/90">
              <ChevronLeft className="size-4" />
              Kembali ke Form
            </Button>
          </Link>

          <Button
            variant="ghost"
            onClick={() =>
              void downloadTbResultPdf(search, assessment, penyakitLainList)
            }
            className="border-primary-foreground/40 bg-white p-4 text-primary hover:bg-white/90">
            <Download className="size-4" />
            Download PDF
          </Button>
        </div>
      </div>
    </main>
  );
}

// ─── PDF helpers & Canvas rendering ──────────────────────────────────

async function downloadTbResultPdf(
  search: TbHasilSearch,
  assessment: TbAssessmentResult,
  penyakitLainList: string[],
) {
  const canvas = document.createElement("canvas");
  canvas.width = 1240;
  canvas.height = 1754;

  const context = canvas.getContext("2d");
  if (!context) return;

  drawTbResultPdfCanvas(context, canvas.width, canvas.height, {
    search,
    assessment,
    penyakitLainList,
  });

  const imageBlob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, "image/jpeg", 0.94);
  });

  if (!imageBlob) return;

  const imageBytes = new Uint8Array(await imageBlob.arrayBuffer());
  const pdfBlob = new Blob([createSinglePagePdf(imageBytes, canvas)], {
    type: "application/pdf",
  });

  const downloadUrl = URL.createObjectURL(pdfBlob);
  const anchor = document.createElement("a");
  anchor.href = downloadUrl;
  anchor.download = `hasil-skrining-tb-${createPdfFileNamePart(search.nama)}.pdf`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 0);
}

function drawTbResultPdfCanvas(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  data: {
    search: TbHasilSearch;
    assessment: TbAssessmentResult;
    penyakitLainList: string[];
  },
) {
  const pink = "#F891BB";
  const darkPink = "#e05a9a";
  const softPink = "#fff3f8";
  const blue = "#78a7df";
  const margin = 70;
  const contentWidth = width - margin * 2;

  // Background
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);

  // Header Banner
  drawRoundRect(context, margin, 48, contentWidth, 96, 24, pink, pink);
  drawText(context, "Hasil Skrining Deteksi Dini TBC", width / 2, 91, {
    color: "#ffffff",
    font: "900 32px Nunito, Arial, sans-serif",
    align: "center",
  });
  drawText(context, data.search.tanggal ?? "", width - margin - 28, 116, {
    color: "#ffffff",
    font: "800 15px Nunito, Arial, sans-serif",
    align: "right",
  });

  // ── Identitas Pasien ──
  drawPdfSectionTitle(context, "Identitas Pasien", margin, 184, contentWidth, pink);
  drawInfoGrid(context, margin, 238, contentWidth, [
    ["Nama Pasien", valueOrDash(data.search.nama)],
    ["Usia", valueOrDash(data.search.usia)],
    ["No. Rekam Medis (RM)", valueOrDash(data.search.noRm)],
    ["Alamat", valueOrDash(data.search.alamat)],
    ["Tanggal Skrining", valueOrDash(data.search.tanggal)],
  ]);

  // ── Status Evaluasi Skrining ──
  drawPdfSectionTitle(
    context,
    "Status Evaluasi Skrining TBC",
    margin,
    370,
    contentWidth,
    pink,
  );
  const statusCardY = 410;
  const statusCardH = 110;
  const statusBg =
    data.assessment.category === "SUSPEK"
      ? "#fff1f0"
      : data.assessment.category === "SEDANG"
        ? "#fffbe6"
        : softPink;

  drawRoundRect(
    context,
    margin,
    statusCardY,
    contentWidth,
    statusCardH,
    16,
    statusBg,
    pink,
  );
  drawText(context, "Hasil Evaluasi", margin + contentWidth / 2, statusCardY + 30, {
    color: blue,
    font: "800 14px Nunito, Arial, sans-serif",
    align: "center",
  });
  drawText(
    context,
    data.assessment.statusTitle,
    margin + contentWidth / 2,
    statusCardY + 65,
    {
      color: darkPink,
      font: "900 32px Nunito, Arial, sans-serif",
      align: "center",
    },
  );
  drawText(
    context,
    data.assessment.statusBadge,
    margin + contentWidth / 2,
    statusCardY + 92,
    {
      color: pink,
      font: "800 16px Nunito, Arial, sans-serif",
      align: "center",
    },
  );

  // ── Detail Penanganan ──
  drawPdfSectionTitle(
    context,
    "Detail Penanganan & Rujukan",
    margin,
    550,
    contentWidth,
    pink,
  );

  const cardTop = 590;
  const cardGap = 20;
  const cardWidth = (contentWidth - cardGap) / 2;
  const cardHeight = 90;

  const cards = [
    { label: "Perawatan", value: data.assessment.perawatan },
    { label: "Rujukan", value: data.assessment.rujukan },
    { label: "Tempat Pelayanan", value: data.assessment.tempat },
    { label: "Penolong Medis", value: data.assessment.penolong },
  ];

  cards.forEach((card, index) => {
    const column = index % 2;
    const row = Math.floor(index / 2);
    const cx = margin + column * (cardWidth + cardGap);
    const cy = cardTop + row * (cardHeight + cardGap);

    drawRoundRect(context, cx, cy, cardWidth, cardHeight, 16, softPink, pink);
    drawText(context, card.label, cx + cardWidth / 2, cy + 26, {
      color: blue,
      font: "800 16px Nunito, Arial, sans-serif",
      align: "center",
    });
    drawWrappedText(context, card.value, cx, cy + 54, cardWidth, {
      color: darkPink,
      font: "900 17px Nunito, Arial, sans-serif",
      lineHeight: 20,
      maxLines: 2,
      align: "center",
    });
  });

  // ── Ringkasan Gejala yang Diisi ──
  const symptomsTop = cardTop + 2 * (cardHeight + cardGap) + 20;
  drawPdfSectionTitle(
    context,
    "Ringkasan Gejala yang Dilaporkan",
    margin,
    symptomsTop,
    contentWidth,
    pink,
  );

  let qY = symptomsTop + 45;
  tbQuestionsList.forEach((q) => {
    const ans = (data.search[q.id] as string) ?? "Tidak";
    drawText(context, `${q.num}. ${q.question}`, margin, qY, {
      color: "#4a5568",
      font: "700 14px Nunito, Arial, sans-serif",
    });
    drawText(context, ans, margin + contentWidth - 20, qY, {
      color: ans === "Ya" ? "#e53e3e" : "#38a169",
      font: "900 14px Nunito, Arial, sans-serif",
      align: "right",
    });
    qY += 24;
  });

  drawText(
    context,
    `10. Penyakit Lain: ${data.penyakitLainList.join(", ")}`,
    margin,
    qY,
    {
      color: "#4a5568",
      font: "700 14px Nunito, Arial, sans-serif",
    },
  );

  // ── Catatan Kesimpulan ──
  const notesTop = qY + 40;
  drawPdfSectionTitle(
    context,
    "Catatan & Tindak Lanjut Medis",
    margin,
    notesTop,
    contentWidth,
    pink,
  );

  const notesCardY = notesTop + 45;
  const notesCardH = 110;
  drawRoundRect(
    context,
    margin,
    notesCardY,
    contentWidth,
    notesCardH,
    16,
    softPink,
    pink,
  );
  drawWrappedText(
    context,
    data.assessment.catatan,
    margin + 24,
    notesCardY + 40,
    contentWidth - 48,
    {
      color: darkPink,
      font: "800 16px Nunito, Arial, sans-serif",
      lineHeight: 22,
      maxLines: 3,
      align: "left",
    },
  );

  // Footer
  drawText(
    context,
    "Dokumen ini merupakan ringkasan resmi hasil skrining deteksi dini TBC pada ibu hamil.",
    width / 2,
    height - 40,
    {
      color: blue,
      font: "800 14px Nunito, Arial, sans-serif",
      align: "center",
    },
  );
}

// ─── Drawing Primitives ───────────────────────────────────────────────

function drawPdfSectionTitle(
  context: CanvasRenderingContext2D,
  title: string,
  x: number,
  y: number,
  width: number,
  color: string,
) {
  drawText(context, title, x + width / 2, y, {
    color,
    font: "900 22px Nunito, Arial, sans-serif",
    align: "center",
  });
  context.strokeStyle = color;
  context.lineWidth = 2.5;
  context.beginPath();
  context.moveTo(x, y + 18);
  context.lineTo(x + width, y + 18);
  context.stroke();
}

function drawInfoGrid(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  items: Array<[string, string]>,
) {
  const columnWidth = width / 3;
  const rowHeight = 50;

  items.forEach(([label, value], index) => {
    const column = index % 3;
    const row = Math.floor(index / 3);
    const itemX = x + column * columnWidth;
    const itemY = y + row * rowHeight;

    drawText(context, label, itemX, itemY, {
      color: "#ff9dcb",
      font: "800 13px Nunito, Arial, sans-serif",
    });
    drawWrappedText(context, value, itemX, itemY + 22, columnWidth - 20, {
      color: "#ff85bd",
      font: "900 15px Nunito, Arial, sans-serif",
      lineHeight: 18,
      maxLines: 2,
    });
  });
}

function drawRoundRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  fill: string,
  stroke?: string,
) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius,
    y + height,
  );
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
  context.fillStyle = fill;
  context.fill();

  if (stroke) {
    context.strokeStyle = stroke;
    context.lineWidth = 2.5;
    context.stroke();
  }
}

function drawText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  options: {
    color: string;
    font: string;
    align?: CanvasTextAlign;
  },
) {
  context.fillStyle = options.color;
  context.font = options.font;
  context.textAlign = options.align ?? "left";
  context.textBaseline = "middle";
  context.fillText(text, x, y);
}

function drawWrappedText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  options: {
    color: string;
    font: string;
    lineHeight: number;
    maxLines: number;
    align?: CanvasTextAlign;
  },
) {
  context.fillStyle = options.color;
  context.font = options.font;
  context.textAlign = options.align ?? "left";
  context.textBaseline = "middle";

  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";

  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (context.measureText(testLine).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = testLine;
    }
  });

  if (line) {
    lines.push(line);
  }

  lines.slice(0, options.maxLines).forEach((currentLine, index) => {
    const suffix =
      index === options.maxLines - 1 && lines.length > options.maxLines
        ? "..."
        : "";
    const lineX = options.align === "center" ? x + maxWidth / 2 : x;
    context.fillText(
      `${currentLine}${suffix}`,
      lineX,
      y + index * options.lineHeight,
    );
  });
}

function createSinglePagePdf(
  imageBytes: Uint8Array,
  canvas: HTMLCanvasElement,
) {
  const encoder = new TextEncoder();
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const content = `q\n${pageWidth} 0 0 ${pageHeight} 0 0 cm\n/Im0 Do\nQ`;
  const objects: PdfObject[] = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>`,
    [
      `<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imageBytes.length} >>\nstream\n`,
      imageBytes,
      "\nendstream",
    ],
    `<< /Length ${encoder.encode(content).length} >>\nstream\n${content}\nendstream`,
  ];

  return assemblePdfObjects(objects);
}

type PdfObject = string | Uint8Array | Array<string | Uint8Array>;

function assemblePdfObjects(objects: PdfObject[]) {
  const encoder = new TextEncoder();
  const chunks: Uint8Array[] = [];
  const offsets: number[] = [];
  let offset = 0;

  const push = (chunk: string | Uint8Array) => {
    const bytes = typeof chunk === "string" ? encoder.encode(chunk) : chunk;
    chunks.push(bytes);
    offset += bytes.length;
  };

  push("%PDF-1.4\n%\u00ff\u00ff\u00ff\u00ff\n");

  objects.forEach((object, index) => {
    offsets.push(offset);
    push(`${index + 1} 0 obj\n`);

    if (Array.isArray(object)) {
      object.forEach((part) => push(part));
    } else {
      push(object);
    }

    push("\nendobj\n");
  });

  const xrefOffset = offset;
  push(`xref\n0 ${objects.length + 1}\n`);
  push("0000000000 65535 f \n");
  offsets.forEach((objectOffset) => {
    push(`${objectOffset.toString().padStart(10, "0")} 00000 n \n`);
  });
  push(
    `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`,
  );

  const pdfBytes = new Uint8Array(offset);
  let cursor = 0;
  chunks.forEach((chunk) => {
    pdfBytes.set(chunk, cursor);
    cursor += chunk.length;
  });

  return pdfBytes;
}

function createPdfFileNamePart(value?: string) {
  const normalized = value
    ?.trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return normalized || new Date().toISOString().slice(0, 10);
}

function valueOrDash(value?: string) {
  return value && value.trim() ? value : "-";
}
