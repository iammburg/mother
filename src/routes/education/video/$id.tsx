import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { videosData } from "~/constants/videoData";

export const Route = createFileRoute("/education/video/$id")({
  component: VideoPlayerPage,
});

function VideoPlayerPage() {
  const { id } = useParams({ from: "/education/video/$id" });
  const video = videosData[id] ?? videosData["1"];

  return (
    <main className="education-page home-page-no-scroll">
      <section
        className="education-section video-player-section"
        aria-labelledby="video-player-title"
      >
        <div className="video-player-header">
          <h1 id="video-player-title" className="video-player-main-title">
            {video.numberTitle}
          </h1>
          <p className="video-player-subtitle">{video.subtitle}</p>
        </div>

        <div className="video-player-stage">
          <div className="video-player-frame">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={video.subtitle}
              className="video-player-iframe"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <div className="video-back-wrapper">
          <Link to="/education/video" className="video-back-button">
            <ChevronLeft size={24} strokeWidth={3} aria-hidden="true" />
            <span>Kembali</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
