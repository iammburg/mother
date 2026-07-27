import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { videosData } from "~/constants/videoData";

export const Route = createFileRoute("/education/video/")({
  component: EducationVideoIndexPage,
});

function EducationVideoIndexPage() {
  const videoList = Object.values(videosData);

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
          {videoList.map((item) => (
            <Link
              key={item.id}
              to="/education/video/$id"
              params={{ id: item.id }}
              className="video-submenu-card"
            >
              <div className="video-thumbnail-frame">
                <img
                  src={item.thumbnail}
                  alt={`Thumbnail Video ${item.id}`}
                  className="video-thumbnail-image"
                />
              </div>
              <h2 className="video-card-title">Video {item.id}</h2>
            </Link>
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
