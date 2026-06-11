import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";
import type { Extension } from "@codemirror/state";

// Custom syntax highlighting using theme CSS variables.
// Overrides CodeMirror's hardcoded defaultHighlightStyle.

const openslateHighlight = HighlightStyle.define([
  // Headings — inherit color from line decoration, just set weight
  { tag: t.heading1, fontWeight: "700" },
  { tag: t.heading2, fontWeight: "700" },
  { tag: t.heading3, fontWeight: "600" },
  { tag: t.heading4, fontWeight: "600" },
  { tag: [t.heading5, t.heading6], fontWeight: "600" },

  // Inline formatting
  { tag: t.strong, fontWeight: "700" },
  { tag: t.emphasis, fontStyle: "italic" },
  { tag: t.strikethrough, textDecoration: "line-through" },

  // Links — use theme variable
  { tag: t.link, color: "var(--editor-link-color)", textDecoration: "underline" },
  { tag: t.url, color: "var(--editor-link-color)" },

  // Code
  { tag: t.monospace, fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace' },

  // Muted syntax markers
  { tag: t.processingInstruction, color: "var(--text-tertiary)" },
  { tag: t.contentSeparator, color: "var(--text-tertiary)" },

  // Quotes
  { tag: t.quote, color: "var(--text-secondary)" },

  // Lists
  { tag: t.list, color: "var(--text-secondary)" },

  // Code block language tags (```python, etc.)
  { tag: t.meta, color: "var(--text-tertiary)" },

  // Code token highlights for fenced code blocks
  { tag: t.keyword, color: "var(--text-link)" },
  { tag: t.string, color: "var(--text-secondary)" },
  { tag: t.number, color: "var(--text-link)" },
  { tag: t.comment, color: "var(--text-tertiary)", fontStyle: "italic" },
  { tag: t.typeName, color: "var(--text-link)" },
  { tag: t.function(t.variableName), color: "var(--text-primary)" },
  { tag: t.operator, color: "var(--text-secondary)" },
  { tag: t.regexp, color: "var(--text-danger)" },
  { tag: t.tagName, color: "var(--text-link)" },
]);

export const openslateSyntaxHighlighting: Extension = syntaxHighlighting(openslateHighlight);
