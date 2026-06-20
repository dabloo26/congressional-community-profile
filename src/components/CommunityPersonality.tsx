import { communityBadges } from "../data/storytelling";

export function CommunityPersonality() {
  return (
    <section
      className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-600 to-indigo-700 p-6 text-white shadow-lg sm:p-8"
      aria-labelledby="personality-title"
    >
      <p className="text-xs font-bold uppercase tracking-wider text-violet-200">
        Community personality
      </p>
      <h2 id="personality-title" className="mt-2 font-display text-2xl sm:text-3xl">
        Your community, wrapped
      </h2>
      <p className="mt-2 max-w-xl text-sm text-violet-100">
        Spotify Wrapped, but for a neighborhood — badges generated from real Census data.
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {communityBadges.map((badge) => (
          <li
            key={badge.title}
            className="rounded-xl bg-white/10 p-4 backdrop-blur-sm ring-1 ring-white/20 transition hover:bg-white/15 hover:scale-[1.02]"
          >
            <span className="text-3xl" aria-hidden>
              {badge.emoji}
            </span>
            <p className="mt-2 font-semibold">{badge.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-violet-100">{badge.tagline}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
