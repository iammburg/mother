import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/quiz")({
  component: QuizPage,
});

const COMING_SOON_TEXT = "Coming Soon . . .";

function QuizPage() {
  const [typedText, setTypedText] = useState(COMING_SOON_TEXT);
  const [isPageReady, setIsPageReady] = useState(false);

  useEffect(() => {
    const revealTimer = window.setTimeout(() => {
      setIsPageReady(true);
    }, 100);

    let typingTimer: number | undefined;
    const typingStartTimer = window.setTimeout(() => {
      let characterIndex = COMING_SOON_TEXT.length;
      let isDeleting = true;

      const runTypingLoop = () => {
        if (isDeleting) {
          characterIndex -= 1;
          setTypedText(COMING_SOON_TEXT.slice(0, characterIndex));

          if (characterIndex <= 0) {
            isDeleting = false;
            typingTimer = window.setTimeout(runTypingLoop, 450);
            return;
          }

          typingTimer = window.setTimeout(runTypingLoop, 52);
          return;
        }

        characterIndex += 1;
        setTypedText(COMING_SOON_TEXT.slice(0, characterIndex));

        if (characterIndex >= COMING_SOON_TEXT.length) {
          isDeleting = true;
          typingTimer = window.setTimeout(runTypingLoop, 1800);
          return;
        }

        typingTimer = window.setTimeout(runTypingLoop, 92);
      };

      runTypingLoop();
    }, 2000);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(typingStartTimer);

      if (typingTimer) {
        window.clearTimeout(typingTimer);
      }
    };
  }, []);

  return (
    <main
      className={`quiz-page home-page-no-scroll ${
        isPageReady ? "quiz-page-ready" : ""
      }`}
    >
      <section className="quiz-hero" aria-label="Quiz TOSS TB">
        <div className="quiz-copy">
          <h1 className="quiz-title" aria-label={COMING_SOON_TEXT}>
            <span className="quiz-title-text" aria-hidden="true">
              {typedText}
            </span>
            <span className="typing-caret" aria-hidden="true" />
          </h1>
        </div>
      </section>
    </main>
  );
}
