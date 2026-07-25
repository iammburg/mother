import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { SELF_CHECK_RESULT_STORAGE_KEY } from "../../constants/selfCheck";

export const Route = createFileRoute("/pemeriksaan-mandiri/")({
  component: PemeriksaanMandiriPage,
});

const bloodTypes = ["A", "B", "AB", "O"];

type SelfCheckInfoPopupContent = {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
};

const lilaInfoPopup: SelfCheckInfoPopupContent = {
  id: "lila-info",
  title: "Cara Mengukur Lingkar Lengan Atas",
  imageSrc: "/assets/images/pengukuran_lingkar_lengan_atas.avif",
  imageAlt: "Ilustrasi mengukur lingkar lengan atas dengan pita ukur",
  description:
    "Cara mengukur lingkar lengan atas yaitu dengan melingkarkan pita ukur pada lengan atas.",
};

const fundalHeightInfoPopup: SelfCheckInfoPopupContent = {
  id: "fundal-height-info",
  title: "Cara Mengukur Tinggi Rahim",
  imageSrc: "/assets/images/pengukuran_tinggi_rahim.avif",
  imageAlt: "Ilustrasi mengukur tinggi rahim dengan pita ukur",
  description:
    "Cara mengukur tinggi rahim yaitu dengan cara mengukur dari tulang kemaluan sampai ke bagian atas rahim.",
};

