import { useEffect, useState } from "react";
import { useCommunity } from "../context/CommunityContext";
import { HumanTranslation } from "./HumanTranslation";

export function WouldYouNoticeGame() {
  const { profile } = useCommunity();
  const game = profile.noticeGame;
  const [picked, setPicked] = useState<number | null>(null);
  const revealed = picked !== null;

  useEffect(() => {
    setPicked(null);
  }, [profile.stats.id]);

  return (
    <section
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8"
      aria-labelledby="game-title"
    >
      <p className="text-xs font-bold uppercase tracking-wider text-rose-600">
        Would you notice the difference?
      </p>
      <h2 id="game-title" className="mt-2 font-display text-2xl text-slate-900">
        A quick guessing game
      </h2>
      <p className="mt-3 text-base leading-relaxed text-slate-700">{game.prompt}</p>

      <div className="mt-5 grid gap-2 sm:grid-cols-2" role="group" aria-label="Your guess">
        {game.options.map((option, i) => {
          const isSelected = picked === i;
          const isCorrect = i === game.correctOption;
          return (
            <button
              key={option}
              type="button"
              disabled={revealed}
              onClick={() => setPicked(i)}
              className={`rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition ${
                !revealed
                  ? "border-slate-200 bg-slate-50 hover:border-blue-400 hover:bg-blue-50 hover:shadow-sm"
                  : isSelected && isCorrect
                    ? "border-emerald-400 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-200"
                    : isSelected
                      ? "border-amber-300 bg-amber-50 text-amber-900"
                      : isCorrect
                        ? "border-emerald-300 bg-emerald-50/50 text-emerald-800"
                        : "border-slate-100 bg-slate-50/50 text-slate-400"
              }`}
            >
              {option}
              {revealed && isCorrect && (
                <span className="ml-2 text-xs font-bold text-emerald-600">← spot on</span>
              )}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className="mt-6 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-5">
          <h3 className="font-display text-xl text-blue-900">{game.revealTitle}</h3>
          <ul className="mt-4 space-y-2">
            {game.reveals.map((line) => (
              <li key={line} className="flex gap-2 text-sm text-slate-700">
                <span className="text-blue-500" aria-hidden>
                  →
                </span>
                {line}
              </li>
            ))}
          </ul>
          <HumanTranslation>{game.humanSummary}</HumanTranslation>
          <button
            type="button"
            className="mt-4 text-sm font-semibold text-blue-700 hover:underline"
            onClick={() => setPicked(null)}
          >
            Play again ↻
          </button>
        </div>
      )}
    </section>
  );
}
