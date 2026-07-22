import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronLeft, Eye } from "lucide-react";

import {
  riskQuestions,
  initialPregnancyScore,
} from "~/constants/riskQuestions";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import type { RiskQuestion } from "~/constants/riskQuestions";

export const Route = createFileRoute("/pemeriksaan-resiko/")({
  component: PemeriksaanResikoPage,
});

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
    <main className="fixed inset-0 flex flex-col overflow-hidden bg-primary">
      {/* Title */}
      <div className="shrink-0 px-4 pb-6 pt-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-extrabold tracking-tight text-primary-foreground sm:text-3xl">
            Formulir Pemeriksaan Risiko
          </h1>
        </div>
      </div>

      {/* White scrollable container */}
      <div className="min-h-0 flex-1 overflow-hidden px-4 pb-4">
        <div className="mx-auto h-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-5 shadow-lg sm:p-8">
          <section className="space-y-5" aria-label="Daftar pertanyaan">
            {riskQuestions.map((item, index) => (
              <fieldset
                className="rounded-xl border border-primary/40 p-4 shadow-sm"
                key={item.id}>
                <legend className=" flex items-start gap-3 text-sm font-bold text-primary sm:text-base">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground sm:size-7 sm:text-sm">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{item.question}</span>
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
                    <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-muted-foreground has-data-checked:text-primary">
                      <RadioGroupItem value="true" />
                      Ya
                    </label>
                    <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-muted-foreground has-data-checked:text-primary">
                      <RadioGroupItem value="false" />
                      Tidak
                    </label>
                  </RadioGroup>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {item.options.map((option) => {
                      const isSelected = (
                        multipleAnswers[item.id] ?? []
                      ).includes(option.value);

                      return (
                        <label
                          key={option.value}
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
                            onChange={() =>
                              handleMultipleChange(item, option.value)
                            }
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
                          {option.label}
                        </label>
                      );
                    })}
                  </div>
                )}
              </fieldset>
            ))}
          </section>
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="shrink-0 px-4 pb-6 pt-3">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link to="/" hash="cek-risiko">
            <Button className="border-primary-foreground/40 bg-white text-primary hover:bg-white/90">
              <ChevronLeft className="size-4" />
              Kembali
            </Button>
          </Link>

          <Button
            variant="outline"
            className="bg-primary text-primary-foreground shadow-md hover:bg-white/90">
            Lihat Hasil
            <Eye className="size-4" />
          </Button>
        </div>
      </div>
    </main>
  );
}
