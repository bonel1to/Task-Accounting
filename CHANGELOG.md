# CHANGELOG.md

## [0.1.1] - 2026-06-08

### Added

- Added GitHub Actions CI workflow for support checks.
- Added release scripts: `scripts\build.bat`, `scripts\release-check.bat`, `scripts\create-release.bat`.
- Added support incident documentation and release checklist.

### Changed

- Formalized release notes in the repository root.
- Added a repeatable release-check command for local verification before PR/release.

### Verified

- Local checks: `scripts\release-check.bat`.
- CI: `.github/workflows/ci.yml`.
- Release artifact: `release\task-accounting-v0.1.1.zip`.
