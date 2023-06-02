import { defineConfig } from "astro/config";
import compress from "astro-compress";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  allowImportingTsExtensions: true,
  site: 'https://dripster.rocks/padel-scoreboard/',
  compressHTML: true,
  experimental: {
    assets: true
  },
  integrations: [compress(), react()]
});