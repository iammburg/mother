import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/informasi-kehamilan/pengelolaan/$pengelolaanId"
)({
  component: DetailPengelolaanKehamilanPage,
});

const pengelolaanData: Record<
  string,
  {
    title: string;
    image: string;
    list: string[];
  }
> = {
  "8": {
    title: "KEBERSIHAN DIRI",
    image: "/assets/images/pengelolaan_kehamilan/pengelolaan_kehamilan_kebersihan-diri.avif",
    list: [
      "SIKAT GIGI 2 X / HARI, SETELAH MAKAN DAN SEBELUM TIDUR",
      "CUCI TANGAN SETELAH BAB, BAK, SEPULANG BEPERGIAN, SEBELUM MAKAN, SEBELUM MENYIAPKAN MAKANAN",
      "MANDI 2X/HARI",
      "GANTI PAKAIAN SETELAH BEPERGIAN ATAU BASAH SETELAH AKTIFITAS",
      "GANTI CELANA DALAM SETIAP LEMBAB/ MENGGUNAKAN PEMBALUT TIPS BILA KEPUTIHAN",
      "HUBUNGAN SEKSUAL DAPAT DILAKUKAN SELAMA HAMIL, KECUALI ADA RIWAYAT KEGUGURAN",
      "AKTIFITAS RINGAN : SENAM HAMIL SETELAH KEHAMILAN 24 MINGGU, JALAN KAKI MIN 30 MENIT 3 KALI TIAP MINGGU, LATIHAN BERNAPAS MENJELANG PERSALINAN",
    ],
  },
};

function DetailPengelolaanKehamilanPage() {
  const { pengelolaanId } = Route.useParams();
  const data = pengelolaanData[pengelolaanId as string];

  if (!data) {
    return (
      <div className="min-h-screen bg-white text-[#2d2a2a] p-4 md:p-8 flex items-center justify-center font-sans">
        <h1 className="text-[#f486bb] text-2xl font-bold">Data tidak ditemukan</h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white text-[#2d2a2a] p-4 md:p-8 flex flex-col items-center font-sans">
      <div className="w-full max-w-5xl pt-8 md:pt-4 flex flex-col">
        <h1 className="text-[#f486bb] text-2xl md:text-3xl font-black mb-8 self-start">
          Pengelolaan Kehamilan
        </h1>

        <div className="flex flex-col md:flex-row gap-8 w-full items-start">
          {/* Left: Image */}
          <div className="w-full md:w-1/3 flex-shrink-0 bg-[#fef5f9] rounded-[2rem] overflow-hidden">
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Right: Content */}
          <div className="flex flex-col flex-1 gap-6 w-full">
            <div className="inline-block bg-[#f486bb] text-white rounded-xl px-6 py-3 self-start shadow-md">
              <h2 className="text-xl md:text-2xl font-bold">{data.title}</h2>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <ul className="list-disc text-[#f486bb] text-base opacity-90 pl-6 space-y-4 font-semibold">
                {data.list.map((item, index) => (
                  <li key={index} className="pl-2 leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 self-start">
          <Link
            to="/informasi-kehamilan/pengelolaan"
            className="inline-flex items-center justify-center bg-[#f486bb] text-white px-6 py-3 rounded-2xl font-bold text-lg shadow-md hover:bg-[#e075a8] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Kembali
          </Link>
        </div>
      </div>
    </main>
  );
}
