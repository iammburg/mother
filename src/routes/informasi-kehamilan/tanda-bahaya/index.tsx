import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/informasi-kehamilan/tanda-bahaya/")({
  component: TandaBahayaKehamilanPage,
});

function TandaBahayaKehamilanPage() {
  const list = [
    {
      id: 1,
      title: "Muntah berlebihan dan tidak ada masukan makanan lewat mulut",
      image: "/assets/images/tanda_bahaya_kehamilan/tanda_bahaya_kehamilan_muntah.avif",
    },
    {
      id: 2,
      title: "Demam tinggi lebih dari 38 C atau disertai dengan menggigil (pada daerah endemic malaria)",
      image: "/assets/images/tanda_bahaya_kehamilan/tanda_bahaya_kehamilan_demam.avif",
    },
    {
      id: 3,
      title: "Mengalami keluhan bengkak pada muka, kaki dan lengan",
      image: "/assets/images/tanda_bahaya_kehamilan/tanda_bahaya_kehamilan_bengkak.avif",
    },
    {
      id: 4,
      title: "Pusing atau sakit kepala terus menerus disertai pandangan kabur",
      image: "/assets/images/tanda_bahaya_kehamilan/tanda_bahaya_kehamilan_pusing.avif",
    },
    {
      id: 5,
      title: "Gerakan janin kurang dari 8 x atau lebih dari 30 x dalam sehari",
      image: "/assets/images/tanda_bahaya_kehamilan/tanda_bahaya_kehamilan_gerak-janin.avif",
    },
    {
      id: 6,
      title: "Terjadi perdarahan pada hamil muda atau menjelang persalinan",
      image: "/assets/images/tanda_bahaya_kehamilan/tanda_bahaya_kehamilan_perdarahan.avif",
    },
    {
      id: 7,
      title: "Pada saat kencing terasa sakit, keluar keputihan yang berbau, berwarna kekuningan atau kehijauan dan berbau",
      image: "/assets/images/tanda_bahaya_kehamilan/tanda_bahaya_kehamilan_kencing.avif",
    },
    {
      id: 8,
      title: "Air ketuban keluar sebelum masa persalinan",
      image: "/assets/images/tanda_bahaya_kehamilan/tanda_bahaya_kehamilan_ketuban.avif",
    },
    {
      id: 9,
      title: "Batuk lama lebih dari 2 minggu",
      image: "/assets/images/tanda_bahaya_kehamilan/tanda_bahaya_kehamilan_batuk.avif",
    },
    {
      id: 10,
      title: "Jantung berdebar – debar atau nyeri dada",
      image: "/assets/images/tanda_bahaya_kehamilan/tanda_bahaya_kehamilan_jantung-berdebar.avif",
    },
    {
      id: 11,
      title: "Diare berulang lebih dari 5 kali dalam sehari",
      image: "/assets/images/tanda_bahaya_kehamilan/tanda_bahaya_kehamilan_diare.avif",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-[#2d2a2a] p-4 md:p-8 flex flex-col items-center font-sans">
      <div className="w-full max-w-4xl pt-8 md:pt-4 flex flex-col">
        <h1 className="text-[#f486bb] text-2xl md:text-3xl font-black mb-8 self-start">
          Tanda Bahaya Kehamilan
        </h1>

        <div className="flex flex-col gap-6 w-full">
          {list.map((item) => (
            <div
              key={item.id}
              className="flex flex-row items-center bg-white rounded-3xl shadow-lg p-4 md:p-6 gap-4 md:gap-8 w-full border border-gray-100"
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

              <h2 className="text-[#f486bb] text-lg md:text-2xl font-bold flex-1 pr-4 leading-snug">
                {item.title}
              </h2>
            </div>
          ))}
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
