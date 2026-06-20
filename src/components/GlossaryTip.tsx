import type { ReactNode } from "react";
import { useState } from "react";
import { glossary } from "../data/plainLanguage";

type Props = {
  term: string;
  children?: ReactNode;
};

export function GlossaryTip({ term, children }: Props) {
  const [open, setOpen] = useState(false);
  const definition = glossary[term];

  if (!definition) return <>{children ?? term}</>;

  return (
    <span className="relative inline">
      <button
        type="button"
        className="inline-flex items-center gap-1 border-b border-dotted border-blue-400 text-inherit hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-sm"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
        aria-expanded={open}
      >
        {children ?? term}
        <span
          className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700"
          aria-hidden
        >
          ?
        </span>
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute left-0 top-full z-50 mt-2 w-64 rounded-lg border border-slate-200 bg-white p-3 text-left text-sm font-normal normal-case tracking-normal text-slate-700 shadow-lg"
        >
          {definition}
        </span>
      )}
    </span>
  );
}
