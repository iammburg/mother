export function SimpleMenuPage({ title }: { title: string }) {
  return (
    <main className="home-page">
      <section className="single-page-section" aria-labelledby="page-title">
        <h1 id="page-title">{title}</h1>
      </section>
    </main>
  );
}