function PemeriksaanMandiriPage() {
  const navigate = useNavigate();
  const [activeInfoPopup, setActiveInfoPopup] =
    useState<SelfCheckInfoPopupContent | null>(null);
  const [hphtDate, setHphtDate] = useState("");
  const pregnancyAgeText = useMemo(
    () => calculatePregnancyAgeText(hphtDate),
    [hphtDate],
  );

  useEffect(() => {
    document.documentElement.classList.add("self-check-scroll-lock");
    document.body.classList.add("self-check-scroll-lock");

    return () => {
      document.documentElement.classList.remove("self-check-scroll-lock");
      document.body.classList.remove("self-check-scroll-lock");
    };
  }, []);

  useEffect(() => {
    if (!activeInfoPopup) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveInfoPopup(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeInfoPopup]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    window.sessionStorage.setItem(
      SELF_CHECK_RESULT_STORAGE_KEY,
      JSON.stringify(formValues),
    );

    void navigate({ to: "/pemeriksaan-mandiri/hasil" });
  };

  return (
    <main className="self-check-page">
      <section
        className="self-check-section"
        aria-labelledby="self-check-title"
      >
        <h1 id="self-check-title" className="self-check-title">
          Pemeriksaan Mandiri
        </h1>

        <form
          id="self-check-form"
          className="self-check-panel"
          onSubmit={handleSubmit}
        >
          <div className="self-check-scroll-content">
            <section
              className="self-check-form-section self-check-form-section-identity"
              aria-labelledby="identity-form-title"
            >
              <div className="self-check-copy">
                <h2 id="identity-form-title">Formulir Pemeriksaan Identitas</h2>

                <div className="self-check-fields">
                  <FormField
                    label="Nama"
                    htmlFor="nama"
                    className="self-check-field-name"
                  >
                    <input
                      id="nama"
                      name="nama"
                      type="text"
                      autoComplete="name"
                    />
                  </FormField>

                <FormField
                  label="No Telp / HP"
                  htmlFor="nomor-hp"
                  className="self-check-field-phone"
                >
                    <input
                      id="nomor-hp"
                      name="nomorHp"
                      type="number"
                      inputMode="numeric"
                      autoComplete="tel"
                    />
                  </FormField>

                  <div className="self-check-two-column-row self-check-identity-short-row">
                  <FormField
                    label="Tanggal Lahir"
                    htmlFor="tanggal-lahir"
                    className="self-check-field-birth-date"
                  >
                      <input
                        id="tanggal-lahir"
                        name="tanggalLahir"
                        type="date"
                      />
                    </FormField>

                  <FormField
                    label="Kehamilan ke-"
                    htmlFor="kehamilan-ke"
                    className="self-check-field-pregnancy-order"
                  >
                      <input
                        id="kehamilan-ke"
                        name="kehamilanKe"
                        type="number"
                        min="1"
                        inputMode="numeric"
                      />
                    </FormField>
                  </div>

                  <div className="self-check-two-column-row self-check-identity-short-row">
                  <FormField
                    label="Usia Anak Terakhir"
                    htmlFor="usia-anak-terakhir"
                    className="self-check-field-last-child-age"
                  >
                      <InputWithUnit unit="Tahun">
                        <input
                          id="usia-anak-terakhir"
                          name="usiaAnakTerakhir"
                          type="number"
                          min="0"
                          inputMode="numeric"
                        />
                      </InputWithUnit>
                    </FormField>

                  <FormField
                    label="Golongan Darah"
                    htmlFor="golongan-darah"
                    className="self-check-field-blood-type"
                  >
                      <select id="golongan-darah" name="golonganDarah">
                        <option value="">Pilih</option>
                        {bloodTypes.map((bloodType) => (
                          <option key={bloodType} value={bloodType}>
                            {bloodType}
                          </option>
                        ))}
                      </select>
                    </FormField>
                  </div>

                <FormField
                  label="Pendidikan Terakhir"
                  htmlFor="pendidikan"
                  className="self-check-field-education"
                >
                    <select id="pendidikan" name="pendidikan">
                      <option value="">Pilih pendidikan</option>
                      <option value="tidak-sekolah">Tidak Sekolah</option>
                      <option value="sd">SD</option>
                      <option value="smp">SMP</option>
                      <option value="sma-smk">SMA/SMK</option>
                      <option value="diploma">Diploma</option>
                      <option value="sarjana">Sarjana</option>
                      <option value="pascasarjana">Pascasarjana</option>
                    </select>
                  </FormField>

                <FormField
                  label="Alamat"
                  htmlFor="alamat"
                  className="self-check-field-address"
                >
                    <input id="alamat" name="alamat" type="text" />
                  </FormField>

                <FormField
                  label="Puskesmas"
                  htmlFor="puskesmas"
                  className="self-check-field-puskesmas"
                >
                    <input id="puskesmas" name="puskesmas" type="text" />
                  </FormField>
                </div>
              </div>

              <img
                src="/assets/images/pemeriksaan_identitas_section.avif"
                alt=""
                className="self-check-section-image self-check-identity-image"
              />
            </section>

            <section
              className="self-check-form-section self-check-form-section-mandiri"
              aria-labelledby="mandiri-form-title"
            >
              <div className="self-check-copy">
                <h2 id="mandiri-form-title">Formulir Pemeriksaan Mandiri</h2>

                <div className="self-check-fields">
                  <FormField
                    label={
                      <>
                        Tanggal HPHT
                        <small>(Hari Pertama Haid Terakhir)</small>
                      </>
                    }
                    htmlFor="tanggal-hpht"
                    className="self-check-field-hpht"
                  >
                    <input
                      id="tanggal-hpht"
                      name="tanggalHpht"
                      type="date"
                      value={hphtDate}
                      onChange={(event) => setHphtDate(event.target.value)}
                    />
                    {pregnancyAgeText ? (
                      <div
                        className="self-check-pregnancy-age-card"
                        aria-live="polite"
                      >
                        <img src="/assets/images/HPHT_persalinan.avif" alt="" />
                        <p>
                          <span>Usia kehamilan anda saat ini</span>
                          <strong>{pregnancyAgeText}</strong>
                        </p>
                      </div>
                    ) : null}
                  </FormField>

                  <FormField
                    label="Tinggi Badan (cm)"
                    htmlFor="tinggi-badan"
                    className="self-check-field-height"
                  >
                    <input
                      id="tinggi-badan"
                      name="tinggiBadan"
                      type="number"
                      min="0"
                      inputMode="decimal"
                    />
                  </FormField>

                  <div className="self-check-two-column-row">
                    <FormField
                      label={
                        <>
                          BB sebelum hamil
                          <span>atau saat HPHT (Kg)</span>
                        </>
                      }
                      htmlFor="bb-sebelum-hamil"
                      className="self-check-field-weight-before"
                    >
                      <InputWithUnit unit="Kg">
                        <input
                          id="bb-sebelum-hamil"
                          name="bbSebelumHamil"
                          type="number"
                          min="0"
                          inputMode="decimal"
                        />
                      </InputWithUnit>
                    </FormField>

                    <FormField
                      label="BB setelah hamil (Kg)"
                      htmlFor="bb-setelah-hamil"
                      className="self-check-field-weight-after"
                    >
                      <InputWithUnit unit="Kg">
                        <input
                          id="bb-setelah-hamil"
                          name="bbSetelahHamil"
                          type="number"
                          min="0"
                          inputMode="decimal"
                        />
                      </InputWithUnit>
                    </FormField>
                  </div>

                  <div className="self-check-two-column-row self-check-pressure-row">
                    <FormField
                      label="Tekanan Darah"
                      htmlFor="tekanan-sistolik"
                      className="self-check-field-blood-pressure"
                    >
                      <input
                        id="tekanan-sistolik"
                        name="tekananSistolik"
                        type="number"
                        min="0"
                        inputMode="numeric"
                      />
                    </FormField>

                    <div className="self-check-pressure-field">
                      <label htmlFor="tekanan-diastolik">/ (mmHg)</label>
                      <input
                        id="tekanan-diastolik"
                        name="tekananDiastolik"
                        type="number"
                        min="0"
                        inputMode="numeric"
                      />
                    </div>
                  </div>

                  <div className="self-check-two-column-row self-check-help-row">
                    <FormField
                      label={
                        <>
                          Ukuran LiLA
                          <small>(Lingkar Lengan Atas) (cm)</small>
                        </>
                      }
                      htmlFor="ukuran-lila"
                      hint="Klik disini untuk mengetahui cara mengukur lingkar lengan atas"
                      onHintClick={() => setActiveInfoPopup(lilaInfoPopup)}
                      className="self-check-field-lila"
                    >
                      <InputWithUnit unit="cm">
                        <input
                          id="ukuran-lila"
                          name="ukuranLila"
                          type="number"
                          min="0"
                          inputMode="decimal"
                        />
                      </InputWithUnit>
                    </FormField>

                    <FormField
                      label="Tinggi Rahim (cm)"
                      htmlFor="tinggi-rahim"
                      hint="Klik disini untuk mengetahui cara mengukur tinggi rahim"
                      onHintClick={() =>
                        setActiveInfoPopup(fundalHeightInfoPopup)
                      }
                      className="self-check-field-fundal-height"
                    >
                      <InputWithUnit unit="cm">
                        <input
                          id="tinggi-rahim"
                          name="tinggiRahim"
                          type="number"
                          min="0"
                          inputMode="decimal"
                        />
                      </InputWithUnit>
                    </FormField>
                  </div>

                  <div className="self-check-two-column-row">
                    <FormField
                      label={
                        <>
                          Berapa kali gerak
                          <span>janin dalam sehari ?</span>
                        </>
                      }
                      htmlFor="gerak-janin"
                      className="self-check-field-fetal-movement"
                    >
                      <input
                        id="gerak-janin"
                        name="gerakJanin"
                        type="number"
                        min="0"
                        inputMode="numeric"
                      />
                    </FormField>

                    <FormField
                      label={
                        <>
                          Intensitas kontraksi
                          <span>atau kenceng kenceng</span>
                        </>
                      }
                      htmlFor="intensitas-kontraksi"
                      className="self-check-field-contraction"
                    >
                      <select
                        id="intensitas-kontraksi"
                        name="intensitasKontraksi"
                      >
                        <option value="">Pilih</option>
                        <option value="tidak-pernah">Tidak pernah</option>
                        <option value="jarang">Jarang</option>
                        <option value="sering">Sering</option>
                        <option value="sangat-sering">Sangat sering</option>
                      </select>
                    </FormField>
                  </div>
                </div>
              </div>

              <img
                src="/assets/images/pemeriksaan_mandiri_section.avif"
                alt=""
                className="self-check-section-image self-check-mandiri-image"
              />
            </section>

            <section
              className="self-check-form-section self-check-form-section-additional"
              aria-labelledby="additional-form-title"
            >
              <div className="self-check-copy">
                <h2 id="additional-form-title">
                  Formulir Pemeriksaan Tambahan
                </h2>

                <div className="self-check-additional-layout">
                  <div className="self-check-additional-fields">
                    <FormField
                      label={
                        <>
                          Hemoglobin
                          <span>(Hb Darah) (gr%)</span>
                        </>
                      }
                      htmlFor="hemoglobin"
                      className="self-check-field-hemoglobin"
                    >
                      <InputWithUnit unit="gr%">
                        <input
                          id="hemoglobin"
                          name="hemoglobin"
                          type="number"
                          min="0"
                          step="0.1"
                          inputMode="decimal"
                        />
                      </InputWithUnit>
                    </FormField>

                    <FormField
                      label="Tablet Darah"
                      htmlFor="tablet-darah"
                      className="self-check-field-blood-tablet"
                    >
                      <select id="tablet-darah" name="tabletDarah">
                        <option value="">Pilih</option>
                        <option value="setiap-hari">Setiap hari</option>
                        <option value="1x-seminggu">1x seminggu</option>
                        <option value="2x-seminggu">2x seminggu</option>
                        <option value="3x-seminggu">3x seminggu</option>
                        <option value="4x-seminggu">4x seminggu</option>
                        <option value="5x-seminggu">5x seminggu</option>
                        <option value="1x-sebulan">1x sebulan</option>
                        <option value="2x-sebulan">2x sebulan</option>
                        <option value="3x-sebulan">3x sebulan</option>
                        <option value="tidak-pernah">Tidak pernah</option>
                      </select>
                    </FormField>

                    <RadioField
                      legend="Imunisasi TT 1 (Tetanus 1)"
                      name="imunisasiTt1"
                    />

                    <RadioField
                      legend="Imunisasi TT 2 (Tetanus 2)"
                      name="imunisasiTt2"
                    />
                  </div>

                  <img
                    src="/assets/images/pemeriksaan_tambahan.avif"
                    alt=""
                    className="self-check-additional-image"
                  />
                </div>
              </div>
            </section>

            <section
              className="self-check-lab-section"
              aria-labelledby="lab-form-title"
            >
              <h2 id="lab-form-title">
                Hasil Laboratorium <span>(Opsional)</span>
              </h2>

              <div className="self-check-lab-grid">
                <FormField
                  label="Urine"
                  htmlFor="urine"
                  compact
                  className="self-check-field-urine"
                >
                  <input id="urine" name="urine" type="text" />
                </FormField>

                <FormField
                  label="Feses"
                  htmlFor="feses"
                  compact
                  className="self-check-field-feces"
                >
                  <input id="feses" name="feses" type="text" />
                </FormField>

                <FormField
                  label="Swab Vagina"
                  htmlFor="swab-vagina"
                  compact
                  className="self-check-field-vaginal-swab"
                >
                  <input id="swab-vagina" name="swabVagina" type="text" />
                </FormField>
              </div>
            </section>
          </div>
        </form>

        {activeInfoPopup ? (
          <SelfCheckInfoPopup
            content={activeInfoPopup}
            onClose={() => setActiveInfoPopup(null)}
          />
        ) : null}

        <div className="self-check-actions">
          <Link to="/" hash="cek-risiko" className="self-check-button back">
            <img src="/assets/images/button/back.png" alt="" />
            <span>Kembali</span>
          </Link>

          <button
            type="submit"
            form="self-check-form"
            className="self-check-button result"
          >
            <img src="/assets/images/button/eye.png" alt="" />
            <span>Lihat Hasil</span>
          </button>
        </div>
      </section>
    </main>
  );
}

function FormField({
  label,
  htmlFor,
  children,
  hint,
  onHintClick,
  compact = false,
  className,
}: {
  label: React.ReactNode;
  htmlFor: string;
  children: React.ReactNode;
  hint?: string;
  onHintClick?: () => void;
  compact?: boolean;
  className?: string;
}) {
  const hintContent = hint ? (
    <>
      <span aria-hidden="true">i</span>
      {hint}
    </>
  ) : null;

  return (
    <div
      className={[
        "self-check-field",
        compact ? "compact" : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <label htmlFor={htmlFor}>{label}</label>
      <div>
        {children}
        {hintContent ? (
          onHintClick ? (
            <button
              type="button"
              className="self-check-hint"
              onClick={onHintClick}
            >
              {hintContent}
            </button>
          ) : (
            <p className="self-check-hint">{hintContent}</p>
          )
        ) : null}
      </div>
    </div>
  );
}

function SelfCheckInfoPopup({
  content,
  onClose,
}: {
  content: SelfCheckInfoPopupContent;
  onClose: () => void;
}) {
  return (
    <div
      className="self-check-info-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <article
        className="self-check-info-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${content.id}-title`}
      >
        <h2 id={`${content.id}-title`}>{content.title}</h2>
        <img src={content.imageSrc} alt={content.imageAlt} />
        <p>{content.description}</p>
      </article>
    </div>
  );
}

function InputWithUnit({
  unit,
  children,
}: {
  unit: string;
  children: React.ReactNode;
}) {
  return (
    <span className="self-check-input-unit">
      {children}
      <span aria-hidden="true">{unit}</span>
    </span>
  );
}

function RadioField({ legend, name }: { legend: string; name: string }) {
  return (
    <fieldset className="self-check-radio-field">
      <legend>{legend}</legend>
      <label>
        <input type="radio" name={name} value="belum-pernah" />
        <span aria-hidden="true" />
        Belum Pernah
      </label>
      <label>
        <input type="radio" name={name} value="sudah-pernah" />
        <span aria-hidden="true" />
        Sudah Pernah
      </label>
    </fieldset>
  );
}

function calculatePregnancyAgeText(value: string) {
  const hpht = parseDateInput(value);

  if (!hpht) {
    return "";
  }

  const today = stripTime(new Date());
  const hphtDate = stripTime(hpht);
  const dayDifference = Math.floor(
    (today.getTime() - hphtDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (dayDifference < 0) {
    return "tanggal HPHT belum valid";
  }

  const weeks = Math.floor(dayDifference / 7);
  const days = dayDifference % 7;

  if (days === 0) {
    return `${weeks} minggu`;
  }

  return `${weeks} minggu ${days} hari`;
}

function parseDateInput(value: string) {
  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
}

function stripTime(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
