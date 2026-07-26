import { createFileRoute, Link } from "@tanstack/react-router";

import { informasiKehamilanCards } from "~/constants/informasiKehamilan";

export const Route = createFileRoute("/informasi-kehamilan")({
  component: InformasiKehamilanPage,
});

function InformasiKehamilanPage() {
  return (
    <main className="home-page home-page-no-scroll">
      <section
        className="informasi-kehamilan-section"
        aria-labelledby="informasi-kehamilan-title"
      >
        <h1 id="informasi-kehamilan-title" className="informasi-kehamilan-title">
          Informasi Kehamilan
        </h1>
        <div className="informasi-kehamilan-grid">
          {informasiKehamilanCards.map((card) => (
            <Link
              key={card.title}
              to={card.href as any}
              className="informasi-kehamilan-card"
              aria-label={card.description}
            >
              <div className="informasi-kehamilan-image-frame">
                <img
                  src={card.image}
                  alt={card.title}
                  className="informasi-kehamilan-image"
                />
              </div>
              <h2>{card.title}</h2>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
