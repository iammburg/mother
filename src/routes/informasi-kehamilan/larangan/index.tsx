import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/informasi-kehamilan/larangan/")({
  component: LaranganKehamilanPage,
});

function LaranganKehamilanPage() {
  const list = [
    {
      id: 1,
      title: "Kerja berat",
      image: "/assets/images/larangan_kehamilan/dihindari_hamil_kerja-berat.avif",
    },
    {
      id: 2,
      title: "Merokok atau terpapar asap rokok",
      image: "/assets/images/larangan_kehamilan/dihindari_hamil_merokok.avif",
    },
    {
      id: 3,
      title: "Minum minuman keras",
      image: "/assets/images/larangan_kehamilan/dihindari_hamil_minuman-keras.avif",
    },
    {
      id: 4,
      title: "Tidur terlentang > 10 menit setelah kehamilan 28 minggu",
      image: "/assets/images/larangan_kehamilan/dihindari_hamil_terlentang.avif",
    },
    {
      id: 5,
      title: "Minum obat tanpa resep dokter",
      image: "/assets/images/larangan_kehamilan/dihindari_hamil_minum-obat.avif",
    },
    {
      id: 6,
      title: "Stress berlebihan",
      image: "/assets/images/larangan_kehamilan/dihindari_hamil_stress.avif",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-[#2d2a2a] p-4 md:p-8 flex flex-col items-center font-sans">
      <div className="w-full max-w-4xl pt-8 md:pt-4 flex flex-col">
        <h1 className="text-[#f486bb] text-2xl md:text-3xl font-black mb-8 self-start">
          Yang Dihindari Ibu Selama Hamil
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
