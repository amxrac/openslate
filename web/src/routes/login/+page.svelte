<script lang="ts">
  import * as auth from "$lib/auth.svelte";
  import { goto } from "$app/navigation";

  let password = $state("");
  let error = $state("");

  $effect(() => {
    if (auth.isAuthenticated()) {
      goto("/");
    }
  });

  async function handleSubmit(e: Event) {
    e.preventDefault();
    error = "";
    const ok = await auth.login(password);
    if (ok) {
      goto("/");
    } else {
      error = "Wrong password";
    }
  }
</script>

<div class="flex min-h-screen items-center justify-center">
  <form onsubmit={handleSubmit} class="w-full max-w-sm space-y-4">
    <h1 class="text-2xl font-bold">openslate</h1>
    <input
      type="password"
      bind:value={password}
      placeholder="Password"
      class="w-full rounded border px-3 py-2"
    />
    {#if error}
      <p class="text-red-500 text-sm">{error}</p>
    {/if}
    <button
      type="submit"
      class="w-full rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
    >
      Log in
    </button>
  </form>
</div>
