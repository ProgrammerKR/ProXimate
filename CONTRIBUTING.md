# Contributing to ProXimate

First off, thank you for considering contributing to ProXimate! It's people like you that make ProXimate such a great tool.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:
- Use welcoming and inclusive language.
- Be respectful of differing viewpoints and experiences.
- Gracefully accept constructive criticism.
- Focus on what is best for the community.

## How Can I Contribute?

### Reporting Bugs
Bugs are tracked as GitHub issues. When creating an issue, please explain the problem and include additional details to help maintainers reproduce the problem:
- Use a clear and descriptive title for the issue.
- Describe the exact steps which reproduce the problem in as many details as possible.
- Provide a CodeSandbox or equivalent minimal reproduction.

### Suggesting Enhancements
Enhancement suggestions are tracked as GitHub issues. When you create an enhancement issue, please:
- Use a clear and descriptive title.
- Provide a step-by-step description of the suggested enhancement.
- Explain why this enhancement would be useful to most ProXimate users.

### Pull Requests
1. Fork the repo and create your branch from `main`.
2. Ensure you have installed the project via `npm install` at the workspace root.
3. If you've added an animation, ensure it follows the compositor-friendly properties (e.g., `transform`, `opacity`).
4. Run `npm run build` to ensure the compilation succeeds.
5. Make sure your code lints and tests pass via `npm run lint` and `npm run test`.
6. Issue that pull request!

## Project Structure

- `packages/css`: The core CSS primitives and animation definitions.
- `packages/core`: The Vanilla JavaScript runtime API.
- `packages/react`: The React bindings (`<Motion>`).
- `packages/cli`: The CLI tooling.
- `site`: The documentation and interactive explorer.

## Styleguides

- Follow existing conventions for CSS variables (`--px-*`).
- Animations should not exceed 1000ms by default unless specifically categorized in the `deliberate` duration scale.
- We use Prettier for code formatting. Run `npm run format` before pushing.
