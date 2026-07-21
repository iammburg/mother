import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pemeriksaan-mandiri/")({
  component: PemeriksaanMandiriPage,
});

function PemeriksaanMandiriPage() {
  return (
    <main className="single-page">
      <section className="single-page-section">
        <h2>Pemeriksaan Mandiri</h2>
        {/* Content for Pemeriksaan Mandiri will go here */}
      </section>
    </main>
  );
}
