const STORAGE_KEY = "team-task-project-store-v6";
const THEME_KEY = "team-task-theme";
const CURRENT_USER_ID = 1;

const initialStore = {
  team: {
    id: 1,
    name: "Команда разработки",
    description: "Небольшая команда для работы над учебным проектом"
  },
  users: [
    { id: 1, name: "Иван", email: "ivan@example.com", role: "руководитель" },
    { id: 2, name: "Мария", email: "maria@example.com", role: "аналитик" },
    { id: 3, name: "Сергей", email: "sergey@example.com", role: "разработчик" },
    { id: 4, name: "Анна", email: "anna@example.com", role: "тестировщик" }
  ],
  statuses: [
    { id: 1, name: "Новая" },
    { id: 2, name: "В работе" },
    { id: 3, name: "Завершена" }
  ],
  priorities: [
    { id: 1, name: "Низкий" },
    { id: 2, name: "Средний" },
    { id: 3, name: "Высокий" }
  ],
  tasks: [
    {
      id: "task-1",
      title: "Сделать интерфейс",
      description: "Подготовить основной экран списка задач и форму создания новой задачи.",
      createdAt: "2026-04-20T10:00:00",
      deadline: "2026-04-25",
      statusId: 2,
      priorityId: 3,
      authorId: 1,
      assigneeId: 3
    },
    {
      id: "task-2",
      title: "Написать требования",
      description: "Сформулировать функциональные и нефункциональные требования для учебного проекта.",
      createdAt: "2026-04-22T09:30:00",
      deadline: "2026-04-28",
      statusId: 1,
      priorityId: 2,
      authorId: 1,
      assigneeId: 2
    },
    {
      id: "task-3",
      title: "Сделать отчёт",
      description: "Подготовить итоговый отчёт по этапам проектирования и приложить диаграммы.",
      createdAt: "2026-04-18T15:15:00",
      deadline: "2026-04-23",
      statusId: 3,
      priorityId: 1,
      authorId: 1,
      assigneeId: 4
    }
  ],
  comments: [
    {
      id: "comment-1",
      text: "Добавить фильтр по статусу и исполнителю.",
      createdAt: "2026-04-21T12:00:00",
      authorId: 2,
      taskId: "task-1"
    },
    {
      id: "comment-2",
      text: "Отчёт готов, осталось проверить оформление.",
      createdAt: "2026-04-23T18:00:00",
      authorId: 1,
      taskId: "task-3"
    }
  ]
};

const elements = {
  stats: document.getElementById("stats"),
  teamPanel: document.getElementById("team-panel"),
  taskList: document.getElementById("task-list"),
  kanbanBoard: document.getElementById("kanban-board"),
  taskDetail: document.getElementById("task-detail"),
  filterStatus: document.getElementById("filter-status"),
  filterAssignee: document.getElementById("filter-assignee"),
  viewMode: document.getElementById("view-mode"),
  taskForm: document.getElementById("task-form"),
  taskAssignee: document.getElementById("task-assignee"),
  taskPriority: document.getElementById("task-priority"),
  taskStatus: document.getElementById("task-status"),
  formStatus: document.getElementById("form-status"),
  resetStorage: document.getElementById("reset-storage"),
  themeToggle: document.getElementById("theme-toggle")
};

let store = null;
let selectedTaskId = null;

// Store and theme helpers
function cloneStore(data) {
  return structuredClone(data);
}

function loadTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  return savedTheme === "dark" ? "dark" : "light";
}

function updateThemeToggleLabel(theme) {
  elements.themeToggle.textContent = theme === "dark" ? "Светлая тема" : "Тёмная тема";
  elements.themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
}

function applyTheme(theme) {
  const normalizedTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = normalizedTheme;
  document.documentElement.style.colorScheme = normalizedTheme;
  localStorage.setItem(THEME_KEY, normalizedTheme);
  updateThemeToggleLabel(normalizedTheme);
}

function toggleTheme() {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
}

function isValidStoreShape(data) {
  return Boolean(
    data &&
    Array.isArray(data.tasks) &&
    Array.isArray(data.users) &&
    Array.isArray(data.statuses) &&
    Array.isArray(data.priorities) &&
    Array.isArray(data.comments)
  );
}

