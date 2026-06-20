import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Required companion to every chart or stat. Plain language for any age. */
export function HumanTranslation({ children, className = "" }: Props) {
  return (
    <p
      className={`mt-3 rounded-lg border border-emerald-100 bg-emerald-50/90 px-3 py-2.5 text-sm leading-relaxed text-emerald-950 ${className}`}
    >
      <span className="mr-1.5 font-semibold text-emerald-800" aria-hidden>
        In plain English:
      </span>
      {children}
    </p>
  );
}
