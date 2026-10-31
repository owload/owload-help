import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// The public documentation of Owload. The address it is served from is set with SITE (and BASE for a sub-path); nothing else is environment-specific.
export default defineConfig({
  // the page that listed what is not protected is now the threat model
  redirects: { "/security-limits": "/threat-model/" },
  site: process.env.SITE,
  base: process.env.BASE,
  // the Astro toolbar at the bottom of the page in `npm run dev` is not part of the site
  devToolbar: { enabled: false },
  // the page a reader is about to open is fetched when the pointer is over its link, so that opening it is instant
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  integrations: [
    starlight({
      title: "Owload Docs",
      description: "How Owload works: encrypted drives, sharing, storage and security.",
      logo: { light: "./src/assets/logo-light.svg", dark: "./src/assets/logo-dark.svg", alt: "Owload", replacesTitle: true },
      favicon: "/favicon.svg",
      components: {
        Head: "./src/components/Head.astro",
        Header: "./src/components/Header.astro",
        SiteTitle: "./src/components/SiteTitle.astro",
        PageSidebar: "./src/components/PageSidebar.astro",
      },
      customCss: [
        // Nunito, as on the landing page and on the sign-in pages
        "@fontsource/nunito/400.css",
        "@fontsource/nunito/700.css",
        "@fontsource/nunito/800.css",
        "./src/styles/owload.css",
      ],
      sidebar: [
        { label: "Get started", items: ["index", "get-started", "self-hosting"] },
        { label: "Using Owload", items: ["using-drives", "sharing", "storage", "reliability", "account"] },
        { label: "Security and privacy", items: ["security", "architecture", "threat-model"] },
        { label: "Reference", items: ["reference", "help"] },
      ],
      pagination: true,
    }),
  ],
});
