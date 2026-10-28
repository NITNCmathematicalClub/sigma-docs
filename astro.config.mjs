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
      // sidebar はコンテンツを入れるときに整える。最初は自動生成のままでよい
    }),
  ],
});
