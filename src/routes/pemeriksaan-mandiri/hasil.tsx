import { createFileRoute, Link } from "@tanstack/react-router";
import { Download } from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { SELF_CHECK_RESULT_STORAGE_KEY } from "../../constants/selfCheck";

export const Route = createFileRoute("/pemeriksaan-mandiri/hasil")({
  component: SelfCheckResultPage,
});

type SelfCheckResultFormData = {
  nama?: string;
  nomorHp?: string;
  tanggalLahir?: string;
  kehamilanKe?: string;
  usiaAnakTerakhir?: string;
  pendidikan?: string;
  golonganDarah?: string;
  alamat?: string;
  puskesmas?: string;
  tanggalHpht?: string;
  tinggiBadan?: string;
  bbSebelumHamil?: string;
  bbSetelahHamil?: string;
  tekananSistolik?: string;
  tekananDiastolik?: string;
  ukuranLila?: string;
  tinggiRahim?: string;
  gerakJanin?: string;
  intensitasKontraksi?: string;
  hemoglobin?: string;
  tabletDarah?: string;
  imunisasiTt1?: string;
  imunisasiTt2?: string;
  urine?: string;
  feses?: string;
  swabVagina?: string;
};

type ResultSummary = {
  title: string;
  description: string;
};

type ResultDisplay = {
  dueDate: string;
  gestationalAge: string;
  identitySummary: ResultSummary;
  heightSummary: ResultSummary;
  weightSummary: ResultSummary;
  bloodPressureSummary: ResultSummary;
  lilaSummary: ResultSummary;
  fundalHeightSummary: ResultSummary;
  fetalMovementSummary: ResultSummary;
  contractionSummary: ResultSummary;
  hemoglobinSummary: ResultSummary;
};

const emptyResultData: SelfCheckResultFormData = {};

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

const contractionLabels: Record<string, string> = {
  "tidak-pernah": "Tidak pernah",
  jarang: "Jarang",
  sering: "Sering",
  "sangat-sering": "Sangat sering",
};

const bloodTabletLabels: Record<string, string> = {
  "setiap-hari": "Setiap hari",
  "1x-seminggu": "1x seminggu",
  "2x-seminggu": "2x seminggu",
  "3x-seminggu": "3x seminggu",
  "4x-seminggu": "4x seminggu",
  "5x-seminggu": "5x seminggu",
  "1x-sebulan": "1x sebulan",
  "2x-sebulan": "2x sebulan",
  "3x-sebulan": "3x sebulan",
  "tidak-pernah": "Tidak pernah",
};

const immunizationLabels: Record<string, string> = {
  "belum-pernah": "Belum Pernah",
  "sudah-pernah": "Sudah Pernah",
};

