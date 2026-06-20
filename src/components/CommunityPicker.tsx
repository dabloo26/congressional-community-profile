import { useCommunity } from "../context/CommunityContext";

export function CommunityPicker() {
  const { communityId, setCommunityId, surpriseMe, allCommunities, profile } = useCommunity();

  return (
    <section
      className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-xl shadow-slate-200/50 backdrop-blur-md sm:p-6"
      aria-labelledby="picker-title"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Explore {allCommunities.length} communities
          </p>
          <h2 id="picker-title" className="mt-1 font-display text-xl text-slate-900 sm:text-2xl">
            Pick a neighborhood personality
          </h2>
          <p className="mt-1 max-w-xl text-sm text-slate-600">
            Same template, different stories — coastal retirees, desert suburbs, urban renters, and
            more. Every profile uses Census-style comparison data.
          </p>
        </div>
        <button
          type="button"
          onClick={surpriseMe}
          className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-300/40 transition hover:scale-[1.03] hover:shadow-violet-400/50 active:scale-95"
        >
          🎲 Surprise me
        </button>
      </div>

      <div className="mt-5 flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin">
        {allCommunities.map((c) => {
          const active = c.stats.id === communityId;
          const t = c.stats.theme;
          return (
            <button
              key={c.stats.id}
              type="button"
              onClick={() => setCommunityId(c.stats.id)}
              className={`group min-w-[200px] max-w-[220px] flex-shrink-0 snap-start rounded-2xl border p-4 text-left transition-all duration-300 ${
                active
                  ? "scale-[1.02] border-transparent bg-gradient-to-br text-white shadow-lg"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
              }`}
              style={
                active
                  ? {
                      backgroundImage: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
                      boxShadow: `0 12px 32px ${t.primary}40`,
                    }
                  : undefined
              }
            >
              <span className="text-3xl" aria-hidden>
                {c.stats.personEmoji}
              </span>
              <p
                className={`mt-2 text-xs font-bold uppercase tracking-wide ${
                  active ? "text-white/80" : "text-slate-400"
                }`}
              >
                {c.stats.state} · {c.stats.shortId}
              </p>
              <p
                className={`mt-1 line-clamp-2 text-sm font-semibold leading-snug ${
                  active ? "text-white" : "text-slate-800"
                }`}
              >
                {c.headline.title}
              </p>
              <p
                className={`mt-2 text-xs ${active ? "text-white/85" : "text-slate-500"}`}
              >
                Age {c.stats.medianAge} · {c.stats.population.toLocaleString()} people
              </p>
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-center text-xs text-slate-400">
        Viewing <strong className="text-slate-600">{profile.stats.name}</strong> vs{" "}
        {profile.stats.districtName}
      </p>
    </section>
  );
}
