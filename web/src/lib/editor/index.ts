import { basicSetup } from "codemirror";
import { EditorView, ViewPlugin } from "@codemirror/view";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { syntaxTree } from "@codemirror/language";
import { EditorState } from "@codemirror/state";
import type { SyntaxNode } from "@lezer/common";
import { editorTheme } from "./theme";
import { createModeToggleKeymap } from "./keymap";
import { createUploadExtension } from "./upload";
import { livePreviewPlugin } from "./decorations";
import { openslateSyntaxHighlighting } from "./syntax";

export interface EditorExtensionsOptions {
  onModeToggle: () => void;
  onFileUpload: (file: File, view: EditorView) => void;
  onDocChange: (doc: string) => void;
}

function openLinkAt(view: EditorView, pos: number): boolean {
  const tree = syntaxTree(view.state);
  let node: SyntaxNode | null = tree.resolveInner(pos, 1);
  while (node && node.name !== "Link") {
    node = node.parent;
  }
  if (!node) return false;

  const urlNode = node.getChild("URL");
  if (!urlNode) return false;

  const url = view.state.doc.sliceString(urlNode.from, urlNode.to);
  if (!url) return false;

  window.open(url, "_blank", "noopener,noreferrer");
  return true;
}

// Capture pointerdown on links before CM6 moves the cursor into them.
const linkPointerGuard = ViewPlugin.fromClass(
  class {
    private readonly onPointerDown = (event: PointerEvent) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      if (event.button !== 0) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const linkEl = target.closest<HTMLElement>(".cm-lp-link");
      if (!linkEl || !this.view.contentDOM.contains(linkEl)) return;

      event.preventDefault();
      event.stopImmediatePropagation();
    };

    constructor(readonly view: EditorView) {
      view.dom.addEventListener("pointerdown", this.onPointerDown, true);
    }

    destroy() {
      this.view.dom.removeEventListener(
        "pointerdown",
        this.onPointerDown,
        true,
      );
    }
  },
);

// Open link on click after pointerdown has been intercepted.
const linkClickHandler = EditorView.domEventHandlers({
  click: (event, view) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return false;
    if (event.button !== 0) return false;

    const target = event.target;
    if (!(target instanceof Element)) return false;

    const linkEl = target.closest<HTMLElement>(".cm-lp-link");
    if (!linkEl || !view.contentDOM.contains(linkEl)) return false;

    const pos = view.posAtDOM(linkEl);
    if (pos < 0) return false;

    event.preventDefault();
    event.stopPropagation();
    return openLinkAt(view, pos);
  },
});

export function createEditorExtensions(options: EditorExtensionsOptions) {
  return [
    basicSetup,
    EditorView.lineWrapping,
    openslateSyntaxHighlighting,
    markdown({ base: markdownLanguage }),
    editorTheme,
    createModeToggleKeymap(options.onModeToggle),
    createUploadExtension(options.onFileUpload),
    EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        options.onDocChange(update.state.doc.toString());
      }
    }),
    linkPointerGuard,
    linkClickHandler,
    livePreviewPlugin,
  ];
}

export { EditorState, EditorView };
