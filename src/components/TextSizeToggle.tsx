import { useCommunity } from "../context/CommunityContext";

export function TextSizeToggle() {
  const { textSize, setTextSize } = useCommunity();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-slate-700">Text size:</span>
      {(["normal", "large"] as const).map((size) => (
        <button
          key={size}
          type="button"
          onClick={() => setTextSize(size)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            textSize === size
              ? "bg-slate-900 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          {size === "normal" ? "Standard" : "Larger (easier to read)"}
        </button>
      ))}
    </div>
  );
}
