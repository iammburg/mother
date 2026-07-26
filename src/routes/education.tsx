import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/education")({
  component: EducationPage,
});

function EducationPage() {
  return (
    <main className="education-page home-page-no-scroll">
      <section className="education-section" aria-labelledby="education-title">
        <h1 id="education-title" className="education-mobile-title">
          Education
        </h1>

        <div className="education-container">
          <article className="education-card">
            <div className="education-card-image-wrap">
              <img
                src="/assets/images/flipbook.avif"
                alt="Flipbook Education"
                className="education-card-image"
              />
            </div>
            <h2 className="education-card-title">Flipbook</h2>
          </article>

          <article className="education-card">
            <div className="education-card-image-wrap">
              <img
                src="/assets/images/video.avif"
                alt="Video Education"
                className="education-card-image"
              />
            </div>
            <h2 className="education-card-title">Video</h2>
          </article>
        </div>
      </section>
    </main>
  );
}
