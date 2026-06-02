import { api } from "$lib/api";

let authenticated = $state<boolean | null>(null);

export function isAuthenticated(): boolean {
  return authenticated === true;
}

export function isLoading(): boolean {
  return authenticated === null;
}

export async function checkAuth(): Promise<void> {
  try {
    const res = await api("/api/auth/me");
    authenticated = res.ok;
  } catch {
    authenticated = false;
  }
}

export async function login(password: string): Promise<boolean> {
  const res = await api("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ password }),
  });
  if (res.ok) {
    authenticated = true;
    return true;
  }
  authenticated = false;
  return false;
}

export async function logout(): Promise<void> {
  await api("/api/auth/logout", { method: "POST" });
  authenticated = false;
}
