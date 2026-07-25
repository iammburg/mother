import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Download } from "lucide-react";
import { Button } from "~/components/ui/button";

import { getRiskAssessment } from "~/constants/riskQuestions";

export const Route = createFileRoute("/pemeriksaan-resiko/hasil")({
  validateSearch: (
    raw: Record<string, unknown>,
  ): { name: string; score: number } => ({
    name: String(raw.name ?? "Tidak diketahui"),
    score: Number(raw.score ?? 0),
  }),
  component: HasilPage,
});

function HasilPage() {
  const { name, score } = Route.useSearch();
  const assessment = getRiskAssessment(score);

  return (
    <main className="fixed inset-0 flex flex-col overflow-hidden bg-primary">
      {/* Title */}
      <div className="shrink-0 px-4 pb-6 pt-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-xl font-extrabold tracking-tight text-primary-foreground sm:text-3xl">
            Hasil Pemeriksaan Risiko
          </h1>
        </div>
      </div>

      {/* White scrollable container */}
      <div className="min-h-0 flex-1 overflow-hidden px-4 pb-4">
        <div className="mx-auto h-full max-w-4xl">
          <div className="h-full overflow-hidden rounded-2xl bg-white shadow">
            <div className="h-full overflow-y-auto p-5">
              <section className="space-y-4">
                <span className="text-2xl font-bold tracking-tight text-primary">
                  Detail Hasil
                </span>

                {/* Nama */}
                <div className="rounded-xl mt-6 border border-primary/30 bg-primary/5 p-4">
                  <span className="text-sm font-medium text-muted-foreground">
                    Nama Ibu Hamil
                  </span>
                  <p className="mt-1 text-lg font-bold text-foreground">
                    {name}
                  </p>
                </div>

                {/* Skor */}
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
                  <span className="text-sm font-medium text-muted-foreground">
                    Jumlah Skor
                  </span>
                  <p className="mt-1 text-4xl font-extrabold text-primary">
                    {score}
                  </p>
                </div>

                {/* Kategori Risiko */}
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
                  <span className="text-sm font-medium text-muted-foreground">
                    Kelompok Risiko
                  </span>
                  <p className="mt-1 text-lg font-bold text-foreground">
                    {assessment.categoryLabel}
                  </p>
                </div>

                {/* Detail Penanganan */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-primary/30 p-4">
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Perawatan
                    </span>
                    <p className="mt-1 text-base font-bold text-foreground">
                      {assessment.perawatan}
                    </p>
                  </div>

                  <div className="rounded-xl border border-primary/30 p-4">
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Rujukan
                    </span>
                    <p className="mt-1 text-base font-bold text-foreground">
                      {assessment.rujukan}
                    </p>
                  </div>

                  <div className="rounded-xl border border-primary/30 p-4">
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Tempat
                    </span>
                    <p className="mt-1 text-base font-bold text-foreground">
                      {assessment.tempat}
                    </p>
                  </div>

                  <div className="rounded-xl border border-primary/30 p-4">
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Penolong
                    </span>
                    <p className="mt-1 text-base font-bold text-foreground">
                      {assessment.penolong}
                    </p>
                  </div>
                </div>

                {/* Catatan */}
                <div className="rounded-xl border border-primary/40 bg-primary/10 p-4">
                  <p className="text-sm leading-relaxed text-foreground">
                    {assessment.category === "KRR" &&
                      "Hasil pemeriksaan menunjukkan bahwa kehamilan Anda termasuk dalam kategori risiko rendah. Perawatan dapat dilakukan oleh bidan di Polindes tanpa perlu dirujuk."}
                    {assessment.category === "KRT" &&
                      "Hasil pemeriksaan menunjukkan bahwa kehamilan Anda termasuk dalam kategori risiko tinggi. Disarankan perawatan oleh bidan dan dokter di Polindes atau Puskesmas/RS."}
                    {assessment.category === "KRST" &&
                      "Hasil pemeriksaan menunjukkan bahwa kehamilan Anda termasuk dalam kategori risiko sangat tinggi. Segera lakukan perawatan dengan dokter di Rumah Sakit. Jangan tunda!"}
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
          <Link to="/pemeriksaan-resiko">
            <Button
              variant="ghost"
              className="border-primary-foreground/40 bg-white p-4 text-primary hover:bg-white/90">
              <ChevronLeft className="size-4" />
              Kembali ke Form
            </Button>
          </Link>

          <Button
            variant="ghost"
            onClick={() => void downloadRiskResultPdf(name, score, assessment)}
            className="border-primary-foreground/40 bg-white p-4 text-primary hover:bg-white/90">
            <Download className="size-4" />
            Download
          </Button>
        </div>
      </div>
    </main>
  );
}

// ─── PDF helpers ──────────────────────────────────────────────────────

const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

function formatDate(date: Date) {
  return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

async function downloadRiskResultPdf(
  name: string,
  score: number,
  assessment: ReturnType<typeof getRiskAssessment>,
) {
  const canvas = document.createElement("canvas");
  canvas.width = 1240;
  canvas.height = 1754;

  const context = canvas.getContext("2d");

  if (!context) {
    return;
  }

  drawRiskResultPdfCanvas(context, canvas.width, canvas.height, {
    name,
    score,
    assessment,
  });

  const imageBlob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, "image/jpeg", 0.94);
  });

  if (!imageBlob) {
    return;
  }

  const imageBytes = new Uint8Array(await imageBlob.arrayBuffer());
  const pdfBlob = new Blob([createSinglePagePdf(imageBytes, canvas)], {
    type: "application/pdf",
  });
  const downloadUrl = URL.createObjectURL(pdfBlob);
  const anchor = document.createElement("a");
  anchor.href = downloadUrl;
  anchor.download = `hasil-pemeriksaan-risiko-${createPdfFileNamePart(name)}.pdf`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 0);
}

