import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'jerry-base',
  },
  locales: [
    {
      id: 'zh-CN',
      name: '中文',
    },
    {
      id: 'en',
      name: 'English',
    },
  ],
});
