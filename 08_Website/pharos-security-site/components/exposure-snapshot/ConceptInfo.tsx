"use client";

import { useId, useState } from "react";
import { InfoIcon } from "@/components/icons";
import { CONCEPT_EXPLAINERS } from "@/lib/exposure-snapshot/findings/concept-explainers";
import type { Concept } from "@/lib/exposure-snapshot/findings/types";

export default function ConceptInfo({ concept }: { concept: Concept }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const explainer = CONCEPT_EXPLAINERS[concept];

  return (
    <span className="inline-block align-middle">
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
          className="mt-2 block max-w-md rounded-xl border border-charcoal/10 bg-mist/70 p-3.5 text-sm leading-relaxed text-charcoal/75"
        >
          <span className="block font-semibold text-navy">{explainer.title}</span>
          <span className="mt-1 block">{explainer.explanation}</span>
        </span>
      )}
    </span>
  );
}