function drawRiskResultPdfCanvas(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  data: {
    name: string;
    score: number;
    assessment: ReturnType<typeof getRiskAssessment>;
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

  // Header banner
  drawRoundRect(context, margin, 48, contentWidth, 96, 24, pink, pink);
  drawText(context, "Hasil Pemeriksaan Risiko", width / 2, 91, {
    color: "#ffffff",
    font: "900 34px Nunito, Arial, sans-serif",
    align: "center",
  });
  drawText(context, formatDate(new Date()), width - margin - 28, 116, {
    color: "#ffffff",
    font: "800 15px Nunito, Arial, sans-serif",
    align: "right",
  });

  // ── Identitas ──
  drawPdfSectionTitle(context, "Identitas", margin, 184, contentWidth, pink);
  drawInfoGrid(context, margin, 238, contentWidth, [
    ["Nama Ibu Hamil", valueOrDash(data.name)],
    ["Tanggal Pemeriksaan", formatDate(new Date())],
  ]);

  // ── Skor Risiko (card rapi seperti Detail Penanganan) ──
  drawPdfSectionTitle(context, "Skor Risiko", margin, 360, contentWidth, pink);
  const scoreCardY = 400;
  const scoreCardH = 120;
  drawRoundRect(
    context,
    margin,
    scoreCardY,
    contentWidth,
    scoreCardH,
    16,
    softPink,
    pink,
  );
  drawText(context, "Jumlah Skor", margin + contentWidth / 2, scoreCardY + 32, {
    color: blue,
    font: "800 14px Nunito, Arial, sans-serif",
    align: "center",
  });
  drawText(
    context,
    String(data.score),
    margin + contentWidth / 2,
    scoreCardY + 66,
    {
      color: darkPink,
      font: "900 44px Nunito, Arial, sans-serif",
      align: "center",
    },
  );
  drawText(
    context,
    data.assessment.categoryLabel,
    margin + contentWidth / 2,
    scoreCardY + 98,
    {
      color: pink,
      font: "900 18px Nunito, Arial, sans-serif",
      align: "center",
    },
  );

  // ── Detail Penanganan ──
  drawPdfSectionTitle(
    context,
    "Detail Penanganan",
    margin,
    560,
    contentWidth,
    pink,
  );

  const cardTop = 616;
  const cardGap = 24;
  const cardWidth = (contentWidth - cardGap) / 2;
  const cardHeight = 100;

  const cards: Array<{ label: string; value: string }> = [
    { label: "Perawatan", value: data.assessment.perawatan },
    { label: "Rujukan", value: data.assessment.rujukan },
    { label: "Tempat", value: data.assessment.tempat },
    { label: "Penolong", value: data.assessment.penolong },
  ];

  cards.forEach((card, index) => {
    const column = index % 2;
    const row = Math.floor(index / 2);
    const cx = margin + column * (cardWidth + cardGap);
    const cy = cardTop + row * (cardHeight + cardGap);

    drawRoundRect(context, cx, cy, cardWidth, cardHeight, 16, softPink, pink);
    drawText(context, card.label, cx + cardWidth / 2, cy + 30, {
      color: blue,
      font: "800 18px Nunito, Arial, sans-serif",
      align: "center",
    });
    drawWrappedText(context, card.value, cx, cy + 62, cardWidth, {
      color: darkPink,
      font: "900 20px Nunito, Arial, sans-serif",
      lineHeight: 22,
      maxLines: 2,
      align: "center",
    });
  });

  // ── Catatan (card rapi seperti Detail Penanganan) ──
  const notesTop = cardTop + 2 * (cardHeight + cardGap) + 40;
  drawPdfSectionTitle(context, "Catatan", margin, notesTop, contentWidth, pink);

  const notes =
    data.assessment.category === "KRR"
      ? "Hasil pemeriksaan menunjukkan bahwa kehamilan Anda termasuk dalam kategori risiko rendah. Perawatan dapat dilakukan oleh bidan di Polindes tanpa perlu dirujuk."
      : data.assessment.category === "KRT"
        ? "Hasil pemeriksaan menunjukkan bahwa kehamilan Anda termasuk dalam kategori risiko tinggi. Disarankan perawatan oleh bidan dan dokter di Polindes atau Puskesmas/RS."
        : "Hasil pemeriksaan menunjukkan bahwa kehamilan Anda termasuk dalam kategori risiko sangat tinggi. Segera lakukan perawatan dengan dokter di Rumah Sakit. Jangan tunda!";

  const notesCardY = notesTop + 54;
  const notesCardH = 100;
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
  drawText(context, "Kesimpulan", margin + contentWidth / 2, notesCardY + 24, {
    color: blue,
    font: "800 14px Nunito, Arial, sans-serif",
    align: "center",
  });
  drawWrappedText(
    context,
    notes,
    margin + 28,
    notesCardY + 50,
    contentWidth - 56,
    {
      color: darkPink,
      font: "800 18px Nunito, Arial, sans-serif",
      lineHeight: 24,
      maxLines: 2,
      align: "left",
    },
  );

  // Footer
  drawText(
    context,
    "Dokumen ini merupakan ringkasan hasil pemeriksaan risiko kehamilan.",
    width / 2,
    height - 48,
    {
      color: blue,
      font: "800 15px Nunito, Arial, sans-serif",
      align: "center",
    },
  );
}

// ─── Drawing primitives ───────────────────────────────────────────────

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
    font: "900 24px Nunito, Arial, sans-serif",
    align: "center",
  });
  context.strokeStyle = color;
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(x, y + 22);
  context.lineTo(x + width, y + 22);
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
  const rowHeight = 54;

  items.forEach(([label, value], index) => {
    const column = index % 3;
    const row = Math.floor(index / 3);
    const itemX = x + column * columnWidth;
    const itemY = y + row * rowHeight;

    drawText(context, label, itemX, itemY, {
      color: "#ff9dcb",
      font: "800 14px Nunito, Arial, sans-serif",
    });
    drawWrappedText(context, value, itemX, itemY + 24, columnWidth - 24, {
      color: "#ff85bd",
      font: "900 16px Nunito, Arial, sans-serif",
      lineHeight: 19,
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
    context.lineWidth = 3;
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

// ─── PDF assembly (same pattern as pemeriksaan-mandiri) ──────────────

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
