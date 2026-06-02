# Installation and Run Guide

Task-Accounting is a static frontend project. It does not require package installation, backend services, a database, or real environment secrets.

## Local Run

```bat
scripts\setup.bat
scripts\run.bat
scripts\check.bat
scripts\format.bat
```

`scripts\run.bat` opens `index.html` in the default browser.

## Makefile Commands

```bash
make setup
make run
make check
make format
```

On Windows, `make` must be installed separately. BAT files are the primary Windows commands.

## Docker

Docker is not required for the current project architecture.

Reason:

- the project is a static HTML/CSS/JavaScript frontend;
- there is no backend;
- there is no database;
- there are no external runtime dependencies;
- the application starts by opening `index.html` in a browser.

Docker-related scripts and Makefile targets are intentionally not included, because they would not be used by the current project.

## Configuration

The project has no real secrets, tokens, passwords, database credentials, or required environment variables. `.env.example` is included only as a safe configuration sample for the installation audit.