function SelfCheckResultPage() {
  const [formData, setFormData] =
    useState<SelfCheckResultFormData>(emptyResultData);

  useEffect(() => {
    document.documentElement.classList.add("self-check-scroll-lock");
    document.body.classList.add("self-check-scroll-lock");

    return () => {
      document.documentElement.classList.remove("self-check-scroll-lock");
      document.body.classList.remove("self-check-scroll-lock");
    };
  }, []);

  useEffect(() => {
    const stored = window.sessionStorage.getItem(
      SELF_CHECK_RESULT_STORAGE_KEY,
    );

    if (!stored) {
      return;
    }

    try {
      setFormData(JSON.parse(stored) as SelfCheckResultFormData);
    } catch {
      setFormData(emptyResultData);
    }
  }, []);

  const result = useMemo(() => buildResultDisplay(formData), [formData]);

  return (
    <main className="self-check-result-page">
      <section className="self-check-result-shell">
        <h1>Hasil Pemeriksaan Mandiri</h1>

        <article className="self-check-result-panel">
          <ResultSection title="Identitas">
            <div className="self-check-result-identity-grid">
              <div className="self-check-result-data-grid">
                <ResultDatum label="Nama" value={valueOrDash(formData.nama)} />
                <ResultDatum
                  label="No Telp / HP"
                  value={valueOrDash(formData.nomorHp)}
                />
                <ResultDatum
                  label="Tanggal Lahir"
                  value={formatInputDate(formData.tanggalLahir)}
                />
                <ResultDatum
                  label="Usia Anak Terakhir"
                  value={withUnit(formData.usiaAnakTerakhir, "Tahun")}
                />
                <ResultDatum
                  label="Kehamilan ke-"
                  value={valueOrDash(formData.kehamilanKe)}
                />
                <ResultDatum
                  label="Golongan Darah"
                  value={valueOrDash(formData.golonganDarah)}
                />
              </div>

              <img
                src="/assets/images/pemeriksaan_identitas_section.avif"
                alt=""
                className="self-check-result-identity-image"
              />
            </div>

            <ConclusionBox summary={result.identitySummary} />
          </ResultSection>

          <ResultSection title="Hasil Pemeriksaan Mandiri">
            <div className="self-check-result-two-feature">
              <ResultMetric
                image="/assets/images/HPHT_persalinan.avif"
                imageAlt=""
                items={[
                  {
                    label: "Tanggal HPHT anda",
                    value: formatInputDate(formData.tanggalHpht),
                  },
                  {
                    label: "Usia kehamilan anda",
                    value: result.gestationalAge,
                  },
                  {
                    label: "Taksiran tanggal persalinan",
                    value: result.dueDate,
                  },
                ]}
              />

              <ResultMetric
                image="/assets/images/tinggi_badan.avif"
                imageAlt=""
                items={[
                  {
                    label: "Tinggi badan anda",
                    value: withUnit(formData.tinggiBadan, "cm"),
                  },
                ]}
              />
            </div>

            <ConclusionBox summary={result.heightSummary} />

            <ResultMetric
              image="/assets/images/berat_badan.avif"
              imageAlt=""
              items={[
                {
                  label: "Berat badan anda sebelum hamil",
                  value: withUnit(formData.bbSebelumHamil, "Kg"),
                },
                {
                  label: "Berat badan anda sesudah hamil",
                  value: withUnit(formData.bbSetelahHamil, "Kg"),
                },
              ]}
            />

            <ConclusionBox summary={result.weightSummary} />

            <ResultMetric
              image="/assets/images/tekanan_darah.png"
              imageAlt=""
              items={[
                {
                  label: "Tekanan Darah anda",
                  value: formatBloodPressure(formData),
                },
              ]}
            />

            <ConclusionBox summary={result.bloodPressureSummary} />

            <ResultMetric
              image="/assets/images/lingkar_lengan_atas.avif"
              imageAlt=""
              items={[
                {
                  label: "Lingkar lengan atas anda",
                  value: withUnit(formData.ukuranLila, "cm"),
                },
              ]}
            />

            <ConclusionBox summary={result.lilaSummary} />

            <ResultMetric
              image="/assets/images/tinggi_rahim.avif"
              imageAlt=""
              items={[
                {
                  label: "Tinggi Rahim anda",
                  value: withUnit(formData.tinggiRahim, "cm"),
                },
              ]}
            />

            <ConclusionBox summary={result.fundalHeightSummary} />

            <ResultMetric
              image="/assets/images/gerak_janin.avif"
              imageAlt=""
              items={[
                {
                  label: "Gerak Janin anda",
                  value: withUnit(formData.gerakJanin, "kali sehari"),
                },
              ]}
            />

            <ConclusionBox summary={result.fetalMovementSummary} />

            <ResultMetric
              image="/assets/images/intensitas_kontraksi.png"
              imageAlt=""
              items={[
                {
                  label: "Intensitas Kontraksi anda",
                  value: valueOrDash(
                    contractionLabels[formData.intensitasKontraksi ?? ""],
                  ),
                },
              ]}
            />

            <ConclusionBox summary={result.contractionSummary} />
          </ResultSection>

          <ResultSection title="Hasil Pemeriksaan Tambahan">
            <ResultMetric
              image="/assets/images/hemoglobin.webp"
              imageAlt=""
              items={[
                {
                  label: "Kadar hemoglobin (Hb darah) anda",
                  value: withUnit(formData.hemoglobin, "gr%"),
                },
                {
                  label: "Tablet Darah",
                  value: valueOrDash(
                    bloodTabletLabels[formData.tabletDarah ?? ""],
                  ),
                },
              ]}
            />

            <ConclusionBox summary={result.hemoglobinSummary} />

            <div className="self-check-result-immunization">
              <ResultDatum
                label="Imunisasi TT 1 (Tetanus 1)"
                value={valueOrDash(
                  immunizationLabels[formData.imunisasiTt1 ?? ""],
                )}
              />
              <ResultDatum
                label="Imunisasi TT 2 (Tetanus 2)"
                value={valueOrDash(
                  immunizationLabels[formData.imunisasiTt2 ?? ""],
                )}
              />
            </div>
          </ResultSection>

          <ResultSection title="Hasil Laboratorium">
            <div className="self-check-result-lab-grid">
              <ResultDatum label="Urine" value={valueOrDash(formData.urine)} />
              <ResultDatum label="Feses" value={valueOrDash(formData.feses)} />
              <ResultDatum
                label="Swab Vagina"
                value={valueOrDash(formData.swabVagina)}
              />
            </div>
          </ResultSection>
        </article>

        <div className="self-check-result-actions">
          <Link to="/pemeriksaan-mandiri" className="self-check-button back">
            <img src="/assets/images/button/back.png" alt="" />
            <span>Kembali</span>
          </Link>

          <button
            type="button"
            className="self-check-result-download"
            onClick={() => void downloadSelfCheckResultPdf(formData, result)}
          >
            <Download aria-hidden="true" />
            <span>Download</span>
          </button>
        </div>
      </section>
    </main>
  );
}

function ResultSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="self-check-result-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function ResultDatum({ label, value }: { label: string; value: string }) {
  return (
    <div className="self-check-result-datum">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ResultMetric({
  image,
  imageAlt,
  items,
}: {
  image: string;
  imageAlt: string;
  items: Array<{ label: string; value: string }>;
}) {
  return (
    <div className="self-check-result-metric">
      <img src={image} alt={imageAlt} />
      <div>
        {items.map((item) => (
          <ResultDatum
            key={`${item.label}-${item.value}`}
            label={item.label}
            value={item.value}
          />
        ))}
      </div>
    </div>
  );
}

function ConclusionBox({ summary }: { summary: ResultSummary }) {
  return (
    <div className="self-check-result-conclusion">
      <span>Kesimpulan</span>
      <strong>{summary.title}</strong>
      <p>{summary.description}</p>
    </div>
  );
}

function buildResultDisplay(data: SelfCheckResultFormData): ResultDisplay {
  const ageValue = calculateAge(data.tanggalLahir);
  const pregnancyOrder = toNumber(data.kehamilanKe);
  const lastChildAge = toNumber(data.usiaAnakTerakhir);
  const hphtDate = parseDateInput(data.tanggalHpht);
  const height = toNumber(data.tinggiBadan);
  const beforeWeight = toNumber(data.bbSebelumHamil);
  const afterWeight = toNumber(data.bbSetelahHamil);
  const systolic = toNumber(data.tekananSistolik);
  const diastolic = toNumber(data.tekananDiastolik);
  const lila = toNumber(data.ukuranLila);
  const fundalHeight = toNumber(data.tinggiRahim);
  const fetalMovement = toNumber(data.gerakJanin);
  const hemoglobin = toNumber(data.hemoglobin);

  const identityRisk =
    (ageValue !== null && (ageValue < 20 || ageValue > 30)) ||
    (pregnancyOrder !== null && pregnancyOrder > 2) ||
    (lastChildAge !== null && lastChildAge < 2);

  const dueDate = hphtDate ? addDays(hphtDate, 280) : null;
  const gestationalAgeWeeks = hphtDate
    ? Math.max(0, Math.floor(daysBetween(hphtDate, new Date()) / 7))
    : null;
  const weightGain =
    beforeWeight !== null && afterWeight !== null
      ? afterWeight - beforeWeight
      : null;
  const estimatedFetalWeight =
    fundalHeight !== null ? Math.max(0, Math.round((fundalHeight - 12) * 155)) : null;

  return {
    dueDate: dueDate ? formatDate(dueDate) : "-",
    gestationalAge:
      gestationalAgeWeeks !== null ? `${gestationalAgeWeeks} minggu` : "-",
    identitySummary: {
      title: identityRisk
        ? "Kehamilan anda berisiko"
        : "Kehamilan anda tidak berisiko",
      description:
        "Kriteria resiko kehamilan yaitu umur dibawah 20 tahun atau diatas 30 tahun, kehamilan lebih dari ke-2 dan anak terakhir berusia kurang dari 2 tahun.",
    },
    heightSummary: buildHeightSummary(height),
    weightSummary: buildWeightSummary(weightGain),
    bloodPressureSummary: buildBloodPressureSummary(systolic, diastolic),
    lilaSummary: buildLilaSummary(lila),
    fundalHeightSummary: {
      title:
        estimatedFetalWeight !== null
          ? `Taksiran berat janin anda ${estimatedFetalWeight} gram`
          : "Taksiran berat janin belum tersedia",
      description:
        "Taksiran berat janin dihitung dari rumus tinggi rahim dikurangi 12 lalu dikalikan 155 gram.",
    },
    fetalMovementSummary: buildFetalMovementSummary(fetalMovement),
    contractionSummary: buildContractionSummary(data.intensitasKontraksi),
    hemoglobinSummary: buildHemoglobinSummary(hemoglobin),
  };
}

function buildHeightSummary(height: number | null): ResultSummary {
  if (height === null) {
    return {
      title: "Data tinggi badan belum tersedia",
      description:
        "Tinggi badan normal agar terhindar dari risiko panggul sempit yaitu diatas 150 cm.",
    };
  }

  return {
    title:
      height < 150
        ? "Anda berisiko panggul sempit"
        : "Anda tidak berisiko panggul sempit",
    description:
      "Tinggi badan normal agar terhindar dari risiko panggul sempit yaitu diatas 150 cm.",
  };
}

function buildWeightSummary(weightGain: number | null): ResultSummary {
  if (weightGain === null) {
    return {
      title: "Data berat badan belum lengkap",
      description:
        "Kriteria gizi yang cukup adalah jika penambahan berat badan setelah hamil antara 8 - 12 Kg.",
    };
  }

  if (weightGain < 8) {
    return {
      title: "Gizi anda kurang",
      description:
        "Kriteria gizi yang cukup adalah jika penambahan berat badan setelah hamil antara 8 - 12 Kg.",
    };
  }

  if (weightGain > 12) {
    return {
      title: "Gizi anda berlebih",
      description:
        "Kriteria gizi yang cukup adalah jika penambahan berat badan setelah hamil antara 8 - 12 Kg.",
    };
  }

  return {
    title: "Gizi anda cukup",
    description:
      "Kriteria gizi yang cukup adalah jika penambahan berat badan setelah hamil antara 8 - 12 Kg.",
  };
}

function buildBloodPressureSummary(
  systolic: number | null,
  diastolic: number | null,
): ResultSummary {
  if (systolic === null || diastolic === null) {
    return {
      title: "Data tekanan darah belum lengkap",
      description:
        "Tekanan darah normal adalah kisaran 90/60 hingga 120/80.",
    };
  }

  if (systolic < 90 || diastolic < 60) {
    return {
      title: "Tekanan Darah anda rendah",
      description:
        "Tekanan darah normal adalah kisaran 90/60 hingga 120/80.",
    };
  }

  if (systolic > 120 || diastolic > 80) {
    return {
      title: "Tekanan Darah anda tinggi",
      description:
        "Tekanan darah normal adalah kisaran 90/60 hingga 120/80.",
    };
  }

  return {
    title: "Tekanan Darah anda normal",
    description: "Tekanan darah normal adalah kisaran 90/60 hingga 120/80.",
  };
}

function buildLilaSummary(lila: number | null): ResultSummary {
  if (lila === null) {
    return {
      title: "Data lingkar lengan atas belum tersedia",
      description:
        "Kriteria gizi yang cukup adalah jika ukuran lingkar lengan atas lebih dari 23.5 cm.",
    };
  }

  return {
    title: lila < 23.5 ? "Gizi anda kurang" : "Gizi anda cukup",
    description:
      "Kriteria gizi yang cukup adalah jika ukuran lingkar lengan atas lebih dari 23.5 cm.",
  };
}

function buildFetalMovementSummary(movement: number | null): ResultSummary {
  if (movement === null) {
    return {
      title: "Data gerak janin belum tersedia",
      description:
        "Kriteria gerak janin normal adalah 8 sampai 33 kali sehari.",
    };
  }

  return {
    title: movement >= 8 && movement <= 33 ? "Janin Normal" : "Gawat janin",
    description:
      "Kriteria gerak janin normal adalah 8 sampai 33 kali sehari.",
  };
}

function buildContractionSummary(contraction?: string): ResultSummary {
  const isNormal = contraction === "tidak-pernah" || contraction === "jarang";

  if (!contraction) {
    return {
      title: "Data kontraksi belum tersedia",
      description:
        "Kriteria kontraksi atau kenceng-kenceng selama kehamilan normalnya adalah jarang atau tidak sering.",
    };
  }

  return {
    title: isNormal ? "Kontraksi anda normal" : "Kontraksi anda sering",
    description:
      "Kriteria kontraksi atau kenceng-kenceng selama kehamilan normalnya adalah jarang atau tidak sering.",
  };
}

function buildHemoglobinSummary(hemoglobin: number | null): ResultSummary {
  if (hemoglobin === null) {
    return {
      title: "Data hemoglobin belum tersedia",
      description:
        "Kriteria kadar hemoglobin dalam darah normalnya adalah 12 gr% atau lebih dan minum Tablet Penambah Darah bila mengalami Anemia.",
    };
  }

  if (hemoglobin >= 12) {
    return {
      title: "Normal",
      description:
        "Kriteria kadar hemoglobin dalam darah normalnya adalah 12 gr% atau lebih dan minum Tablet Penambah Darah bila mengalami Anemia.",
    };
  }

  if (hemoglobin >= 10) {
    return {
      title: "Anemia kehamilan",
      description:
        "Kriteria kadar hemoglobin dalam darah normalnya adalah 12 gr% atau lebih dan minum Tablet Penambah Darah bila mengalami Anemia.",
    };
  }

  return {
    title: "Anemia",
    description:
      "Kriteria kadar hemoglobin dalam darah normalnya adalah 12 gr% atau lebih dan minum Tablet Penambah Darah bila mengalami Anemia.",
  };
}

function calculateAge(value?: string) {
  const date = parseDateInput(value);

  if (!date) {
    return null;
  }

  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const monthDiff = today.getMonth() - date.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < date.getDate())
  ) {
    age -= 1;
  }

  return age;
}

