// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import partytown from "@astrojs/partytown";

import cloudflare from "@astrojs/cloudflare";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), partytown()],
  adapter: cloudflare({
    // Use compile-time image optimization (Sharp runs at build, not runtime)
    imageService: "compile",
  }),

  vite: {
    plugins: [tailwindcss()],
  },
});
