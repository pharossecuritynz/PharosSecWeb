"use client";

import { useEffect, useId, useRef, useState } from "react";
import { InfoIcon } from "@/components/icons";
import { CONCEPT_EXPLAINERS } from "@/lib/exposure-snapshot/findings/concept-explainers";
import type { Concept } from "@/lib/exposure-snapshot/findings/types";

export default function ConceptInfo({ concept }: { concept: Concept }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const explainer = CONCEPT_EXPLAINERS[concept];
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <span ref={containerRef} className="relative inline-block align-middle">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={panelId}
        className="inline-flex h-5 w-5 flex-none items-center justify-center rounded-full text-charcoal/35 transition-colors hover:text-teal"
      >
        <InfoIcon className="h-4 w-4" />
        <span className="sr-only">{explainer.title}</span>
      </button>

      {open && (
        <span
          id={panelId}
          role="note"
          className="absolute left-0 top-full z-30 mt-2 block w-72 max-w-[80vw] rounded-xl border border-charcoal/10 bg-white p-3.5 text-left text-sm leading-relaxed text-charcoal/75 shadow-[0_20px_45px_-25px_rgba(7,26,45,0.35)] sm:w-80"
        >
          <span className="block font-semibold text-navy">{explainer.title}</span>
          <span className="mt-1 block">{explainer.explanation}</span>
        </span>
      )}
    </span>
  );
}
