import React from "react";

function slugifyHeading(text) {
  const s = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return s || "section";
}

/**
 * Unique id for each ## heading (stable for anchor links / TOC).
 */
function nextHeadingId(title, usedIds) {
  const base = slugifyHeading(title);
  if (!usedIds.has(base)) {
    usedIds.add(base);
    return base;
  }
  let n = 2;
  let id = `${base}-${n}`;
  while (usedIds.has(id)) {
    n += 1;
    id = `${base}-${n}`;
  }
  usedIds.add(id);
  return id;
}

/**
 * @returns {{ toc: { id: string, title: string }[], nodes: React.ReactNode[] }}
 */
export function buildBlogArticleParts(text) {
  const blocks = text.trim().split(/\n\n+/);
  const usedIds = new Set();
  const toc = [];
  let seenContent = false;

  const nodes = blocks.map((block, i) => {
    const t = block.trim();
    if (t.startsWith("### ")) {
      seenContent = true;
      return (
        <h3
          key={i}
          className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mt-8 mb-3 tracking-tight scroll-mt-28"
        >
          {t.slice(4)}
        </h3>
      );
    }
    if (t.startsWith("## ")) {
      const titleText = t.slice(3);
      const id = nextHeadingId(titleText, usedIds);
      toc.push({ id, title: titleText });
      const isFirstHeading = !seenContent;
      seenContent = true;
      return (
        <h2
          key={i}
          id={id}
          className={`text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight mb-4 scroll-mt-28 ${
            isFirstHeading ? "mt-2" : "mt-14 pt-2 border-t border-zinc-200/80 dark:border-zinc-800/80"
          }`}
        >
          {titleText}
        </h2>
      );
    }
    seenContent = true;
    return (
      <p
        key={i}
        className="text-[17px] sm:text-lg leading-[1.75] text-zinc-600 dark:text-zinc-300 mb-5"
      >
        {t}
      </p>
    );
  });

  return { toc, nodes };
}

/** @deprecated Prefer buildBlogArticleParts when you need TOC / ids */
export function renderBlogBody(text) {
  return buildBlogArticleParts(text).nodes;
}
