import { useCommunity } from "../context/CommunityContext";

export function CommunityPersonality() {
  const { profile } = useCommunity();
  const t = profile.stats.theme;

  return (
    <section
      className={`rounded-2xl bg-gradient-to-br ${t.gradient} p-6 text-white shadow-xl sm:p-8`}
      aria-labelledby="personality-title"
    >
      <p className="text-xs font-bold uppercase tracking-wider text-white/70">
        Community personality
      </p>
      <h2 id="personality-title" className="mt-2 font-display text-2xl sm:text-3xl">
        Your community, wrapped
      </h2>
      <p className="mt-2 max-w-xl text-sm text-white/85">
        Spotify Wrapped, but for {profile.stats.shortId} — badges pulled from real comparison data.
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {profile.badges.map((badge) => (
          <li
            key={badge.title}
            className="rounded-xl bg-white/15 p-4 backdrop-blur-md ring-1 ring-white/25 transition hover:bg-white/20 hover:scale-[1.02]"
          >
            <span className="text-3xl" aria-hidden>
              {badge.emoji}
            </span>
            <p className="mt-2 font-semibold">{badge.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-white/90">{badge.tagline}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
