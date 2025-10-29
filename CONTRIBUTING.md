# Contributing

## Guidelines

- Keep changes focused and minimal – prefer small PRs to large sweeping changes
- Adhere to existing code style and standards (convention over configuration)
- Keep app/repo size and complexity in mind when introducing new dependencies
- Follow [Semantic Versioning][1] for any version-related changes

## Development

1. Use the standard GitHub fork collaboration model
2. Commit clearly and concisely
   - Use descriptive commit messages and follow [existing][2] [standards][3]
   - Group related changes together and use multiple commits if necessary
   - Use amend, fixup, or squash as appropriate
3. Push to your fork and open a Pull Request
   - Provide a brief description if needed
   - Link related issues or discussions when relevant
4. Use a semi-linear merge strategy when merging PRs
   - Before merge, rebase the PR branch onto the latest base branch
   - Prefer a merge commit to preserve individual commits when integrating a PR

## Code Standards

- Prefer functional, idiomatic JavaScript/TypeScript
- Keep things composable and predictable
- Test before submitting (unit, integration, or manual as appropriate)

---

Thanks - we appreciate your contributions 🙌

[1]: https://semver.org/
[2]: https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html
[3]: https://cbea.ms/git-commit/
