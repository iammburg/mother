import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/deteksi-dini-tb")({
  component: DeteksiDiniTbPage,
});

function DeteksiDiniTbPage() {
  return (
    <main className="deteksi-tb-page">
      <section className="deteksi-tb-section" aria-labelledby="deteksi-tb-title">
        <h1 id="deteksi-tb-title" className="deteksi-tb-mobile-title">
          Deteksi Dini TB
        </h1>

        <div className="deteksi-tb-container">
          <article className="deteksi-tb-card">
            <div className="deteksi-tb-card-header">
              <h2 className="deteksi-tb-card-lead">Ayo,</h2>
              <h2 className="deteksi-tb-card-headline">Cek Sekarang Juga !</h2>
            </div>
            <div className="deteksi-tb-card-image-wrap">
              <img
                src="/assets/images/Deteksi Dini TB.avif"
                alt="Deteksi Dini TB pada Ibu Hamil"
                className="deteksi-tb-card-image"
              />
            </div>
            <div className="deteksi-tb-card-footer">
              <p className="deteksi-tb-card-subtext">Deteksi Dini TB pada Ibu Hamil</p>
            </div>
          </article>

          <div className="deteksi-tb-info">
            <section className="deteksi-tb-info-group">
              <h2 className="deteksi-tb-info-title">Deteksi Dini TB :</h2>
              <ol className="deteksi-tb-list">
                <li>
                  Deteksi gejala TB hampir mirip dengan keluhan saat hamil :
                  kelelahan, sesak napas ringan, berkeringat dingin malam hari &amp;
                  penurunan BB
                </li>
                <li>
                  Riwayat kontak pasien TB, anamnesa mendalam gejala spesifik
                </li>
                <li>Tes Tuberculin (mantoux) atau IGRAs</li>
                <li>Radiografi toraks dengan penggunaan pelindung abdomen</li>
                <li>Pemeriksaan kultur sputum</li>
                <li>Tes cepat molikuler (TCM)</li>
              </ol>
            </section>

            <section className="deteksi-tb-info-group">
              <h2 className="deteksi-tb-info-title">
                Pemantauan Ibu Hamil yang terpapar TB Paru :
              </h2>
              <ol className="deteksi-tb-list">
                <li>Monitoring efek samping obat</li>
                <li>Pemantauan status gizi ibu hamil</li>
                <li>Pemantauan kesejahteraan janin</li>
              </ol>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
