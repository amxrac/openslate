import { api } from "$lib/api";

export type Theme =
  | "light" | "dark" | "sepia" | "nord" | "monokai" | "tokyo-night"
  | "solarized-light" | "solarized-dark" | "one-light" | "one-dark"
  | "github-light" | "github-dark" | "dracula" | "gruvbox-light"
  | "gruvbox-dark" | "catppuccin-latte" | "catppuccin-mocha"
  | "everforest" | "rose-pine" | "ayu-dark";

export const themes: { id: Theme; name: string; group: string }[] = [
  { id: "light", name: "Light", group: "Light" },
  { id: "github-light", name: "GitHub Light", group: "Light" },
  { id: "one-light", name: "One Light", group: "Light" },
  { id: "solarized-light", name: "Solarized Light", group: "Light" },
  { id: "catppuccin-latte", name: "Catppuccin Latte", group: "Light" },
  { id: "gruvbox-light", name: "Gruvbox Light", group: "Light" },
  { id: "sepia", name: "Sepia", group: "Light" },
  { id: "dark", name: "Dark", group: "Dark" },
  { id: "github-dark", name: "GitHub Dark", group: "Dark" },
  { id: "one-dark", name: "One Dark", group: "Dark" },
  { id: "solarized-dark", name: "Solarized Dark", group: "Dark" },
  { id: "monokai", name: "Monokai", group: "Dark" },
  { id: "dracula", name: "Dracula", group: "Dark" },
  { id: "nord", name: "Nord", group: "Dark" },
  { id: "tokyo-night", name: "Tokyo Night", group: "Dark" },
  { id: "everforest", name: "Everforest", group: "Dark" },
  { id: "gruvbox-dark", name: "Gruvbox Dark", group: "Dark" },
  { id: "catppuccin-mocha", name: "Catppuccin Mocha", group: "Dark" },
  { id: "rose-pine", name: "Rosé Pine", group: "Dark" },
  { id: "ayu-dark", name: "Ayu Dark", group: "Dark" },
];

const STORAGE_KEY = "openslate-theme";

function getInitial(): Theme {
  if (typeof document === "undefined") return "light";
  return (localStorage.getItem(STORAGE_KEY) as Theme) || "light";
}

let current = $state<Theme>(getInitial());

if (typeof document !== "undefined") {
  document.documentElement.setAttribute("data-theme", current);
}

export function getTheme(): Theme {
  return current;
}

function applyTheme(t: Theme) {
  current = t;
  localStorage.setItem(STORAGE_KEY, t);
  document.documentElement.setAttribute("data-theme", t);
}

export async function loadFromServer() {
  try {
    const res = await api("/api/preferences");
    if (res.ok) {
      const data = (await res.json()) as { theme?: string };
      if (data.theme && themes.some((theme) => theme.id === data.theme)) {
        applyTheme(data.theme as Theme);
      }
    }
  } catch {
    // use cached value
  }
}

export async function setTheme(t: Theme) {
  applyTheme(t);
  try {
    await api("/api/preferences", {
      method: "PUT",
      body: JSON.stringify({ theme: t }),
    });
  } catch {
    // will sync next time
  }
}
