import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/education/")({
  component: EducationIndexPage,
});

function EducationIndexPage() {
  return (
    <main className="education-page home-page-no-scroll">
      <section className="education-section" aria-labelledby="education-title">
        <h1 id="education-title" className="education-mobile-title">
          Education
        </h1>

        <div className="education-container">
          <Link to="/education/flipbook" className="education-card">
            <div className="education-card-image-wrap">
              <img
                src="/assets/images/flipbook.avif"
                alt="Flipbook Education"
                className="education-card-image"
              />
            </div>
            <h2 className="education-card-title">Flipbook</h2>
          </Link>

          <Link to="/education/video" className="education-card">
            <div className="education-card-image-wrap">
              <img
                src="/assets/images/video.avif"
                alt="Video Education"
                className="education-card-image"
              />
            </div>
            <h2 className="education-card-title">Video</h2>
          </Link>
        </div>
      </section>
    </main>
  );
}
