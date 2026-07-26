import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/education/video")({
  component: EducationVideoPage,
});

const videoItems = [
  {
    id: "video-1",
    title: "Video 1",
    thumbnail: "/assets/images/thumbnail/Thumbnail_video-1.avif",
    alt: "Thumbnail Video 1 Edukasi Kehamilan & TB",
  },
  {
    id: "video-2",
    title: "Video 2",
    thumbnail: "/assets/images/thumbnail/Thumbnail_video-2.avif",
    alt: "Thumbnail Video 2 Edukasi Kehamilan & TB",
  },
  {
    id: "video-3",
    title: "Video 3",
    thumbnail: "/assets/images/thumbnail/Thumbnail_video-3.avif",
    alt: "Thumbnail Video 3 Edukasi Kehamilan & TB",
  },
];

function EducationVideoPage() {
  return (
    <main className="education-page home-page-no-scroll">
      <section
        className="education-section video-submenu-section"
        aria-labelledby="video-title"
      >
        <h1 id="video-title" className="video-submenu-title">
          Video Edukasi
        </h1>

        <div className="video-submenu-container">
          {videoItems.map((item) => (
            <article key={item.id} className="video-submenu-card">
              <div className="video-thumbnail-frame">
                <img
                  src={item.thumbnail}
                  alt={item.alt}
                  className="video-thumbnail-image"
                />
              </div>
              <h2 className="video-card-title">{item.title}</h2>
            </article>
          ))}
        </div>

        <div className="video-back-wrapper">
          <Link to="/education" className="video-back-button">
            <ChevronLeft size={24} strokeWidth={3} aria-hidden="true" />
            <span>Kembali</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
