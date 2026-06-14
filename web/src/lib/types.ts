export interface TabSession {
  id: string;
  noteId: string | null;
  slug: string;
  title: string;
  content: string;
  tags: string;
  dirty: boolean;
  savedTitle: string;
  savedContent: string;
  savedTags: string;
  backlinks: { title: string; slug: string }[];
}

export interface MediaItem {
  id: string;
  filename: string;
  original_name: string;
  mime_type: string;
}

export interface PaneData {
  tabs: TabSession[];
  activeTabId: string | null;
  noteMedia: MediaItem[];
}

export interface PaneNode {
  id: string;
  type: "pane";
}

export interface SplitNode {
  id: string;
  type: "split";
  direction: "vertical" | "horizontal";
  ratio: number;
  children: [LayoutNode, LayoutNode];
}

export type LayoutNode = PaneNode | SplitNode;

export type NoteSummary = {
  id: string;
  title: string;
  slug: string;
  tags: string[];
  created_at: string;
  updated_at: string;
};

export type NoteDetail = NoteSummary & {
  content: string;
  backlinks: { title: string; slug: string }[];
};

export type SearchResult = {
  id: string;
  title: string;
  slug: string;
  created_at: string;
  updated_at: string;
  title_highlight: string | null;
  content_snippet: string | null;
};
