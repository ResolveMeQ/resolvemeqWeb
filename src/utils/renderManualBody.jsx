import React from "react";

function slugifyHeading(text) {
  const s = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return s || "section";
}

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

function renderInline(text) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="text-sm font-mono bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-800 dark:text-zinc-200"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

function isTableRow(line) {
  return line.trim().startsWith("|") && line.trim().endsWith("|");
}

function parseTable(lines) {
  const rows = lines
    .filter((l) => !/^\|[\s\-:|]+\|$/.test(l.trim()))
    .map((l) =>
      l
        .trim()
        .slice(1, -1)
        .split("|")
        .map((c) => c.trim())
    );
  if (rows.length === 0) return null;
  const [head, ...body] = rows;
  return (
    <div className="overflow-x-auto mb-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
      <table className="min-w-full text-sm">
        <thead className="bg-zinc-50 dark:bg-zinc-900/80">
          <tr>
            {head.map((cell) => (
              <th
                key={cell}
                className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100"
              >
                {renderInline(cell)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, ri) => (
            <tr
              key={ri}
              className="border-t border-zinc-200 dark:border-zinc-800"
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-4 py-3 text-zinc-600 dark:text-zinc-300 align-top"
                >
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * @returns {{ toc: { id: string, title: string }[], nodes: React.ReactNode[] }}
 */
export function buildManualArticleParts(text) {
  const blocks = text.trim().split(/\n\n+/);
  const usedIds = new Set();
  const toc = [];
  let seenContent = false;
  const nodes = [];
  let bi = 0;

  while (bi < blocks.length) {
    const block = blocks[bi].trim();

    if (block.startsWith("```")) {
      const lines = block.split("\n");
      const lang = lines[0].replace(/```/, "").trim();
      const code = lines.slice(1, lines[lines.length - 1] === "```" ? -1 : undefined).join("\n");
      nodes.push(
        <pre
          key={`code-${bi}`}
          className="mb-6 overflow-x-auto rounded-xl bg-zinc-900 dark:bg-zinc-950 text-zinc-100 p-4 text-sm leading-relaxed border border-zinc-800"
        >
          <code className={lang ? `language-${lang}` : undefined}>{code}</code>
        </pre>
      );
      bi += 1;
      continue;
    }

    if (block.split("\n").every(isTableRow)) {
      nodes.push(
        <React.Fragment key={`table-${bi}`}>
          {parseTable(block.split("\n"))}
        </React.Fragment>
      );
      bi += 1;
      continue;
    }

    if (block.startsWith("### ")) {
      seenContent = true;
      nodes.push(
        <h3
          key={bi}
          className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mt-8 mb-3 tracking-tight scroll-mt-28"
        >
          {block.slice(4)}
        </h3>
      );
      bi += 1;
      continue;
    }

    if (block.startsWith("## ")) {
      const titleText = block.slice(3).split("\n")[0];
      const id = nextHeadingId(titleText, usedIds);
      toc.push({ id, title: titleText });
      const isFirstHeading = !seenContent;
      seenContent = true;
      nodes.push(
        <h2
          key={bi}
          id={id}
          className={`text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight mb-4 scroll-mt-28 ${
            isFirstHeading
              ? "mt-2"
              : "mt-14 pt-2 border-t border-zinc-200/80 dark:border-zinc-800/80"
          }`}
        >
          {titleText}
        </h2>
      );
      bi += 1;
      continue;
    }

    const lines = block.split("\n");
    if (lines.every((l) => l.trim().startsWith("- "))) {
      seenContent = true;
      nodes.push(
        <ul
          key={bi}
          className="list-disc pl-6 space-y-2 mb-6 text-[17px] leading-relaxed text-zinc-600 dark:text-zinc-300"
        >
          {lines.map((l) => (
            <li key={l}>{renderInline(l.trim().slice(2))}</li>
          ))}
        </ul>
      );
      bi += 1;
      continue;
    }

    if (lines.every((l) => /^\d+\.\s/.test(l.trim()))) {
      seenContent = true;
      nodes.push(
        <ol
          key={bi}
          className="list-decimal pl-6 space-y-2 mb-6 text-[17px] leading-relaxed text-zinc-600 dark:text-zinc-300"
        >
          {lines.map((l) => (
            <li key={l}>{renderInline(l.trim().replace(/^\d+\.\s*/, ""))}</li>
          ))}
        </ol>
      );
      bi += 1;
      continue;
    }

    seenContent = true;
    nodes.push(
      <p
        key={bi}
        className="text-[17px] sm:text-lg leading-[1.75] text-zinc-600 dark:text-zinc-300 mb-5"
      >
        {renderInline(block)}
      </p>
    );
    bi += 1;
  }

  return { toc, nodes };
}
