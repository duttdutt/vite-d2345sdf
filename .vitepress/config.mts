import { defineConfig } from "vitepress";
import { transformerTwoslash } from "@shikijs/vitepress-twoslash";
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from "vitepress-plugin-group-icons";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Test",
  description: "Description",
  appearance: "dark",
  themeConfig: {
    editLink: {
      pattern: "https://github.com/vitejs/vite/edit/main/docs/:path",
      text: "Suggest changes to this page",
    },

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vitejs/vite' },
    // ],
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Guide", link: "/guide/", activeMatch: "/guide/" },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "Introduction",
          items: [
            {
              text: "Getting Started",
              link: "/guide/",
            },
            {
              text: "Philosophy",
              link: "/guide/philosophy",
            },
            {
              text: "Why Vite",
              link: "/guide/why",
            },
          ],
        },
      ],
    },

    outline: {
      level: [2, 3],
    },
  },
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  markdown: {
    theme: {
      dark: "github-dark",
      light: "github-light",
    },
    codeTransformers: [
      transformerTwoslash(),
      {
        postprocess(code) {
          return code.replace(/\[\!\!code/g, "[!code");
        },
      },
    ],
    config(md) {
      md.use(groupIconMdPlugin);
    },
  },
  vite: {
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          firebase: "vscode-icons:file-type-firebase",
          shell: "vscode-icons:file-type-powershell-psd",
          ".gitlab-ci.yml": "vscode-icons:file-type-gitlab",
        },
      }),
    ],
    optimizeDeps: {
      include: ["@shikijs/vitepress-twoslash/client"],
    },
  },
});
