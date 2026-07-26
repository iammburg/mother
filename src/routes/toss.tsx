import { createFileRoute } from "@tanstack/react-router";
import type { PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";

import type { TossAutoGlowState } from "~/constants/toss";
import { initialTossGlowStates, tossCards } from "~/constants/toss";

export const Route = createFileRoute("/toss")({
  component: TossPage,
});

function TossPage() {
  const [isTossPointerActive, setIsTossPointerActive] = useState(false);
  const tossAutoGlowRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tossSectionRef = useRef<HTMLElement | null>(null);
  const isTossPointerActiveRef = useRef(false);
  const tossAutoGlowStatesRef = useRef<TossAutoGlowState[]>(
    initialTossGlowStates.map((state) => ({ ...state })),
  );
  const tossAutoGlowAnimationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const randomBetween = (min: number, max: number) =>
      min + Math.random() * (max - min);
    const chooseNewGlowTarget = (glow: TossAutoGlowState, now: number) => {
      glow.targetX = randomBetween(-12, 112);
      glow.targetY = randomBetween(-8, 108);
      glow.targetScale = randomBetween(0.92, 1.28);
      glow.targetOpacity = randomBetween(0.68, 0.88);
      glow.nextTargetAt = now + randomBetween(3200, 6200);
    };

    const animateAutoGlows = (now: number) => {
      tossAutoGlowStatesRef.current.forEach((glow, index) => {
        if (now >= glow.nextTargetAt) {
          chooseNewGlowTarget(glow, now);
        }

        glow.x += (glow.targetX - glow.x) * glow.speed;
        glow.y += (glow.targetY - glow.y) * glow.speed;
        glow.scale += (glow.targetScale - glow.scale) * glow.speed;
        glow.opacity += (glow.targetOpacity - glow.opacity) * glow.speed;

        const glowElement = tossAutoGlowRefs.current[index];

        if (!glowElement) {
          return;
        }

        glowElement.style.left = `${glow.x.toFixed(2)}%`;
        glowElement.style.top = `${glow.y.toFixed(2)}%`;
        glowElement.style.opacity = glow.opacity.toFixed(3);
        glowElement.style.transform = `translate3d(-50%, -50%, 0) scale(${glow.scale.toFixed(3)})`;
      });

      tossAutoGlowAnimationFrameRef.current =
        window.requestAnimationFrame(animateAutoGlows);
    };

    tossAutoGlowStatesRef.current.forEach((glow, index) => {
      chooseNewGlowTarget(glow, performance.now() + index * 240);
    });
    tossAutoGlowAnimationFrameRef.current =
      window.requestAnimationFrame(animateAutoGlows);

    return () => {
      if (tossAutoGlowAnimationFrameRef.current) {
        window.cancelAnimationFrame(tossAutoGlowAnimationFrameRef.current);
      }
    };
  }, []);

  const handleTossPointerMove = (event: PointerEvent<HTMLElement>) => {
    const section = tossSectionRef.current;

    if (!section) {
      return;
    }

    if (event.pointerType !== "touch" && !isTossPointerActiveRef.current) {
      isTossPointerActiveRef.current = true;
      setIsTossPointerActive(true);
    }

    const bounds = section.getBoundingClientRect();
    const pointerX = ((event.clientX - bounds.left) / bounds.width) * 100;
    const pointerY = ((event.clientY - bounds.top) / bounds.height) * 100;

    section.style.setProperty("--toss-pointer-x", `${pointerX.toFixed(2)}%`);
    section.style.setProperty("--toss-pointer-y", `${pointerY.toFixed(2)}%`);
  };

  const handleTossPointerLeave = () => {
    const section = tossSectionRef.current;

    if (!section) {
      return;
    }

    isTossPointerActiveRef.current = false;
    setIsTossPointerActive(false);
  };

  return (
    <main className="home-page">
      <section
        ref={tossSectionRef}
        className={
          isTossPointerActive
            ? "toss-section toss-pointer-active"
            : "toss-section"
        }
        aria-labelledby="toss-title"
        onPointerMove={handleTossPointerMove}
        onPointerLeave={handleTossPointerLeave}
      >
        <div className="toss-glow-layer" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((glowNumber, index) => (
            <span
              key={glowNumber}
              ref={(element) => {
                tossAutoGlowRefs.current[index] = element;
              }}
              className={`toss-auto-glow toss-auto-glow-${glowNumber}`}
            />
          ))}
          <span className="toss-cursor-glow" />
        </div>

        <div className="toss-content">
          <h1 id="toss-title">Apa itu TOSS TBC ?</h1>

          <div className="toss-logo-shell" aria-hidden="true">
            <img
              src="/assets/images/toss_tbc_icon.avif"
              alt=""
              className="toss-logo"
            />
          </div>

          <div className="toss-card-grid">
            {tossCards.map((card) => (
              <article className="toss-card" key={card}>
                <p>{card}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
