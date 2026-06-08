# Security Policy

## Scope

Task-Accounting is a static educational frontend deployed to GitHub Pages.
The project does not use a backend API, server-side roles, database accounts, or private deployment secrets.

## Sensitive Data

Do not commit real `.env` files, tokens, passwords, database dumps, logs, or backup archives.
Use `.env.example`, `.env.demo.example`, and `.env.production.example` for safe sample values.

## Reporting Issues

Security issues found during practice should be recorded in:

- `docs/SECURITY_CHECKLIST.md`
- `docs/RISK_REGISTER.md`
- `docs/BACKUP_RESTORE_REPORT.md`

## Operational Notes

- User data is stored only in browser `localStorage`.
- Backup and restore checks cover project files and release artifacts.
- Public deployment is available through GitHub Pages.
