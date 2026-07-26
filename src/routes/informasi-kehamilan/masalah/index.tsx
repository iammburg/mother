import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/informasi-kehamilan/masalah/")({
  component: RouteComponent,
});

function RouteComponent() {
  const problems = [
    {
      id: 1,
      title: "Striae (warna putih atau kehitaman) dan gatal kulit payudara",
      image: "/assets/images/masalah_kehamilan/masalah_kehamilan_striae.avif",
    },
    {
      id: 2,
      title: "Peningkatan Keringat",
      image: "/assets/images/masalah_kehamilan/masalah_kehamilan_striae2.avif",
    },
    {
      id: 3,
      title: "Striae (warna putih atau kehitaman) dan gatal kulit Rahim",
      image: "/assets/images/masalah_kehamilan/masalah_kehamilan_striae3.avif",
    },
    {
      id: 4,
      title: "Gerak anak dan kontraksi selama kehamilan",
      image:
        "/assets/images/masalah_kehamilan/masalah_kehamilan_gerak-janin.avif",
    },
    {
      id: 5,
      title: "Keputihan",
      image:
        "/assets/images/masalah_kehamilan/masalah_kehamilan_keputihan.avif",
    },
    {
      id: 6,
      title: "Anemia",
      image: "/assets/images/masalah_kehamilan/masalah_kehamilan_anemia.avif",
    },
    {
      id: 7,
      title: "Mual dan muntah",
      image: "/assets/images/masalah_kehamilan/masalah_kehamilan_muntah.avif",
    },
    {
      id: 8,
      title: "Varises dan bengkak pada kaki",
      image: "/assets/images/masalah_kehamilan/masalah_kehamilan_varises.avif",
    },
    {
      id: 9,
      title: "Sesak napas",
      image:
        "/assets/images/masalah_kehamilan/masalah_kehamilan_sesak-nafas.avif",
    },
    {
      id: 10,
      title: "Sering kencing",
      image:
        "/assets/images/masalah_kehamilan/masalah_kehamilan_sering-kencing.avif",
    },
    {
      id: 11,
      title: "Konstipasi",
      image:
        "/assets/images/masalah_kehamilan/masalah_kehamilan_konstipasi.avif",
    },
    {
      id: 12,
      title: "Nyeri punggung",
      image:
        "/assets/images/masalah_kehamilan/masalah_kehamilan_nyeri-punggung.avif",
    },
    {
      id: 13,
      title: "Penurunan gairah seksual",
      image:
        "/assets/images/masalah_kehamilan/masalah_kehamilan_penurunan-gairah.avif",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-[#2d2a2a] p-4 md:p-8 flex flex-col items-center font-sans">
      <div className="w-full max-w-4xl pt-8 md:pt-4 flex flex-col">
        <h1 className="text-[#f486bb] text-2xl md:text-3xl font-black mb-8 self-start">
          Masalah Kehamilan
        </h1>

        <div className="flex flex-col gap-6 w-full">
          {problems.map((item) => (
            <Link
              key={item.id}
              to="/informasi-kehamilan/masalah/$masalahId"
              params={{ masalahId: item.id.toString() }}
              className="flex flex-row items-center bg-white rounded-3xl shadow-lg p-4 md:p-6 gap-4 md:gap-8 w-full border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-[#f486bb] text-4xl md:text-5xl font-black px-2 md:px-6 w-12 md:w-20 text-center">
                {item.id}
              </div>

              <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-2xl overflow-hidden flex items-center justify-center bg-[#fef5f9]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col flex-1 pr-4">
                <h2 className="text-[#f486bb] text-lg md:text-2xl font-bold leading-snug">
                  {item.title}
                </h2>
                <span className="text-sm md:text-base text-gray-500 mt-2 italic flex items-center gap-1">
                  Lihat detail
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 self-start">
          <Link
            to="/informasi-kehamilan"
            className="inline-flex items-center justify-center bg-[#f486bb] text-white px-6 py-3 rounded-2xl font-bold text-lg shadow-md hover:bg-[#e075a8] transition-colors">
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
              className="mr-2">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Kembali
          </Link>
        </div>
      </div>
    </main>
  );
}
