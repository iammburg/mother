import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
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
      <div className="min-h-0 flex-1 relative px-4 pb-4">
        <div className="absolute left-1/2 top-0 bottom-4 w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 overflow-y-auto rounded-2xl border-t-8 border-white bg-white p-5 shadow-lg sm:p-8 scrollbar-thumb-white scrollbar-track-transparent">
          <section className="space-y-4">
            <span className="text-2xl font-bold tracking-tight text-primary">
              Detail Hasil
            </span>

            {/* Nama */}
            <div className="rounded-xl mt-6 border border-primary/30 bg-primary/5 p-4">
              <span className="text-sm font-medium text-muted-foreground">
                Nama Ibu Hamil
              </span>
              <p className="mt-1 text-lg font-bold text-foreground">{name}</p>
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

      {/* Bottom buttons */}
      <div className="shrink-0 px-4 pb-6 pt-3">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link to="/pemeriksaan-resiko">
            <Button
              variant="ghost"
              className="border-primary-foreground/40 bg-white p-4 text-primary hover:bg-white/90">
              <ChevronLeft className="size-4" />
              Kembali ke Form
            </Button>
          </Link>

          <Link to="/" hash="cek-risiko">
            <Button
              variant="ghost"
              className="bg-white p-4 text-primary hover:bg-white/90">
              <ChevronLeft className="size-4" />
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
