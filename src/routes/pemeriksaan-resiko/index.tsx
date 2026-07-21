import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import {
  riskQuestions,
  getRiskCategory,
  initialPregnancyScore,
} from "~/constants/riskQuestions";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { AppNavbar } from "~/components/AppNavbar";
import { cn } from "~/lib/utils";
import type { RiskQuestion } from "~/constants/riskQuestions";

export const Route = createFileRoute("/pemeriksaan-resiko/")({
  component: PemeriksaanResikoPage,
});

const infoCards = [
  {
    title: "Deteksi Dini Faktor Risiko",
    description:
      "Kuesioner ini membantu mengidentifikasi faktor risiko kehamilan sejak dini berdasarkan sistem skrining Poedji Rochjati, sehingga penanganan dapat dilakukan lebih awal.",
  },
  {
    title: "Pencegahan Komplikasi",
    description:
      "Dengan mengetahui risiko sejak awal, ibu hamil dapat memperoleh pendampingan dan perawatan yang tepat untuk mencegah komplikasi serius saat persalinan.",
  },
  {
    title: "Skor & Kategori Risiko",
    description:
      "Semakin tinggi skor yang diperoleh, semakin besar risiko yang perlu diwaspadai. Konsultasikan hasil skrining dengan bidan atau dokter kandungan untuk tindak lanjut.",
  },
];

function PemeriksaanResikoPage() {
  const [booleanAnswers, setBooleanAnswers] = useState<Record<string, boolean>>(
    {},
  );
  const [multipleAnswers, setMultipleAnswers] = useState<
    Record<string, string[]>
  >({});

  const totalScore = useMemo(() => {
    const booleanScore = riskQuestions.reduce((total, item) => {
      if (item.type !== "boolean" || !booleanAnswers[item.id]) {
        return total;
      }

      return total + item.score;
    }, 0);

    const multipleScore = riskQuestions.reduce((total, item) => {
      if (item.type !== "multiple") {
        return total;
      }

      const selectedValues = multipleAnswers[item.id] ?? [];
      const selectedScore = item.options.reduce((optionTotal, option) => {
        if (!selectedValues.includes(option.value)) {
          return optionTotal;
        }

        return optionTotal + option.score;
      }, 0);

      return total + selectedScore;
    }, 0);

    return initialPregnancyScore + booleanScore + multipleScore;
  }, [booleanAnswers, multipleAnswers]);

  const handleMultipleChange = (
    question: Extract<RiskQuestion, { type: "multiple" }>,
    value: string,
  ) => {
    setMultipleAnswers((currentAnswers) => {
      const currentValues = currentAnswers[question.id] ?? [];

      if (value === "none") {
        return {
          ...currentAnswers,
          [question.id]: currentValues.includes("none") ? [] : ["none"],
        };
      }

      const withoutNone = currentValues.filter((item) => item !== "none");
      const nextValues = withoutNone.includes(value)
        ? withoutNone.filter((item) => item !== value)
        : [...withoutNone, value];

      return {
        ...currentAnswers,
        [question.id]: nextValues,
      };
    });
  };

  return (
    <>
      <div className="sticky top-0 z-50 pb-22 pt-6">
        <AppNavbar />
      </div>

      <main className="mx-auto min-h-screen max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="mb-12 text-center">
          <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Formulir Pemeriksaan Risiko
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Silakan isi formulir di bawah ini untuk mengetahui masalah atau
            faktor risiko kehamilan Anda.
          </p>
        </section>

        {/* Informational Cards */}
        <section className="mb-12 grid gap-5 sm:grid-cols-3">
          {infoCards.map((card) => (
            <article
              key={card.title}
              className="rounded-xl border bg-secondary p-5 shadow-sm">
              <h2 className="mb-2 font-semibold">{card.title}</h2>
              <p className="text-sm leading-relaxed">{card.description}</p>
            </article>
          ))}
        </section>

        {/* Score Summary */}
        <section className="mb-10">
          <div
            className={cn(
              "flex items-center justify-between rounded-xl border px-6 py-4 shadow-sm",
              totalScore >= 12
                ? "border-destructive/30 bg-destructive/5"
                : totalScore >= 6
                  ? "border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/20"
                  : "border-emerald-300 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/20",
            )}>
            <div>
              <p className="text-sm text-muted-foreground">Total Skor</p>
              <p className="text-3xl font-black tracking-tight text-foreground">
                {totalScore}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Kategori Risiko</p>
              <strong
                className={cn(
                  "text-lg font-bold",
                  totalScore >= 12
                    ? "text-destructive"
                    : totalScore >= 6
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-emerald-600 dark:text-emerald-400",
                )}>
                {getRiskCategory(totalScore)}
              </strong>
            </div>
          </div>
        </section>

        {/* Questions */}
        <section className="space-y-6" aria-label="Daftar pertanyaan">
          {riskQuestions.map((item, index) => (
            <fieldset
              className="rounded-xl border bg-card/70 p-5 shadow-sm"
              key={item.id}>
              <legend className="flex items-start gap-3 text-base font-semibold text-card-foreground">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {index + 1}
                </span>
                <span className="pt-0.5 font-bold">{item.question}</span>
              </legend>

              {item.type === "boolean" ? (
                <RadioGroup
                  value={
                    booleanAnswers[item.id] === undefined
                      ? ""
                      : String(booleanAnswers[item.id])
                  }
                  onValueChange={(value) =>
                    setBooleanAnswers((prev) => ({
                      ...prev,
                      [item.id]: value === "true",
                    }))
                  }
                  className="flex gap-8">
                  <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-muted-foreground has-data-checked:text-foreground">
                    <RadioGroupItem value="true" />
                    Ya
                  </label>
                  <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-muted-foreground has-data-checked:text-foreground">
                    <RadioGroupItem value="false" />
                    Tidak
                  </label>
                </RadioGroup>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {item.options.map((option) => {
                    const isSelected = (
                      multipleAnswers[item.id] ?? []
                    ).includes(option.value);

                    return (
                      <label
                        key={option.value}
                        className={cn(
                          "flex cursor-pointer items-center gap-2.5 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors",
                          isSelected
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-input text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}>
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={isSelected}
                          onChange={() =>
                            handleMultipleChange(item, option.value)
                          }
                        />
                        <span
                          className={cn(
                            "flex size-4 shrink-0 items-center justify-center rounded border transition-colors",
                            isSelected
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-input",
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
                        {option.label}
                      </label>
                    );
                  })}
                </div>
              )}
            </fieldset>
          ))}
        </section>
      </main>
    </>
  );
}
