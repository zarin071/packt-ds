# packt-ds

Packt Design System built with React, Tailwind CSS, Style Dictionary, and Storybook.

[![Deploy Storybook](https://github.com/zarin071/packt-ds/actions/workflows/storybook-deploy.yml/badge.svg)](https://github.com/zarin071/packt-ds/actions/workflows/storybook-deploy.yml)

## Live Storybook

- GitHub Pages: [https://zarin071.github.io/packt-ds/](https://zarin071.github.io/packt-ds/)
- Deployment workflow: [Deploy Storybook](https://github.com/zarin071/packt-ds/actions/workflows/storybook-deploy.yml)

## Local development

Install dependencies:

```bash
npm install
```

Run Storybook locally:

```bash
npm run storybook
```

Build static Storybook output:

```bash
npm run build-storybook
```

## Deployment

Storybook deploys automatically to GitHub Pages on every push to main via:

- [.github/workflows/storybook-deploy.yml](.github/workflows/storybook-deploy.yml)

If deployment is failing, verify repository Settings -> Pages is set to build from GitHub Actions.

## Docs

- [docs/DeveloperGuide.mdx](docs/DeveloperGuide.mdx)
- [docs/HandoffDocument.mdx](docs/HandoffDocument.mdx)
- [docs/TOKEN-PIPELINE.md](docs/TOKEN-PIPELINE.md)

## Maintainers

- Primary maintainer: [@zarin071](https://github.com/zarin071)
- Deployment support: open an issue and tag `deployment` with a link to the failed workflow run
- Escalation path: include the failing run URL and error log snippet from GitHub Actions
- Issue template: [.github/ISSUE_TEMPLATE/storybook-deploy-failure.yml](.github/ISSUE_TEMPLATE/storybook-deploy-failure.yml)
- Issue template config: [.github/ISSUE_TEMPLATE/config.yml](.github/ISSUE_TEMPLATE/config.yml)