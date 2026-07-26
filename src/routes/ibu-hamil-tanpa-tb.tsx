import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ibu-hamil-tanpa-tb")({
  component: IbuHamilTanpaTbPage,
});

function IbuHamilTanpaTbPage() {
  return (
    <main className="ibu-hamil-tb-page home-page-no-scroll">
      <section
        className="ibu-hamil-tb-section"
        aria-labelledby="ibu-hamil-tb-title"
      >
        <h1 id="ibu-hamil-tb-title" className="ibu-hamil-tb-mobile-title">
          Ibu Hamil Tanpa TB
        </h1>

        <div className="ibu-hamil-tb-container">
          <article className="ibu-hamil-tb-card">
            <div className="ibu-hamil-tb-card-image-wrap">
              <img
                src="/assets/images/ibu_hamil_tb-1.avif"
                alt="Ibu hamil batuk akibat TB Paru"
                className="ibu-hamil-tb-card-image"
              />
            </div>
            <div className="ibu-hamil-tb-card-content">
              <p className="ibu-hamil-tb-card-text">
                Tuberkulosis (TB) Paru pada kehamilan merupakan penyebab utama
                kesakitan dan kematian ibu hamil terutama pada wanita usia
                produktif. Saat hamil terjadi penekanan respons imun seluler,
                sehingga saat melahirkan dapat memicu perburukan gejala TB.
              </p>
            </div>
          </article>

          <article className="ibu-hamil-tb-card ibu-hamil-tb-card-reverse">
            <div className="ibu-hamil-tb-card-image-wrap">
              <img
                src="/assets/images/ibu_hamil_tb-2.avif"
                alt="Ibu hamil mengalami komplikasi akibat TB"
                className="ibu-hamil-tb-card-image"
              />
            </div>
            <div className="ibu-hamil-tb-card-content">
              <p className="ibu-hamil-tb-card-text">
                Setelah persalinan terjadi pemulihan infeksi TB yang dapat
                memicu perburukan gejala TB. Ibu hamil dengan TB memiliki resiko 3
                kali lebih tinggi terjadi komplikasi keguguran, anemi,
                perdarahan persalinaan, dan prematur.
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