function parseDateInput(value?: string) {
  if (!value) {
    return null;
  }

  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
}

function formatInputDate(value?: string) {
  const date = parseDateInput(value);

  return date ? formatDate(date) : "-";
}

function formatDate(date: Date) {
  return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

function daysBetween(start: Date, end: Date) {
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  return (stripTime(end).getTime() - stripTime(start).getTime()) / millisecondsPerDay;
}

function stripTime(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function toNumber(value?: string) {
  if (!value) {
    return null;
  }

  const normalized = Number(value.replace(",", "."));

  return Number.isFinite(normalized) ? normalized : null;
}

function valueOrDash(value?: string) {
  return value && value.trim() ? value : "-";
}

function withUnit(value: string | undefined, unit: string) {
  return value && value.trim() ? `${value} ${unit}` : "-";
}

function formatBloodPressure(data: SelfCheckResultFormData) {
  const systolic = valueOrDash(data.tekananSistolik);
  const diastolic = valueOrDash(data.tekananDiastolik);

  if (systolic === "-" && diastolic === "-") {
    return "-";
  }

  return `${systolic} / ${diastolic} mmHg`;
}

type PdfIconMap = Partial<
  Record<
    | "identity"
    | "hpht"
    | "height"
    | "weight"
    | "bloodPressure"
    | "lila"
    | "fundalHeight"
    | "fetalMovement"
    | "contraction"
    | "hemoglobin",
    HTMLImageElement
  >
>;

const pdfIconSources: Record<keyof PdfIconMap, string> = {
  identity: "/assets/images/pemeriksaan_identitas_section.avif",
  hpht: "/assets/images/HPHT_persalinan.avif",
  height: "/assets/images/tinggi_badan.avif",
  weight: "/assets/images/berat_badan.avif",
  bloodPressure: "/assets/images/tekanan_darah.png",
  lila: "/assets/images/lingkar_lengan_atas.avif",
  fundalHeight: "/assets/images/tinggi_rahim.avif",
  fetalMovement: "/assets/images/gerak_janin.avif",
  contraction: "/assets/images/intensitas_kontraksi.png",
  hemoglobin: "/assets/images/hemoglobin.webp",
};

async function loadPdfIcons() {
  const entries = await Promise.all(
    Object.entries(pdfIconSources).map(async ([key, source]) => {
      const image = await loadPdfIcon(source);
      return [key, image] as const;
    }),
  );

  return Object.fromEntries(
    entries.filter((entry): entry is readonly [string, HTMLImageElement] =>
      Boolean(entry[1]),
    ),
  ) as PdfIconMap;
}

function loadPdfIcon(source: string) {
  return new Promise<HTMLImageElement | undefined>((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(undefined);
    image.src = source;
  });
}

async function downloadSelfCheckResultPdf(
  data: SelfCheckResultFormData,
  result: ResultDisplay,
) {
  const canvas = document.createElement("canvas");
  canvas.width = 1240;
  canvas.height = 1754;

  const context = canvas.getContext("2d");

  if (!context) {
    return;
  }

  const icons = await loadPdfIcons();
  drawResultPdfCanvas(context, canvas.width, canvas.height, data, result, icons);

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
  anchor.download = `hasil-pemeriksaan-mandiri-${createPdfFileNamePart(
    data.nama,
  )}.pdf`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 0);
}

function drawResultPdfCanvas(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  data: SelfCheckResultFormData,
  result: ResultDisplay,
  icons: PdfIconMap,
) {
  const pink = "#ff85bd";
  const softPink = "#fff3f8";
  const blue = "#78a7df";
  const darkPink = "#ef5fa7";
  const margin = 70;
  const contentWidth = width - margin * 2;

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);

  drawRoundRect(context, margin, 48, contentWidth, 96, 24, pink, pink);
  drawText(context, "Hasil Pemeriksaan Mandiri", width / 2, 91, {
    color: "#ffffff",
    font: "900 34px Nunito, Arial, sans-serif",
    align: "center",
  });
  drawText(context, formatDate(new Date()), width - margin - 28, 116, {
    color: "#ffffff",
    font: "800 15px Nunito, Arial, sans-serif",
    align: "right",
  });

  drawPdfSectionTitle(context, "Identitas", margin, 184, contentWidth, pink);
  drawPdfImageContain(
    context,
    icons.identity,
    width - margin - 180,
    218,
    150,
    100,
  );
  drawInfoGrid(context, margin, 238, contentWidth - 220, [
    ["Nama", valueOrDash(data.nama)],
    ["No Telp / HP", valueOrDash(data.nomorHp)],
    ["Tanggal Lahir", formatInputDate(data.tanggalLahir)],
    ["Usia Anak Terakhir", withUnit(data.usiaAnakTerakhir, "Tahun")],
    ["Kehamilan ke-", valueOrDash(data.kehamilanKe)],
    ["Golongan Darah", valueOrDash(data.golonganDarah)],
  ]);
  drawConclusionPdfBox(
    context,
    margin + 110,
    388,
    contentWidth - 220,
    92,
    result.identitySummary,
    pink,
  );

  drawPdfSectionTitle(
    context,
    "Hasil Pemeriksaan Mandiri",
    margin,
    538,
    contentWidth,
    pink,
  );

  const metricTop = 592;
  const cardGap = 24;
  const cardWidth = (contentWidth - cardGap) / 2;
  const cardHeight = 142;

  const mandiriCards: Array<{
    title: string;
    icon: keyof PdfIconMap;
    lines: string[];
    summary: ResultSummary;
  }> = [
    {
      title: "HPHT dan Persalinan",
      icon: "hpht",
      lines: [
        `Tanggal HPHT: ${formatInputDate(data.tanggalHpht)}`,
        `Usia kehamilan: ${result.gestationalAge}`,
        `Taksiran persalinan: ${result.dueDate}`,
      ],
      summary: {
        title:
          result.dueDate !== "-"
            ? `Persalinan ${result.dueDate}`
            : "Data HPHT belum tersedia",
        description: "",
      },
    },
    {
      title: "Tinggi Badan",
      icon: "height",
      lines: [`Tinggi badan: ${withUnit(data.tinggiBadan, "cm")}`],
      summary: result.heightSummary,
    },
    {
      title: "Berat Badan",
      icon: "weight",
      lines: [
        `Sebelum hamil: ${withUnit(data.bbSebelumHamil, "Kg")}`,
        `Sesudah hamil: ${withUnit(data.bbSetelahHamil, "Kg")}`,
      ],
      summary: result.weightSummary,
    },
    {
      title: "Tekanan Darah",
      icon: "bloodPressure",
      lines: [`Tekanan darah: ${formatBloodPressure(data)}`],
      summary: result.bloodPressureSummary,
    },
    {
      title: "Ukuran LiLA",
      icon: "lila",
      lines: [`Lingkar lengan atas: ${withUnit(data.ukuranLila, "cm")}`],
      summary: result.lilaSummary,
    },
    {
      title: "Tinggi Rahim",
      icon: "fundalHeight",
      lines: [`Tinggi rahim: ${withUnit(data.tinggiRahim, "cm")}`],
      summary: result.fundalHeightSummary,
    },
    {
      title: "Gerak Janin",
      icon: "fetalMovement",
      lines: [`Gerak janin: ${withUnit(data.gerakJanin, "kali sehari")}`],
      summary: result.fetalMovementSummary,
    },
    {
      title: "Kontraksi",
      icon: "contraction",
      lines: [
        `Intensitas: ${valueOrDash(
          contractionLabels[data.intensitasKontraksi ?? ""],
        )}`,
      ],
      summary: result.contractionSummary,
    },
  ];

  mandiriCards.forEach((card, index) => {
    const column = index % 2;
    const row = Math.floor(index / 2);
    drawMetricPdfCard(
      context,
      margin + column * (cardWidth + cardGap),
      metricTop + row * (cardHeight + cardGap),
      cardWidth,
      cardHeight,
      card.title,
      icons[card.icon],
      card.lines,
      card.summary.title,
      { pink, softPink, blue, darkPink },
    );
  });

  const additionalTop = metricTop + 4 * (cardHeight + cardGap) + 40;
  drawPdfSectionTitle(
    context,
    "Hasil Pemeriksaan Tambahan",
    margin,
    additionalTop,
    contentWidth,
    pink,
  );
  drawMetricPdfCard(
    context,
    margin,
    additionalTop + 54,
    contentWidth,
    152,
    "Hemoglobin, Tablet Darah, dan Imunisasi",
    icons.hemoglobin,
    [
      `Hemoglobin: ${withUnit(data.hemoglobin, "gr%")}`,
      `Tablet Darah: ${valueOrDash(
        bloodTabletLabels[data.tabletDarah ?? ""],
      )}`,
      `Imunisasi TT 1: ${valueOrDash(
        immunizationLabels[data.imunisasiTt1 ?? ""],
      )}`,
      `Imunisasi TT 2: ${valueOrDash(
        immunizationLabels[data.imunisasiTt2 ?? ""],
      )}`,
    ],
    result.hemoglobinSummary.title,
    { pink, softPink, blue, darkPink },
  );

  const labTop = additionalTop + 248;
  drawPdfSectionTitle(context, "Hasil Laboratorium", margin, labTop, contentWidth, pink);
  drawInfoGrid(context, margin, labTop + 54, contentWidth, [
    ["Urine", valueOrDash(data.urine)],
    ["Feses", valueOrDash(data.feses)],
    ["Swab Vagina", valueOrDash(data.swabVagina)],
  ]);

  drawText(context, "Dokumen ini merupakan ringkasan hasil pemeriksaan mandiri.", width / 2, height - 48, {
    color: blue,
    font: "800 15px Nunito, Arial, sans-serif",
    align: "center",
  });
}

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

