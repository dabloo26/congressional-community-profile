import { communityStory } from "../data/storytelling";

export function CommunityStory() {
  return (
    <section
      className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-sm sm:p-8"
      aria-labelledby="story-title"
    >
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
        Community story
      </p>
      <h2 id="story-title" className="mt-2 font-display text-2xl text-slate-900 sm:text-3xl">
        {communityStory.title}
      </h2>
      <p className="mt-2 text-sm text-slate-500">
        Not a data dump — a story staffers, journalists, and neighbors might actually retell.
      </p>

      <article className="mt-6 space-y-4 border-l-4 border-blue-300 pl-5">
        {communityStory.paragraphs.map((para, i) => (
          <p
            key={i}
            className={`leading-relaxed ${
              i === communityStory.paragraphs.length - 1
                ? "text-base font-medium text-slate-800"
                : "text-base text-slate-700"
            }`}
          >
            {para}
          </p>
        ))}
      </article>
    </section>
  );
}
