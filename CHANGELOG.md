# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial monorepo scaffolding using npm workspaces.
- `@proximate/css`: Core CSS architecture, tokens, and base `.px-animate` class.
- `@proximate/css`: Animation catalogue including Entrance, Exit, Attention, and UI families.
- `@proximate/core`: Vanilla JavaScript runtime with `animate()`, `stagger()`, and `reveal()` APIs.
- `@proximate/react`: Polymorphic React `<Motion>` component utilizing the core runtime.
- `@proximate/cli`: Skeleton CLI tooling with `commander` for future custom building and generation.
- `site`: Interactive Animation Explorer built with Vite and React.
- Accessibility defaults respecting `@media (prefers-reduced-motion: reduce)`.
- Vitest testing setup for runtime APIs.
- Root documentation files (`README.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`).
