import { createFileRoute, Link } from "@tanstack/react-router";

import { riskCheckCards } from "~/constants/riskCheck";

export const Route = createFileRoute("/cek-risiko")({
  component: CekRisikoPage,
});

function CekRisikoPage() {
  return (
    <main className="home-page home-page-no-scroll">
      <section
        className="risk-check-section"
        aria-labelledby="risk-check-title"
      >
        <h1 id="risk-check-title" className="sr-only">
          Cek Kehamilan Resiko Tinggi
        </h1>
        <div className="risk-check-grid">
          {riskCheckCards.map((card) => (
            <Link
              key={card.title}
              to={card.href as any}
              className="risk-check-card"
              aria-label={card.description}
            >
              <div className="risk-check-image-frame">
                <img src={card.image} alt="" className="risk-check-image" />
              </div>
              <h2>{card.title}</h2>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
