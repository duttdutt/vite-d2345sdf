import { defineConfig } from "vitepress";
import { transformerTwoslash } from "@shikijs/vitepress-twoslash";
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from "vitepress-plugin-group-icons";
import taskLists from "markdown-it-task-lists";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Personal Knowledgebase",
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
    nav: [{ text: "Vue", link: "/vue/", activeMatch: "/vue/" }],

    sidebar: {
      "/vue/": [
        {
          text: "Introduction",
          items: [
            {
              text: "Роадмап",
              link: "/vue/",
            },
            {
              text: "Веб-компоненты",
              link: "/vue/web-components",
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
    config: (md) => {
      md.use(taskLists, {
        enabled: true,
      });
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
