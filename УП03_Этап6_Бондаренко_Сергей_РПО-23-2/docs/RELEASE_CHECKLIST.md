# RELEASE_CHECKLIST.md

| Проверка | Статус | Доказательство |
|---|---|---|
| Issue создан и описывает проблему сопровождения | manual | `01_github_issue_created.png` |
| Отдельная ветка создана | выполнено | `support/ci-release-incident`, `02_branch_created.png` |
| Проблема воспроизведена | выполнено | `03_bug_reproduced.png`, `reports/support_incident_reproduction.txt` |
| Диагностика выполнена | выполнено | `04_logs_diagnostics.png`, `reports/support_diagnostics.txt` |
| Исправление внесено commit-ом | manual | `05_fix_commit.png` |
| Локальные проверки проходят | выполнено | `06_tests_passed_locally.png`, `reports/release_check_report.txt` |
| GitHub Actions CI проходит | manual | `07_github_actions_success.png` |
| Pull Request создан | manual | `08_pull_request.png` |
| CHANGELOG.md и RELEASE_NOTES.md обновлены | выполнено | `09_changelog_release_notes.png` |
| Release archive/tag подготовлен | выполнено | `10_release_tag_or_archive.png`, `release/task-accounting-v0.1.1.zip` |
