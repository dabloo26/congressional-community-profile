import { useMemo, useState } from "react";
import { useCommunity } from "../context/CommunityContext";
import { communityOptionLabel } from "../data/communities";

export function CommunitySelector() {
  const { communityId, setCommunityId, allCommunities, profile, surpriseMe } = useCommunity();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allCommunities;
    return allCommunities.filter(
      (c) =>
        c.stats.name.toLowerCase().includes(q) ||
        c.stats.shortId.toLowerCase().includes(q) ||
        c.stats.state.toLowerCase().includes(q) ||
        c.headline.title.toLowerCase().includes(q)
    );
  }, [allCommunities, query]);

  return (
    <section
      className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-md sm:p-7"
      aria-labelledby="choose-community"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="choose-community" className="font-display text-xl text-slate-900 sm:text-2xl">
            Choose a community
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            All profiles use U.S. Census Bureau ACS data. Pick one to see how it compares to its
            congressional district.
          </p>
        </div>
        <button
          type="button"
          onClick={surpriseMe}
          className="shrink-0 rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
        >
          Surprise me
        </button>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-slate-800">Community dropdown</span>
          <select
            value={communityId}
            onChange={(e) => setCommunityId(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            {allCommunities.map((c) => (
              <option key={c.stats.id} value={c.stats.id}>
                {communityOptionLabel(c)}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-800">Search by name or state</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Laguna Beach, Flint, CA..."
            className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </label>
      </div>

      <p className="mt-4 rounded-lg bg-blue-50 px-4 py-2.5 text-sm text-blue-900">
        <strong>Now viewing:</strong> {profile.stats.name} compared to {profile.stats.districtName}.
        {" "}
        <span className="text-blue-700">({profile.meta.updated})</span>
      </p>

      <div className="mt-5">
        <p className="text-sm font-semibold text-slate-800">Quick pick</p>
        <ul className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <li key={c.stats.id}>
              <button
                type="button"
                onClick={() => {
                  setCommunityId(c.stats.id);
                  setQuery("");
                }}
                className={`w-full rounded-xl border px-3 py-3 text-left text-sm transition hover:border-blue-400 hover:bg-blue-50 ${
                  c.stats.id === communityId
                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                    : "border-slate-200 bg-white"
                }`}
              >
                <span className="text-lg" aria-hidden>
                  {c.stats.personEmoji}
                </span>
                <span className="ml-1 font-semibold text-slate-900">{c.stats.shortId}</span>
                <span className="text-slate-500"> · {c.stats.state}</span>
                <span className="mt-0.5 block text-xs leading-snug text-slate-600">
                  {c.headline.title}
                </span>
              </button>
            </li>
          ))}
        </ul>
        {filtered.length === 0 && (
          <p className="mt-2 text-sm text-slate-500">No match. Try a state code like CA or TX.</p>
        )}
      </div>
    </section>
  );
}
