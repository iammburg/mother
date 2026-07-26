import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Grid,
  Maximize,
  Minimize,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { flipbooksData } from "~/constants/flipbookData";

export const Route = createFileRoute("/education/flipbook/$id")({
  component: FlipbookViewerPage,
});

function FlipbookViewerPage() {
  const { id } = useParams({ from: "/education/flipbook/$id" });
  const flipbook = flipbooksData[id] ?? flipbooksData["1"];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const pageFlipRef = useRef<any>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(flipbook.pageCount);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const soundEnabledRef = useRef(soundEnabled);
  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Synthesize realistic soft paper flip rustle sound using Web Audio API
  const playPaperSound = useCallback(() => {
    if (typeof window === "undefined" || !soundEnabledRef.current) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      const duration = 0.18;
      const bufferSize = Math.floor(ctx.sampleRate * duration);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        const decay = Math.exp(-i / (bufferSize * 0.32));
        data[i] = (Math.random() * 2 - 1) * decay;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 1100;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.20, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // Audio fallback
    }
  }, []);

  // Initialize Turn.js 3D PageFlip Engine
  useEffect(() => {
    let isMounted = true;
    setCurrentPage(1);
    setTotalPages(flipbook.pageCount);

    const initTurnJsEngine = async () => {
      if (typeof window === "undefined" || !containerRef.current) return;

      try {
        const { PageFlip } = await import("page-flip");

        if (!isMounted || !containerRef.current) return;

        if (pageFlipRef.current) {
          try {
            pageFlipRef.current.destroy();
          } catch {
            // Cleanup
          }
          pageFlipRef.current = null;
        }

        const isMobile = window.innerWidth <= 768;
        const width = isMobile ? 300 : 520;
        const height = isMobile ? 420 : 720;

        const pageFlip = new PageFlip(containerRef.current, {
          width,
          height,
          size: "stretch",
          minWidth: isMobile ? 220 : 360,
          maxWidth: isMobile ? 540 : 1000,
          minHeight: isMobile ? 320 : 500,
          maxHeight: isMobile ? 780 : 1200,
          maxShadowOpacity: 1.0,
          showCover: true,
          autoCenter: true,
          mobileScrollSupport: false,
          usePortrait: false,
          startPage: 0,
          drawShadow: true,
          flippingTime: 800,
          useMouseEvents: true,
          clickEventForward: true,
          cornerSize: isMobile ? 100 : 180,
        });

        const pages = containerRef.current.querySelectorAll(".flip-page-item");
        if (pages.length > 0) {
          pageFlip.loadFromHTML(pages as any);
        }

        pageFlip.on("flip", (e: any) => {
          if (!isMounted) return;
          const newPageIndex = (e.data as number) + 1;
          setCurrentPage(newPageIndex);
          playPaperSound();
        });

        pageFlipRef.current = pageFlip;
      } catch (err) {
        console.error("Failed to initialize Turn.js Engine:", err);
      }
    };

    const timer = setTimeout(initTurnJsEngine, 150);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      if (pageFlipRef.current) {
        try {
          pageFlipRef.current.destroy();
        } catch {
          // Cleanup
        }
        pageFlipRef.current = null;
      }
    };
  }, [flipbook]);

  // Navigation handlers
  const handlePrevPage = () => {
    if (pageFlipRef.current) {
      pageFlipRef.current.flipPrev("bottom");
    }
  };

  const handleNextPage = () => {
    if (pageFlipRef.current) {
      pageFlipRef.current.flipNext("bottom");
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pageNum = Number.parseInt(e.target.value, 10);
    setCurrentPage(pageNum);
    if (pageFlipRef.current) {
      pageFlipRef.current.flip(pageNum - 1);
    }
  };

  const handleJumpToPage = (pageNum: number) => {
    setCurrentPage(pageNum);
    setShowThumbnails(false);
    if (pageFlipRef.current) {
      pageFlipRef.current.flip(pageNum - 1);
    }
  };

  // Zoom handlers
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 2.2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.8));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  // Fullscreen handler
  const toggleFullscreen = () => {
    if (typeof document === "undefined") return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        }).catch(() => {});
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevPage();
      if (e.key === "ArrowRight") handleNextPage();
      if (e.key === "Escape") {
        setShowThumbnails(false);
        setZoomLevel(1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const pageNumbers = Array.from(
    { length: flipbook.pageCount },
    (_, i) => i + 1,
  );

  return (
    <main className="heyzine-viewer-page">
      {/* Top Bar */}
      <header className="heyzine-topbar">
        <div className="heyzine-topbar-left">
          <Link to="/education/flipbook" className="heyzine-back-btn">
            <ChevronLeft size={22} strokeWidth={3} />
            <span>Kembali</span>
          </Link>
          <div className="heyzine-title-group">
            <h1 className="heyzine-book-title">{flipbook.title}</h1>
            <p className="heyzine-book-subtitle">{flipbook.subtitle}</p>
          </div>
        </div>

        <div className="heyzine-topbar-right">
          <button
            type="button"
            className="heyzine-icon-btn"
            title={showThumbnails ? "Tutup Daftar Halaman" : "Daftar Halaman"}
            onClick={() => setShowThumbnails(!showThumbnails)}
          >
            <Grid size={20} />
          </button>
        </div>
      </header>

      {/* Main Flipbook Viewer Canvas Container */}
      <div className="heyzine-viewport">
        <button
          type="button"
          className="heyzine-arrow-nav left"
          onClick={handlePrevPage}
          aria-label="Halaman Sebelumnya"
          disabled={currentPage <= 1}
        >
          <ChevronLeft size={36} strokeWidth={3} />
        </button>

        <div
          className="heyzine-stage"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <div ref={containerRef} className="heyzine-flip-container turn-effect">
            {pageNumbers.map((num) => (
              <div
                key={num}
                className="flip-page-item page"
                data-density="soft"
              >
                <div className="flip-page-content">
                  <img
                    src={`${flipbook.folder}/${num}.avif`}
                    alt={`Halaman ${num}`}
                    className="flip-page-img"
                    loading={num <= 4 ? "eager" : "lazy"}
                  />
                  <div className="flip-page-number">{num}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="heyzine-arrow-nav right"
          onClick={handleNextPage}
          aria-label="Halaman Selanjutnya"
          disabled={currentPage >= totalPages}
        >
          <ChevronRight size={36} strokeWidth={3} />
        </button>
      </div>

      {/* Bottom Control Toolbar (Heyzine Style) */}
      <footer className="heyzine-toolbar">
        <div className="heyzine-toolbar-group left">
          <button
            type="button"
            className="heyzine-toolbar-btn"
            title="Daftar Gambar / Thumbnail"
            onClick={() => setShowThumbnails(!showThumbnails)}
          >
            <Grid size={18} />
            <span className="btn-label">Halaman</span>
          </button>

          <button
            type="button"
            className="heyzine-toolbar-btn"
            title={soundEnabled ? "Matikan Suara" : "Nyalakan Suara"}
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>

        <div className="heyzine-toolbar-group center">
          <input
            type="range"
            min={1}
            max={totalPages}
            value={currentPage}
            onChange={handleSliderChange}
            className="heyzine-page-slider"
          />
          <div className="heyzine-page-badge">
            <span>Halaman</span>
            <strong>{currentPage}</strong>
            <span>/ {totalPages}</span>
          </div>
        </div>

        <div className="heyzine-toolbar-group right">
          <button
            type="button"
            className="heyzine-toolbar-btn"
            title="Perbesar (Zoom In)"
            onClick={handleZoomIn}
          >
            <ZoomIn size={18} />
          </button>

          <button
            type="button"
            className="heyzine-toolbar-btn"
            title="Perkecil (Zoom Out)"
            onClick={handleZoomOut}
          >
            <ZoomOut size={18} />
          </button>

          {zoomLevel !== 1 && (
            <button
              type="button"
              className="heyzine-toolbar-btn"
              title="Reset Zoom"
              onClick={handleResetZoom}
            >
              <RotateCcw size={18} />
            </button>
          )}

          <button
            type="button"
            className="heyzine-toolbar-btn"
            title={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh"}
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
        </div>
      </footer>

      {/* Thumbnails Drawer (Table of Contents) */}
      {showThumbnails && (
        <div className="heyzine-drawer-overlay">
          <div className="heyzine-drawer">
            <div className="heyzine-drawer-header">
              <div className="heyzine-drawer-title">
                <BookOpen size={20} />
                <span>Daftar Halaman ({totalPages})</span>
              </div>
              <button
                type="button"
                className="heyzine-drawer-close"
                onClick={() => setShowThumbnails(false)}
              >
                <X size={22} />
              </button>
            </div>

            <div className="heyzine-drawer-grid">
              {pageNumbers.map((num) => (
                <button
                  key={num}
                  type="button"
                  className={`heyzine-thumb-card ${
                    currentPage === num ? "active" : ""
                  }`}
                  onClick={() => handleJumpToPage(num)}
                >
                  <img
                    src={`${flipbook.folder}/${num}.avif`}
                    alt={`Thumbnail Halaman ${num}`}
                    className="heyzine-thumb-img"
                    loading="lazy"
                  />
                  <span className="heyzine-thumb-num">Halaman {num}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
