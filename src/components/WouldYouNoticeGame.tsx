import { useState } from "react";
import { noticeGame } from "../data/storytelling";
import { HumanTranslation } from "./HumanTranslation";

export function WouldYouNoticeGame() {
  const [picked, setPicked] = useState<number | null>(null);
  const revealed = picked !== null;

  return (
    <section
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      aria-labelledby="game-title"
    >
      <p className="text-xs font-bold uppercase tracking-wider text-rose-600">
        Would you notice the difference?
      </p>
      <h2 id="game-title" className="mt-2 font-display text-2xl text-slate-900">
        A quick guessing game
      </h2>
      <p className="mt-3 text-base leading-relaxed text-slate-700">{noticeGame.prompt}</p>

      <div className="mt-5 grid gap-2 sm:grid-cols-2" role="group" aria-label="Your guess">
        {noticeGame.options.map((option, i) => {
          const isSelected = picked === i;
          const isCorrect = i === noticeGame.correctOption;
          return (
            <button
              key={option}
              type="button"
              disabled={revealed}
              onClick={() => setPicked(i)}
              className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                !revealed
                  ? "border-slate-200 bg-slate-50 hover:border-blue-400 hover:bg-blue-50"
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
        <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/50 p-5">
          <h3 className="font-display text-xl text-blue-900">{noticeGame.revealTitle}</h3>
          <ul className="mt-4 space-y-2">
            {noticeGame.reveals.map((line) => (
              <li key={line} className="flex gap-2 text-sm text-slate-700">
                <span className="text-blue-500" aria-hidden>
                  →
                </span>
                {line}
              </li>
            ))}
          </ul>
          <HumanTranslation>{noticeGame.humanSummary}</HumanTranslation>
          <button
            type="button"
            className="mt-4 text-sm font-medium text-blue-700 hover:underline"
            onClick={() => setPicked(null)}
          >
            Play again
          </button>
        </div>
      )}
    </section>
  );
}
