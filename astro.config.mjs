import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  site: "https://sigma.math.nitnc.club",
  integrations: [
    starlight({
      title: "Sigma 執筆ドキュメント",
      customCss: ["./src/styles/custom.css"],
      components: {
        Footer: "./src/components/Footer.astro",
      },
      head: [
        {
          tag: "link",
          attrs: { rel: "preconnect", href: "https://fonts.googleapis.com" },
        },
        {
          tag: "link",
          attrs: {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
            crossorigin: true,
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@700&display=swap",
          },
        },
      ],
      locales: {
        root: { label: "日本語", lang: "ja" },
      },
      sidebar: [
        { label: "はじめに", link: "/" },
        { label: "スタート", items: [{ autogenerate: { directory: "start" } }] },
        { label: "執筆", items: [{ autogenerate: { directory: "writing" } }] },
        { label: "仕様", items: [{ autogenerate: { directory: "spec" } }] },
      ],
    }),
  ],
});
