import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/education/flipbook/")({
  component: EducationFlipbookIndexPage,
});

const flipbookItems = [
  {
    id: "1",
    title: "Flipbook 1",
    coverImage: "/assets/images/flipbook_1/1.avif",
    alt: "Flipbook 1 Pencegahan Tuberculosis pada Kehamilan",
  },
  {
    id: "2",
    title: "Flipbook 2",
    coverImage: "/assets/images/flipbook_2/1.avif",
    alt: "Flipbook 2 Tempat Mengenal TBC",
  },
  {
    id: "3",
    title: "Flipbook 3",
    coverImage: "/assets/images/flipbook_3/1.avif",
    alt: "Flipbook 3 Deteksi Dini dan Pencegahan Kehamilan dengan Tuberkulosis",
  },
];

function EducationFlipbookIndexPage() {
  return (
    <main className="education-page home-page-no-scroll">
      <section
        className="education-section flipbook-submenu-section"
        aria-labelledby="flipbook-title"
      >
        <h1 id="flipbook-title" className="flipbook-submenu-title">
          Flipbook
        </h1>

        <div className="flipbook-submenu-container">
          {flipbookItems.map((item) => (
            <Link
              key={item.id}
              to="/education/flipbook/$id"
              params={{ id: item.id }}
              className="flipbook-submenu-card"
            >
              <div className="flipbook-cover-frame">
                <img
                  src={item.coverImage}
                  alt={item.alt}
                  className="flipbook-cover-image"
                />
              </div>
              <h2 className="flipbook-card-title">{item.title}</h2>
            </Link>
          ))}
        </div>

        <div className="flipbook-back-wrapper">
          <Link to="/education" className="flipbook-back-button">
            <ChevronLeft size={24} strokeWidth={3} aria-hidden="true" />
            <span>Kembali</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
