import { createFileRoute, Link, useParams } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/informasi-kehamilan/masalah/$masalahId"
)({
  component: DetailMasalahKehamilanPage,
});

const masalahData: Record<
  string,
  {
    title: string;
    image: string;
    penyebab: string;
    mengatasi: string[];
  }
> = {
  "1": {
    title: "Striae (warna putih atau kehitaman) dan gatal kulit payudara",
    image: "/assets/images/masalah_kehamilan/masalah_kehamilan_striae.avif",
    penyebab: "Hormone kehamilan dan penumpukan lemak di bawah kulit",
    mengatasi: [
      "Olesi kulit payudara dengan lotion atau minyak zaitun",
      "Tidak digaruk",
      "Gunakan Bra yang menopang tidak terlalu ketat",
      "Jaga kebersihan payudara dan puting dengan membersihkan puting menggunakan lotion atau minyak zaitun, jangan gunakan sabun dapat menyebabkan puting kering dan mudah lecet",
      "Lakukan perawatan payudara dengan memijat lembut dari pangkal payudara ke puting, kompres atau siram menggunakan air hangat – dingin – hangat agar menghasilkan ASI yang banyak",
    ],
  },
  "2": {
    title: "Peningkatan Keringat",
    image: "/assets/images/masalah_kehamilan/masalah_kehamilan_striae2.avif",
    penyebab: "Hormone kehamilan",
    mengatasi: [
      "Bersihkan lipatan kulit dan permukaan seluruh kulit dengan sabun dan spon lembut",
      "Sering mengeringkan keringat",
    ],
  },
  "3": {
    title: "Striae (warna putih atau kehitaman) dan gatal kulit Rahim",
    image: "/assets/images/masalah_kehamilan/masalah_kehamilan_striae3.avif",
    penyebab: "Hormone kehamilan dan penumpukan lemak di bawah kulit",
    mengatasi: [
      "Olesi kulit rahim dan seluruh bagian tubuh yang banyak timbunan lemak dengan lotion atau minyak zaitun",
      "Tidak digaruk",
    ],
  },
  "4": {
    title: "Gerak anak dan kontraksi selama kehamilan",
    image: "/assets/images/masalah_kehamilan/masalah_kehamilan_gerak-janin.avif",
    penyebab: "Hormone kehamilan dan pertumbuhan bayi",
    mengatasi: [
      "Cek gerak janin tiap 2 jam, jumlah gerak janin 8 – 33 x/ sehari.",
      "Bila ada kenceng-kenceng pada Rahim : istirahat dengan tiduran ½ duduk, Tarik napas panjang lewat hidung keluarkan perlahan lewat mulut",
    ],
  },
  "5": {
    title: "Keputihan",
    image: "/assets/images/masalah_kehamilan/masalah_kehamilan_keputihan.avif",
    penyebab: "Hormone kehamilan",
    mengatasi: [
      "Sering ganti celana dalam saat lembab, daerah kemaluan tetap kering",
      "Jangan bersihkan kemaluan menggunakan sabun, bila perlu gunakan sabun pencuci vagina",
      "Bila ada keputihan yang berwarna kuning, berbau dan gatal, segera konsultasi ke Yankes.",
    ],
  },
  "6": {
    title: "Anemia",
    image: "/assets/images/masalah_kehamilan/masalah_kehamilan_anemia.avif",
    penyebab: "Hormone kehamilan dan peningkatan plasma",
    mengatasi: [
      "Minum tambah darah / Fe",
      "Banyak makan buah dan sayur",
      "Banyak makan Protein",
      "Batasi dan kelola aktifitas",
    ],
  },
  "7": {
    title: "Mual dan muntah",
    image: "/assets/images/masalah_kehamilan/masalah_kehamilan_muntah.avif",
    penyebab: "Hormone kehamilan dan perubahan psikologis kehamilan",
    mengatasi: [
      "Makan roti kering dan minum air hangat yang manis saat bangun tidur.",
      "Saat bangun tidur tidak terburu-buru berdiri, tetapi bertahap dari miring, duduk, berdiri dan melangkah berlahan.",
      "Makan yang disajikan hangat, sedikit tapi sering",
      "Hindari makanan yang merangsang, berlemak, berminyak, banyak mengandung gas",
      "Tetap makan sumber protein (ikan, ayam, telur atau daging)",
      "Minum ± 2 lt tiap hari",
      "Minum obat anti muntah sesuai resep dokter",
      "Gunakan aroma terapi untuk meredakan rangsangan mual dan muntah",
    ],
  },
  "8": {
    title: "Varises dan bengkak pada kaki",
    image: "/assets/images/masalah_kehamilan/masalah_kehamilan_varises.avif",
    penyebab: "Hormone kehamilan dan pertumbuhan bayi",
    mengatasi: [
      "Hindari menggunakan sandal dan sepatu hak tinggi",
      "Kurangi duduk dengan kaki menggantung",
      "Kurangi aktifitas jalan kaki",
      "Istirahat secara berkala dengan tidur setengah duduk",
      "Bila tidur telentang, kaki ditinggikan dengan diganjal bantal",
      "Tidur posisi miring kekiri",
      "Sore hari rendam kaki dengan air hangat ± 15 menit",
      "Banyak makan serat buah dan sayur, minum ± 2 liter agar tidak konstipasi",
    ],
  },
  "9": {
    title: "Sesak napas",
    image: "/assets/images/masalah_kehamilan/masalah_kehamilan_sesak-nafas.avif",
    penyebab: "Hormone kehamilan dan pertumbuhan bayi",
    mengatasi: [
      "Istirahat secara berkala dengan tidur setengah duduk, Tarik napas panjang lewat hidung keluarkan perlahan lewat mulut",
      "Tidur posisi miring kekiri",
      "Aktifitas peregangan pada bagian atas",
      "Hindari kenceng-kenceng pada Rahim",
    ],
  },
  "10": {
    title: "Sering kencing",
    image: "/assets/images/masalah_kehamilan/masalah_kehamilan_sering-kencing.avif",
    penyebab: "Hormone kehamilan dan pertumbuhan bayi",
    mengatasi: [
      "Tidak mengurangi minum, tetap ± 2 liter tiap hari",
      "Menjaga kemaluan tetap kering",
      "Cuci kemaluan setelah buang air kecil menggunakan air matang atau air bersih dari arah atas ke bawah atau depan ke arah belakang",
    ],
  },
  "11": {
    title: "Konstipasi",
    image: "/assets/images/masalah_kehamilan/masalah_kehamilan_konstipasi.avif",
    penyebab: "Hormone kehamilan dan pertumbuhan bayi",
    mengatasi: [
      "Tidak mengurangi minum, tetap ± 2 liter tiap hari",
      "Bila ada dorongan BAB segera BAB dan tidak menunda",
      "Jangan mengejan terlalu kuat saat BAB",
      "Banyak makan serat buah dan sayur",
      "Aktifitas ringan secara berkala",
    ],
  },
  "12": {
    title: "Nyeri punggung",
    image: "/assets/images/masalah_kehamilan/masalah_kehamilan_nyeri-punggung.avif",
    penyebab: "Hormone kehamilan dan pertumbuhan bayi",
    mengatasi: [
      "Aktifitas ringan secara berkala",
      "Bila duduk alasi punggung dengan bantal",
      "Sikap tubuh jangan sering menunduk",
      "Tidur telentang dengan kaki di ganjal bantal",
      "Hindari jalan terlalu cepat",
    ],
  },
  "13": {
    title: "Penurunan gairah seksual",
    image: "/assets/images/masalah_kehamilan/masalah_kehamilan_penurunan-gairah.avif",
    penyebab: "Hormone kehamilan dan pertumbuhan bayi",
    mengatasi: [
      "Hubungan seksual boleh dilakukan sejak kehamilan sampai dengan menjelang persalinan",
      "Jaga kebersihan setelah hubungan seksual",
      "Hindari orgasme agar tidak terjadi kontraksi/kenceng-kenceng Rahim",
      "Usahakan wanita dengan posisi berada diatas agar tidak terjadi penekanan terlalu berat pada rahim",
    ],
  },
};

function DetailMasalahKehamilanPage() {
  const { masalahId } = Route.useParams();
  const data = masalahData[masalahId as string];

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
          Masalah Kehamilan
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

            <div className="flex flex-col gap-2">
              <h3 className="text-[#f486bb] text-lg font-bold">PENYEBAB :</h3>
              <p className="text-[#f486bb] text-base opacity-90 pl-4">
                {data.penyebab}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-[#f486bb] text-lg font-bold">CARA MENGATASI :</h3>
              <ol className="list-decimal text-[#f486bb] text-base opacity-90 pl-8 space-y-3">
                {data.mengatasi.map((langkah, index) => (
                  <li key={index} className="pl-2 leading-relaxed">
                    {langkah}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className="mt-12 self-start">
          <Link
            to="/informasi-kehamilan/masalah"
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
