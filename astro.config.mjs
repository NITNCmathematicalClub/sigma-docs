import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  site: "https://sigma.math.nitnc.club",
  integrations: [
    starlight({
      title: "Sigma 執筆ドキュメント",
      locales: {
        root: { label: "日本語", lang: "ja" },
      },
      sidebar: [
        { label: "はじめに", link: "/" },
        { label: "スタート", items: [{ autogenerate: { directory: "start" } }] },
        { label: "執筆", items: [{ autogenerate: { directory: "writing" } }] },
      ],
    }),
  ],
});
