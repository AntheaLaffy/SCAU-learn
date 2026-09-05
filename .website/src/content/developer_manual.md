
# 开发者手册

站点使用 Vite 和原生 TypeScript 构建，源码位于 `.website/`，构建结果为可直接托管的静态文件。

## 本地开发

```bash
cd .website
npm install
npm run dev
```

提交前可运行完整检查：

```bash
npm run check
npm run build
```

## 内容维护

- 页面正文位于 `src/content/`，使用 Markdown 编写。
- 页面标题、简介和分组位于 `src/data/library.ts`。
- 新增页面时，需要同时添加 Markdown 文件、原始文本导入和页面配置。
- 资料下载链接应指向仓库中的原始文件，并在提交前确认链接可以访问。

## 静态部署

`main` 分支中的站点文件发生变化后，GitHub Actions 会安装依赖、执行类型检查与构建，并将 `.website/dist` 发布到 GitHub Pages。

Vite 使用相对资源基址，因此站点既能部署在用户主页，也能部署在仓库子路径下。
