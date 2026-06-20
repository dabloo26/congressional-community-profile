import { useEffect, useState } from "react";
import { useCommunity } from "../context/CommunityContext";
import { HumanTranslation } from "./HumanTranslation";

export function EverydayStories() {
  const { profile } = useCommunity();
  const stories = profile.everydayStories;
  const facts = profile.surpriseFacts;
  const [activeId, setActiveId] = useState(stories[0]?.id ?? "coffee");

  useEffect(() => {
    setActiveId(stories[0]?.id ?? "coffee");
  }, [profile.stats.id, stories]);

  const active = stories.find((s) => s.id === activeId) ?? stories[0];
  if (!active) return null;

  const t = profile.stats.theme;

  return (
    <section
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
      aria-labelledby="everyday-title"
    >
      <p className="text-xs font-bold uppercase tracking-wider text-violet-600">Everyday scenes</p>
      <h2 id="everyday-title" className="mt-1 font-display text-2xl text-slate-900 sm:text-3xl">
        Picture the data in real life
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Same Census numbers, told as moments you can actually imagine. Tap a scene.
      </p>

      {facts.length > 0 && (
        <ul className="mt-5 flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory">
          {facts.map((f) => (
            <li
              key={f.headline}
              className="min-w-[220px] max-w-[260px] shrink-0 snap-start rounded-xl border border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50 px-4 py-3"
            >
              <p className="text-lg" aria-hidden>
                {f.emoji}
              </p>
              <p className="mt-1 text-sm font-bold text-amber-950">{f.headline}</p>
              <p className="mt-1 text-xs leading-relaxed text-amber-900/80">{f.detail}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Story scenes">
        {stories.map((story) => (
          <button
            key={story.id}
            type="button"
            role="tab"
            aria-selected={activeId === story.id}
            onClick={() => setActiveId(story.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeId === story.id
                ? "text-white shadow-md"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
            style={
              activeId === story.id
                ? { background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})` }
                : undefined
            }
          >
            {story.emoji} {story.title}
          </button>
        ))}
      </div>

      <article
        role="tabpanel"
        className="mt-5 overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-5 sm:p-6"
      >
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{active.hook}</p>
        <h3 className="mt-2 font-display text-xl text-slate-900">{active.title}</h3>
        <p className="mt-4 text-base leading-relaxed text-slate-700">{active.body}</p>
        <p
          className="mt-4 rounded-xl px-4 py-3 text-sm font-medium leading-relaxed text-white"
          style={{ background: `linear-gradient(135deg, ${t.primary}, ${t.primary}dd)` }}
        >
          {active.districtLine}
        </p>
      </article>

      <HumanTranslation>
        These scenes use real ACS percentages scaled to a coffee line (10), a street (20), a bus (40),
        or a party (12). They are not surveys. They are a way to feel the gap between{" "}
        {profile.stats.shortId} and {profile.stats.districtName}.
      </HumanTranslation>
    </section>
  );
}
