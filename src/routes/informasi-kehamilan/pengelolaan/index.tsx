import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/informasi-kehamilan/pengelolaan/")({
  component: PengelolaanKehamilanPage,
});

function PengelolaanKehamilanPage() {
  const list = [
    {
      id: 1,
      title: "MAKANAN",
      image: "/assets/images/pengelolaan_kehamilan/pengelolaan_kehamilan_makanan.avif",
      hasDetail: false,
    },
    {
      id: 2,
      title: "ISTIRAHAT",
      image: "/assets/images/pengelolaan_kehamilan/pengelolaan_kehamilan_istirahat.avif",
      hasDetail: false,
    },
    {
      id: 3,
      title: "KOMUNIKASI DENGAN BAYI",
      image: "/assets/images/pengelolaan_kehamilan/pengelolaan_kehamilan_komunikasi.avif",
      hasDetail: false,
    },
    {
      id: 4,
      title: "MAKANAN DALAM SATU PIRING UNTUK IBU HAMIL",
      image: "/assets/images/pengelolaan_kehamilan/pengelolaan_kehamilan_piring.avif",
      hasDetail: false,
    },
    {
      id: 5,
      title: "TIDUR MALAM 6-7 JAM",
      image: "/assets/images/pengelolaan_kehamilan/pengelolaan_kehamilan_tidur.avif",
      hasDetail: false,
    },
    {
      id: 6,
      title: "TIDUR SIANG 1-2 JAM",
      image: "/assets/images/pengelolaan_kehamilan/pengelolaan_kehamilan_tidur-siang.avif",
      hasDetail: false,
    },
    {
      id: 7,
      title: "SUAMI-ISTRI",
      image: "/assets/images/pengelolaan_kehamilan/pengelolaan_kehamilan_suami-istri.avif",
      hasDetail: false,
    },
    {
      id: 8,
      title: "KEBERSIHAN DIRI",
      image: "/assets/images/pengelolaan_kehamilan/pengelolaan_kehamilan_kebersihan-diri.avif",
      hasDetail: true,
    },
  ];

  return (
    <main className="min-h-screen bg-white text-[#2d2a2a] p-4 md:p-8 flex flex-col items-center font-sans">
      <div className="w-full max-w-4xl pt-8 md:pt-4 flex flex-col">
        <h1 className="text-[#f486bb] text-2xl md:text-3xl font-black mb-8 self-start">
          Pengelolaan Kehamilan
        </h1>

        <div className="flex flex-col gap-6 w-full">
          {list.map((item) => {
            const cardContent = (
              <div
                className={`flex flex-row items-center bg-white rounded-3xl shadow-lg p-4 md:p-6 gap-4 md:gap-8 w-full border border-gray-100 ${
                  item.hasDetail ? "hover:shadow-xl transition-shadow" : ""
                }`}
              >
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
                  {item.hasDetail && (
                    <span className="text-sm md:text-base text-gray-500 mt-2 italic flex items-center gap-1">
                      Lihat detail 
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </span>
                  )}
                </div>
              </div>
            );

            return item.hasDetail ? (
              <Link
                key={item.id}
                to="/informasi-kehamilan/pengelolaan/$pengelolaanId"
                params={{ pengelolaanId: item.id.toString() }}
                className="block w-full"
              >
                {cardContent}
              </Link>
            ) : (
              <div key={item.id} className="block w-full">
                {cardContent}
              </div>
            );
          })}
        </div>

        <div className="mt-8 self-start">
          <Link
            to="/informasi-kehamilan"
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
