import { useCommunity } from "../context/CommunityContext";

export function CommunityStory() {
  const { profile } = useCommunity();
  const { story, stats } = profile;

  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      aria-labelledby="story-title"
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-20 blur-3xl"
        style={{ background: stats.theme.primary }}
        aria-hidden
      />
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Community story</p>
      <h2 id="story-title" className="mt-2 font-display text-2xl text-slate-900 sm:text-3xl">
        {story.title}
      </h2>
      <p className="mt-2 text-sm text-slate-500">
        For staffers, journalists, and curious neighbors. The version you would retell at dinner.
      </p>

      <article className="relative mt-6 space-y-4 border-l-4 pl-5" style={{ borderColor: stats.theme.primary }}>
        {story.paragraphs.map((para, i) => (
          <p
            key={i}
            className={`leading-relaxed ${
              i === story.paragraphs.length - 1
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