function drawMetricPdfCard(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  title: string,
  icon: HTMLImageElement | undefined,
  lines: string[],
  conclusion: string,
  colors: { pink: string; softPink: string; blue: string; darkPink: string },
) {
  drawRoundRect(context, x, y, width, height, 16, "#ffffff", colors.pink);
  drawPdfImageContain(context, icon, x + 18, y + 40, 64, height - 58);
  drawText(context, title, x + 94, y + 30, {
    color: colors.darkPink,
    font: "900 18px Nunito, Arial, sans-serif",
  });

  lines.slice(0, 4).forEach((line, index) => {
    drawWrappedText(context, line, x + 94, y + 58 + index * 21, width * 0.44, {
      color: colors.pink,
      font: "800 14px Nunito, Arial, sans-serif",
      lineHeight: 16,
      maxLines: 1,
    });
  });

  drawRoundRect(
    context,
    x + width * 0.58,
    y + 48,
    width * 0.37,
    height - 70,
    14,
    colors.softPink,
    colors.pink,
  );
  drawText(context, "Kesimpulan", x + width * 0.765, y + 72, {
    color: colors.blue,
    font: "800 12px Nunito, Arial, sans-serif",
    align: "center",
  });
  drawWrappedText(
    context,
    conclusion,
    x + width * 0.61,
    y + 95,
    width * 0.31,
    {
      color: colors.darkPink,
      font: "900 15px Nunito, Arial, sans-serif",
      lineHeight: 17,
      maxLines: 2,
      align: "center",
    },
  );
}

function drawConclusionPdfBox(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  summary: ResultSummary,
  color: string,
) {
  drawRoundRect(context, x, y, width, height, 16, "#fff8fb", color);
  drawText(context, "Kesimpulan", x + width / 2, y + 28, {
    color: "#78a7df",
    font: "800 13px Nunito, Arial, sans-serif",
    align: "center",
  });
  drawText(context, summary.title, x + width / 2, y + 58, {
    color,
    font: "900 18px Nunito, Arial, sans-serif",
    align: "center",
  });
}

function drawPdfImageContain(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement | undefined,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  if (!image) {
    return;
  }

  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  const drawX = x + (width - drawWidth) / 2;
  const drawY = y + (height - drawHeight) / 2;

  context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
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
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
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
    const lineX =
      options.align === "center" ? x + maxWidth / 2 : x;
    context.fillText(`${currentLine}${suffix}`, lineX, y + index * options.lineHeight);
  });
}

function createSinglePagePdf(imageBytes: Uint8Array, canvas: HTMLCanvasElement) {
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