function loadStore(forceReset = false) {
  if (!forceReset) {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (isValidStoreShape(parsed)) {
          store = parsed;
          selectedTaskId = store.tasks[0]?.id ?? null;
          return;
        }
        console.warn("Saved project data has an unexpected structure. Initial data will be restored.");
      } catch (error) {
        console.warn("Failed to parse saved project data. Initial data will be restored.", error);
      }
    }
  }

  store = cloneStore(initialStore);
  selectedTaskId = store.tasks[0]?.id ?? null;
  saveStore();
}

function saveStore() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function getUserById(id) {
  return store.users.find((user) => user.id === id);
}

function getStatusById(id) {
  return store.statuses.find((status) => status.id === id);
}

function getPriorityById(id) {
  return store.priorities.find((priority) => priority.id === id);
}

function getTaskComments(taskId) {
  return store.comments
    .filter((comment) => comment.taskId === taskId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

// View-model helpers
function getTaskView(task) {
  return {
    ...task,
    assignee: getUserById(task.assigneeId)?.name ?? "Неизвестно",
    author: getUserById(task.authorId)?.name ?? "Неизвестно",
    status: getStatusById(task.statusId)?.name ?? "Неизвестно",
    priority: getPriorityById(task.priorityId)?.name ?? "Неизвестно",
    comments: getTaskComments(task.id).map((comment) => ({
      ...comment,
      author: getUserById(comment.authorId)?.name ?? "Неизвестно",
      canDelete: comment.authorId === CURRENT_USER_ID
    }))
  };
}

function getAllTaskViews() {
  return store.tasks.map(getTaskView);
}

function formatDate(dateString) {
  if (!dateString) {
    return "Не указан";
  }

  return new Intl.DateTimeFormat("ru-RU").format(new Date(dateString));
}

function isOverdue(taskView) {
  if (taskView.status === "Завершена") {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const deadline = new Date(taskView.deadline);
  deadline.setHours(0, 0, 0, 0);
  return deadline < today;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getStatusClass(status) {
  if (status === "Новая") return "status-new";
  if (status === "В работе") return "status-progress";
  return "status-done";
}

function getPriorityClass(priority) {
  if (priority === "Высокий") return "priority-high";
  if (priority === "Средний") return "priority-medium";
  return "priority-low";
}

// Form helpers and validation
function resetTaskFormState() {
  elements.taskForm.reset();
  elements.taskAssignee.value = String(store.users[0]?.id ?? "");
  elements.taskPriority.value = String(store.priorities[1]?.id ?? store.priorities[0]?.id ?? "");
  elements.taskStatus.value = String(store.statuses[0]?.id ?? "");
}

function isExistingUserId(userId) {
  return store.users.some((user) => user.id === userId);
}

function isExistingStatusId(statusId) {
  return store.statuses.some((status) => status.id === statusId);
}

function isExistingPriorityId(priorityId) {
  return store.priorities.some((priority) => priority.id === priorityId);
}

function validateTaskInput({ title, deadline, assigneeId, priorityId, statusId }) {
  if (!title || !deadline) {
    return "Заполни название и срок задачи.";
  }

  if (Number.isNaN(new Date(deadline).getTime())) {
    return "Укажи корректный срок задачи.";
  }

  if (!isExistingUserId(assigneeId)) {
    return "Выбери корректного исполнителя.";
  }

  if (!isExistingPriorityId(priorityId)) {
    return "Выбери корректный приоритет.";
  }

  if (!isExistingStatusId(statusId)) {
    return "Выбери корректный статус.";
  }

  return "";
}

function populateFormSelects() {
  const assigneeOptions = store.users
    .map((user) => `<option value="${user.id}">${escapeHtml(user.name)}</option>`)
    .join("");
  const filterAssigneeOptions = [
    '<option value="Все">Все</option>',
    ...store.users.map((user) => `<option value="${user.id}">${escapeHtml(user.name)}</option>`)
  ].join("");
  const statusOptions = store.statuses
    .map((status) => `<option value="${status.id}">${escapeHtml(status.name)}</option>`)
    .join("");
  const priorityOptions = store.priorities
    .map((priority) => `<option value="${priority.id}">${escapeHtml(priority.name)}</option>`)
    .join("");

  elements.taskAssignee.innerHTML = assigneeOptions;
  elements.filterAssignee.innerHTML = filterAssigneeOptions;
  elements.taskStatus.innerHTML = statusOptions;
  elements.taskPriority.innerHTML = priorityOptions;

  elements.filterAssignee.value = "Все";
  resetTaskFormState();
}

function getFilteredTasks() {
  const taskViews = getAllTaskViews();

  return taskViews.filter((task) => {
    const statusOk = elements.filterStatus.value === "Все" || task.status === elements.filterStatus.value;
    const assigneeOk = elements.filterAssignee.value === "Все" || String(task.assigneeId) === elements.filterAssignee.value;
    const modeOk = elements.viewMode.value !== "mine" || task.assigneeId === CURRENT_USER_ID;
    return statusOk && assigneeOk && modeOk;
  });
}

function ensureSelectedTask(filteredTasks) {
  if (!filteredTasks.some((task) => task.id === selectedTaskId)) {
    selectedTaskId = filteredTasks[0]?.id ?? store.tasks[0]?.id ?? null;
  }
}

// Renderers
function renderStats() {
  const taskViews = getAllTaskViews();
  const cards = [
    { label: "Всего задач", value: taskViews.length },
    { label: "В работе", value: taskViews.filter((task) => task.status === "В работе").length },
    { label: "Завершено", value: taskViews.filter((task) => task.status === "Завершена").length },
    { label: "Просрочено", value: taskViews.filter(isOverdue).length }
  ];

  elements.stats.innerHTML = cards.map((card) => `
    <article class="stat-card">
      <span class="stat-label">${card.label}</span>
      <strong class="stat-value">${card.value}</strong>
    </article>
  `).join("");
}

function renderTeamPanel() {
  const team = store.team;

  elements.teamPanel.innerHTML = `
    <div class="detail-grid">
      <div class="detail-row">
        <strong>Название команды</strong>
        <div>${escapeHtml(team.name)}</div>
      </div>
      <div class="detail-row">
        <strong>Описание</strong>
        <div>${escapeHtml(team.description)}</div>
      </div>
    </div>
    <div class="member-list">
      ${store.users.map((user) => `
        <article class="member-card">
          <div class="member-name">${escapeHtml(user.name)}</div>
          <div class="member-role">${escapeHtml(user.role)}</div>
          <div class="member-email">${escapeHtml(user.email)}</div>
        </article>
      `).join("")}
    </div>
  `;
}

function renderTaskList() {
  const filteredTasks = getFilteredTasks();
  ensureSelectedTask(filteredTasks);

  if (!filteredTasks.length) {
    elements.taskList.innerHTML = '<div class="empty-state">По выбранным фильтрам задачи не найдены.</div>';
    return;
  }

  elements.taskList.innerHTML = filteredTasks.map((task) => `
    <article class="task-item ${task.id === selectedTaskId ? "active" : ""}" data-task-id="${task.id}">
      <div class="task-head">
        <h3 class="task-title">${escapeHtml(task.title)}</h3>
        ${isOverdue(task) ? '<span class="overdue">Просрочена</span>' : ""}
      </div>
      <p class="task-description">${escapeHtml(task.description || "Описание не указано.")}</p>
      <div class="task-meta">
        <div class="badge-row">
          <span class="badge ${getStatusClass(task.status)}">${escapeHtml(task.status)}</span>
          <span class="badge ${getPriorityClass(task.priority)}">${escapeHtml(task.priority)}</span>
        </div>
        <span>${escapeHtml(task.assignee)} / срок до ${formatDate(task.deadline)}</span>
      </div>
    </article>
  `).join("");
}

function renderKanban() {
  const filteredTasks = getFilteredTasks();
  const columns = ["Новая", "В работе", "Завершена"];

  elements.kanbanBoard.innerHTML = columns.map((statusName) => {
    const items = filteredTasks.filter((task) => task.status === statusName);

    return `
      <section class="kanban-column">
        <h3>${escapeHtml(statusName)}</h3>
        <div class="kanban-stack">
          ${items.length ? items.map((task) => `
            <article class="kanban-card ${task.id === selectedTaskId ? "active" : ""}" data-task-id="${task.id}">
              <strong>${escapeHtml(task.title)}</strong>
              <span>${escapeHtml(task.assignee)}</span>
              <span>${formatDate(task.deadline)}</span>
            </article>
          `).join("") : '<div class="empty-state small">Нет задач</div>'}
        </div>
      </section>
    `;
  }).join("");
}

function renderTaskDetail() {
  const task = store.tasks.find((item) => item.id === selectedTaskId);
  const taskView = task ? getTaskView(task) : null;

  if (!task || !taskView) {
    elements.taskDetail.innerHTML = '<div class="empty-state">Выбери задачу из списка, чтобы открыть карточку.</div>';
    return;
  }

  elements.taskDetail.innerHTML = `
    <form class="detail-form" id="task-detail-form">
      <div class="form-grid">
        <div class="form-grid__full">
          <label for="detail-title">Название</label>
          <input id="detail-title" name="title" type="text" value="${escapeHtml(task.title)}">
        </div>

        <div class="form-grid__full">
          <label for="detail-description">Описание</label>
          <textarea id="detail-description" name="description">${escapeHtml(task.description || "")}</textarea>
        </div>

        <div>
          <label for="detail-assignee">Исполнитель</label>
          <select id="detail-assignee" name="assigneeId">
            ${store.users.map((user) => `<option value="${user.id}" ${user.id === task.assigneeId ? "selected" : ""}>${escapeHtml(user.name)}</option>`).join("")}
          </select>
        </div>

        <div>
          <label for="detail-deadline">Срок</label>
          <input id="detail-deadline" name="deadline" type="date" value="${escapeHtml(task.deadline)}">
        </div>

        <div>
          <label for="detail-priority">Приоритет</label>
          <select id="detail-priority" name="priorityId">
            ${store.priorities.map((priority) => `<option value="${priority.id}" ${priority.id === task.priorityId ? "selected" : ""}>${escapeHtml(priority.name)}</option>`).join("")}
          </select>
        </div>

        <div>
          <label for="detail-status">Статус</label>
          <select id="detail-status" name="statusId">
            ${store.statuses.map((status) => `<option value="${status.id}" ${status.id === task.statusId ? "selected" : ""}>${escapeHtml(status.name)}</option>`).join("")}
          </select>
        </div>
      </div>

      <div class="detail-meta-grid">
        <div class="detail-row">
          <strong>Автор</strong>
          <div>${escapeHtml(taskView.author)}</div>
        </div>
        <div class="detail-row">
          <strong>Создана</strong>
          <div>${formatDate(task.createdAt)}</div>
        </div>
      </div>

      <div class="detail-form__full">
        <label for="detail-comment">Новый комментарий</label>
        <textarea id="detail-comment" placeholder="Добавь уточнение, результат или замечание по задаче"></textarea>
      </div>

      <div class="form-actions">
        <button type="button" class="button button--primary" id="save-task">Сохранить изменения</button>
        <button type="button" class="button button--ghost" id="delete-task">Удалить задачу</button>
      </div>
    </form>

    <div class="comment-list">
      ${taskView.comments.length ? taskView.comments.map((comment) => `
        <article class="comment-item">
          <div class="comment-meta">${escapeHtml(comment.author)} / ${formatDate(comment.createdAt)}</div>
          <div>${escapeHtml(comment.text)}</div>
          ${comment.canDelete ? `<button type="button" class="button button--ghost comment-delete" data-comment-id="${comment.id}">Удалить комментарий</button>` : ""}
        </article>
      `).join("") : '<div class="empty-state">Комментариев пока нет.</div>'}
    </div>
  `;
}

function render() {
  renderStats();
  renderTeamPanel();
  renderTaskList();
  renderKanban();
  renderTaskDetail();
}

// Task mutations
function createTaskFromForm(event) {
  event.preventDefault();

  const formData = new FormData(elements.taskForm);
  const title = String(formData.get("title")).trim();
  const description = String(formData.get("description")).trim();
  const assigneeId = Number(formData.get("assignee"));
  const deadline = String(formData.get("deadline"));
  const priorityId = Number(formData.get("priority"));
  const statusId = Number(formData.get("status"));

  const validationMessage = validateTaskInput({
    title,
    deadline,
    assigneeId,
    priorityId,
    statusId
  });

  if (validationMessage) {
    elements.formStatus.textContent = validationMessage;
    return;
  }

  const newTask = {
    id: `task-${Date.now()}`,
    title,
    description,
    createdAt: new Date().toISOString(),
    deadline,
    statusId,
    priorityId,
    authorId: CURRENT_USER_ID,
    assigneeId
  };

  store.tasks.unshift(newTask);
  selectedTaskId = newTask.id;
  saveStore();
  resetTaskFormState();
  elements.formStatus.textContent = `Задача "${title}" создана.`;
  render();
}

function saveTaskChanges() {
  const task = store.tasks.find((item) => item.id === selectedTaskId);
  if (!task) return;

  const title = document.getElementById("detail-title").value.trim();
  const description = document.getElementById("detail-description").value.trim();
  const assigneeId = Number(document.getElementById("detail-assignee").value);
  const deadline = document.getElementById("detail-deadline").value;
  const priorityId = Number(document.getElementById("detail-priority").value);
  const statusId = Number(document.getElementById("detail-status").value);
  const commentText = document.getElementById("detail-comment").value.trim();

  const validationMessage = validateTaskInput({
    title,
    deadline,
    assigneeId,
    priorityId,
    statusId
  });

  if (validationMessage) {
    elements.formStatus.textContent = validationMessage;
    return;
  }

  task.title = title;
  task.description = description;
  task.assigneeId = assigneeId;
  task.deadline = deadline;
  task.priorityId = priorityId;
  task.statusId = statusId;

  if (commentText) {
    store.comments.unshift({
      id: `comment-${Date.now()}`,
      text: commentText,
      createdAt: new Date().toISOString(),
      authorId: CURRENT_USER_ID,
      taskId: task.id
    });
  }

  saveStore();
  elements.formStatus.textContent = `Изменения по задаче "${title}" сохранены.`;
  render();
}

function deleteTask() {
  const index = store.tasks.findIndex((item) => item.id === selectedTaskId);
  if (index === -1) return;

  store.tasks.splice(index, 1);
  store.comments = store.comments.filter((comment) => comment.taskId !== selectedTaskId);
  selectedTaskId = store.tasks[0]?.id ?? null;
  saveStore();
  elements.formStatus.textContent = "Задача удалена.";
  render();
}

function deleteComment(commentId) {
  const index = store.comments.findIndex((comment) => comment.id === commentId && comment.authorId === CURRENT_USER_ID);
  if (index === -1) return;

  store.comments.splice(index, 1);
  saveStore();
  elements.formStatus.textContent = "Комментарий удалён.";
  render();
}

function resetData() {
  loadStore(true);
  populateFormSelects();
  elements.filterStatus.value = "Все";
  elements.viewMode.value = "all";
  elements.formStatus.textContent = "Демонстрационные данные восстановлены.";
  render();
}

function handleTaskSelection(event) {
  const taskCard = event.target.closest("[data-task-id]");
  if (!taskCard) return;

  selectedTaskId = taskCard.dataset.taskId;
  render();
}

// Event bindings
elements.filterStatus.addEventListener("change", render);
elements.filterAssignee.addEventListener("change", render);
elements.viewMode.addEventListener("change", render);
elements.taskForm.addEventListener("submit", createTaskFromForm);
elements.resetStorage.addEventListener("click", resetData);
elements.taskList.addEventListener("click", handleTaskSelection);
elements.kanbanBoard.addEventListener("click", handleTaskSelection);
elements.themeToggle.addEventListener("click", toggleTheme);

elements.taskDetail.addEventListener("click", (event) => {
  if (event.target.id === "save-task") {
    saveTaskChanges();
  }

  if (event.target.id === "delete-task") {
    deleteTask();
  }

  if (event.target.classList.contains("comment-delete")) {
    deleteComment(event.target.dataset.commentId);
  }
});

function init() {
  applyTheme(loadTheme());
  loadStore();
  populateFormSelects();
  render();
}

init();
