import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import EyeIcon from "@iconify-react/mdi/eye";

import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import {
  tbQuestionsList,
  q10Options,
  type TbQuestionAnswer,
} from "~/constants/tbQuestions";

export const Route = createFileRoute("/deteksi-dini-tb/skrining")({
  component: SkriningTbcPage,
});

function getTodayString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function SkriningTbcPage() {
  const navigate = useNavigate();

  // Identitas Pasien
  const [nama, setNama] = useState("");
  const [usia, setUsia] = useState("");
  const [noRm, setNoRm] = useState("");
  const [alamat, setAlamat] = useState("");
  const [tanggal, setTanggal] = useState(getTodayString());

  // Jawaban Pertanyaan 1 - 9
  const [answers, setAnswers] = useState<Record<string, TbQuestionAnswer>>({
    q1: "Tidak",
    q2: "Tidak",
    q3: "Tidak",
    q4: "Tidak",
    q5: "Tidak",
    q6: "Tidak",
    q7: "Tidak",
    q8: "Tidak",
    q9: "Tidak",
  });

  // Jawaban Pertanyaan 10 (Penyakit Lain)
  const [penyakitLain, setPenyakitLain] = useState<string[]>(["Tidak Ada"]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRadioChange = (questionId: string, value: TbQuestionAnswer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleCheckboxToggle = (option: string) => {
    setPenyakitLain((prev) => {
      if (option === "Tidak Ada") {
        return ["Tidak Ada"];
      }

      const filtered = prev.filter((item) => item !== "Tidak Ada");
      if (filtered.includes(option)) {
        const next = filtered.filter((item) => item !== option);
        return next.length === 0 ? ["Tidak Ada"] : next;
      } else {
        return [...filtered, option];
      }
    });
  };

  const handleSubmit = () => {
    if (!nama.trim()) {
      setErrorMsg("Mohon isi nama lengkap pasien/ibu hamil.");
      return;
    }
    if (!usia.trim()) {
      setErrorMsg("Mohon isi usia.");
      return;
    }
    if (!noRm.trim()) {
      setErrorMsg("Mohon isi Nomor RM.");
      return;
    }
    if (!alamat.trim()) {
      setErrorMsg("Mohon isi alamat.");
      return;
    }
    if (!tanggal.trim()) {
      setErrorMsg("Mohon isi tanggal skrining.");
      return;
    }

    setErrorMsg(null);

    void navigate({
      to: "/deteksi-dini-tb/hasil",
      search: {
        nama,
        usia,
        noRm,
        alamat,
        tanggal,
        q1: answers.q1,
        q2: answers.q2,
        q3: answers.q3,
        q4: answers.q4,
        q5: answers.q5,
        q6: answers.q6,
        q7: answers.q7,
        q8: answers.q8,
        q9: answers.q9,
        q10: penyakitLain.join(","),
      },
    });
  };

  return (
    <main className="fixed inset-0 flex flex-col overflow-hidden bg-primary">
      {/* Title */}
      <div className="shrink-0 px-4 pb-6 pt-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-xl font-extrabold tracking-tight text-primary-foreground sm:text-3xl">
            Deteksi Dini TB
          </h1>
        </div>
      </div>

      {/* White scrollable container */}
      <div className="min-h-0 flex-1 relative px-4 pb-4">
        <div className="absolute left-1/2 top-0 bottom-4 w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 overflow-y-auto border-t-8 border-white rounded-2xl bg-white p-5 shadow-lg sm:p-8 scrollbar-thumb-white scrollbar-track-transparent">
          <section className="space-y-4" aria-label="Formulir Skrining TBC">
            <span className="text-2xl font-bold tracking-tight text-primary block">
              Formulir Skrining TBC
            </span>

            {errorMsg && (
              <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm font-semibold text-red-600">
                {errorMsg}
              </div>
            )}

            {/* Identitas Pasien Fields */}
            <div className="grid gap-3.5 sm:grid-cols-2 mt-4">
              <div className="flex items-center gap-3 rounded-xl border border-primary/40 p-3.5 shadow-sm focus-within:border-primary">
                <svg
                  className="size-5 shrink-0 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Nama Ibu Hamil / Pasien *"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none sm:text-base"
                />
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-primary/40 p-3.5 shadow-sm focus-within:border-primary">
                <svg
                  className="size-5 shrink-0 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Usia (contoh: 28 Tahun) *"
                  value={usia}
                  onChange={(e) => setUsia(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none sm:text-base"
                />
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-primary/40 p-3.5 shadow-sm focus-within:border-primary">
                <svg
                  className="size-5 shrink-0 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="No. Rekam Medis (RM) *"
                  value={noRm}
                  onChange={(e) => setNoRm(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none sm:text-base"
                />
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-primary/40 p-3.5 shadow-sm focus-within:border-primary">
                <svg
                  className="size-5 shrink-0 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <input
                  type="date"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none sm:text-base"
                />
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-primary/40 p-3.5 shadow-sm focus-within:border-primary sm:col-span-2">
                <svg
                  className="size-5 shrink-0 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Alamat Lengkap *"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none sm:text-base"
                />
              </div>
            </div>

            {/* Pertanyaan 1 - 9 */}
            {tbQuestionsList.map((item) => (
              <fieldset
                className="rounded-xl border mt-5 border-primary/40 p-4 shadow-sm"
                key={item.id}>
                <legend className="flex items-start gap-3 text-sm font-bold text-primary sm:text-base">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground sm:size-7 sm:text-sm">
                    {item.num}
                  </span>
                  <span className="pt-0.5">{item.question}</span>
                </legend>

                <RadioGroup
                  value={answers[item.id]}
                  onValueChange={(value) =>
                    handleRadioChange(item.id, value as TbQuestionAnswer)
                  }
                  className="flex gap-8 mt-2">
                  <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-muted-foreground has-data-checked:text-primary">
                    <RadioGroupItem value="Ya" />
                    Ya
                  </label>
                  <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-muted-foreground has-data-checked:text-primary">
                    <RadioGroupItem value="Tidak" />
                    Tidak
                  </label>
                </RadioGroup>
              </fieldset>
            ))}

            {/* Pertanyaan 10: Penyakit Lain */}
            <fieldset className="rounded-xl border mt-5 border-primary/40 p-4 shadow-sm">
              <legend className="flex items-start gap-3 text-sm font-bold text-primary sm:text-base">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground sm:size-7 sm:text-sm">
                  10
                </span>
                <span className="pt-0.5">Penyakit lain</span>
              </legend>

              <div className="flex flex-wrap gap-2 mt-3">
                {q10Options.map((option) => {
                  const isSelected = penyakitLain.includes(option);

                  return (
                    <label
                      key={option}
                      className={cn(
                        "flex cursor-pointer items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors",
                        isSelected
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-primary/30 text-muted-foreground hover:bg-primary/5 hover:text-primary",
                      )}>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={isSelected}
                        onChange={() => handleCheckboxToggle(option)}
                      />
                      <span
                        className={cn(
                          "flex size-4 shrink-0 items-center justify-center rounded border transition-colors",
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-primary/40",
                        )}>
                        {isSelected && (
                          <svg
                            className="size-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </span>
                      {option}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </section>
        </div>
      </div>

      {/* Bottom buttons (Outside scrollable frame) */}
      <div className="shrink-0 px-4 pb-6 pt-3">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link to="/deteksi-dini-tb">
            <Button className="border-primary-foreground/40 bg-white p-4 text-primary hover:bg-white/90">
              <ChevronLeft className="size-4" />
              Kembali
            </Button>
          </Link>

          <Button
            variant="outline"
            className="bg-primary border-2 text-primary-foreground p-4 shadow-md hover:bg-white/90"
            onClick={handleSubmit}>
            Lihat Hasil
            <EyeIcon height="1em" />
          </Button>
        </div>
      </div>
    </main>
  );
}
