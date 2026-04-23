import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiAlertTriangle, FiBarChart2, FiCheckCircle, FiFolder, FiPlus, FiTarget } from 'react-icons/fi';
import AppLayout from '../../components/layout/AppLayout';
import PageContainer from '../../components/layout/PageContainer';
import TaskStatusTable from '../../components/categories/TaskStatusTable';
import TaskPriorityTable from '../../components/categories/TaskPriorityTable';
import EditTaskStatusModal from '../../components/modals/EditTaskStatusModal';
import AddTaskPriorityModal from '../../components/modals/AddTaskPriorityModal';
import { TaskContext } from '../../context/TaskContext';
import useModal from '../../hooks/useModal';
import routePaths from '../../routes/routePaths';

const CATEGORY_SETTINGS_KEY = 'modern-taskflow-category-settings';
const CUSTOM_CATEGORIES_KEY = 'modern-taskflow-custom-categories';
const defaultStatuses = ['Completed', 'In Progress', 'Not Started'];
const defaultPriorities = ['Extreme', 'Moderate', 'Low'];

function loadCategorySettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(CATEGORY_SETTINGS_KEY));
    return {
      statuses: saved?.statuses?.length ? saved.statuses : defaultStatuses,
      priorities: saved?.priorities?.length ? saved.priorities : defaultPriorities,
    };
  } catch {
    return { statuses: defaultStatuses, priorities: defaultPriorities };
  }
}

function getCategoryStats(tasks) {
  const stats = tasks.reduce((acc, task) => {
    const category = task.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = {
        name: category,
        total: 0,
        completed: 0,
        active: 0,
        risk: 0,
        extreme: 0,
        owners: new Set(),
        tasks: [],
      };
    }

    acc[category].total += 1;
    acc[category].tasks.push(task);
    acc[category].owners.add(task.assignee);

    if (task.status === 'Completed') acc[category].completed += 1;
    if (task.status !== 'Completed') acc[category].active += 1;
    if (task.priority === 'Extreme') acc[category].extreme += 1;
    if (task.priority === 'Extreme' || task.status === 'Not Started') acc[category].risk += 1;

    return acc;
  }, {});

  return Object.values(stats)
    .map((category) => ({
      ...category,
      owners: Array.from(category.owners),
      completionRate: category.total ? Math.round((category.completed / category.total) * 100) : 0,
      healthScore: Math.max(8, 100 - category.risk * 18 + category.completed * 8),
    }))
    .sort((left, right) => right.risk - left.risk || right.total - left.total);
}

function loadCustomCategories() {
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_CATEGORIES_KEY)) || [];
  } catch {
    return [];
  }
}

export default function TaskCategoriesPage() {
  const navigate = useNavigate();
  const { tasks } = useContext(TaskContext);
  const editStatusModal = useModal();
  const addPriorityModal = useModal();
  const [statusRows, setStatusRows] = useState(() => loadCategorySettings().statuses);
  const [priorityRows, setPriorityRows] = useState(() => loadCategorySettings().priorities);
  const [editingStatus, setEditingStatus] = useState('');
  const [editingPriority, setEditingPriority] = useState('');
  const [customCategories] = useState(loadCustomCategories);
  const categoryStats = useMemo(() => {
    const stats = getCategoryStats(tasks);
    customCategories.forEach((name) => {
      if (!stats.some((category) => category.name === name)) {
        stats.push({
          name,
          total: 0,
          completed: 0,
          active: 0,
          risk: 0,
          extreme: 0,
          owners: [],
          tasks: [],
          completionRate: 0,
          healthScore: 100,
        });
      }
    });
    return stats;
  }, [customCategories, tasks]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const activeCategory = categoryStats.find((category) => category.name === selectedCategory) || categoryStats[0];
  const totalRisk = categoryStats.reduce((sum, category) => sum + category.risk, 0);
  const strongestCategory = [...categoryStats].sort((left, right) => right.completionRate - left.completionRate)[0];

  useEffect(() => {
    localStorage.setItem(
      CATEGORY_SETTINGS_KEY,
      JSON.stringify({ statuses: statusRows, priorities: priorityRows })
    );
  }, [priorityRows, statusRows]);

  function handleOpenCreatePriority() {
    setEditingPriority('');
    addPriorityModal.openModal();
  }

  function handleOpenEditPriority(priority) {
    setEditingPriority(priority);
    addPriorityModal.openModal();
  }

  function handleSubmitPriority(nextValue) {
    setPriorityRows((current) => {
      const normalized = nextValue.trim();
      if (!normalized) return current;

      if (editingPriority) {
        return current.map((item) => (item === editingPriority ? normalized : item));
      }

      if (current.some((item) => item.toLowerCase() === normalized.toLowerCase())) {
        return current;
      }

      return [...current, normalized];
    });
    setEditingPriority('');
  }

  function handleDeletePriority(priority) {
    setPriorityRows((current) => current.filter((item) => item !== priority));
  }

  function handleOpenCreateStatus() {
    setEditingStatus('');
    editStatusModal.openModal();
  }

  function handleOpenEditStatus(status) {
    setEditingStatus(status);
    editStatusModal.openModal();
  }

  function handleSubmitStatus(nextValue) {
    setStatusRows((current) => {
      const normalized = nextValue.trim();
      if (!normalized) return current;

      if (editingStatus) {
        return current.map((item) => (item === editingStatus ? normalized : item));
      }

      if (current.some((item) => item.toLowerCase() === normalized.toLowerCase())) {
        return current;
      }

      return [...current, normalized];
    });
    setEditingStatus('');
  }

  function handleDeleteStatus(status) {
    setStatusRows((current) => current.filter((item) => item !== status));
  }

  return (
    <AppLayout>
      <PageContainer className="space-y-5 pt-2">
        <section className="rounded-[8px] border border-[#e5e7eb] bg-white p-4 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-[6px] border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2 text-sm font-medium text-[#374151]">
                <FiFolder />
                Category Intelligence
              </div>
              <h1 className="mt-4 text-[2.05rem] font-semibold text-[#171717]">Task Categories</h1>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-[#6b7280]">
                Analyze workload, risk, and completion health across every category in your task board.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => navigate(routePaths.createCategories)}
                className="inline-flex items-center gap-2 rounded-[6px] bg-[#111827] px-4 py-3 text-sm font-semibold text-white"
              >
                <FiPlus />
                Add Category
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-[6px] border border-[#e5e7eb] px-4 py-3 text-sm font-semibold text-[#374151]"
              >
                Go Back
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-[8px] border border-[#e5e7eb] bg-[#f9fafb] p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-[#6b7280]"><FiBarChart2 /> Categories</div>
              <p className="mt-3 text-3xl font-semibold text-[#111827]">{categoryStats.length}</p>
              <p className="mt-2 text-sm text-[#6b7280]">Live from current task data.</p>
            </div>
            <div className="rounded-[8px] border border-[#e5e7eb] bg-[#f9fafb] p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-[#6b7280]"><FiAlertTriangle /> Risk Items</div>
              <p className="mt-3 text-3xl font-semibold text-[#111827]">{totalRisk}</p>
              <p className="mt-2 text-sm text-[#6b7280]">Extreme or not-started tasks.</p>
            </div>
            <div className="rounded-[8px] border border-[#e5e7eb] bg-[#f9fafb] p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-[#6b7280]"><FiCheckCircle /> Strongest Category</div>
              <p className="mt-3 text-lg font-semibold text-[#111827]">{strongestCategory?.name || 'No category'}</p>
              <p className="mt-2 text-sm text-[#6b7280]">{strongestCategory?.completionRate || 0}% completion health.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_0.9fr]">
            <div className="rounded-[8px] border border-[#e5e7eb]">
              <div className="border-b border-[#e5e7eb] px-4 py-3 text-sm font-semibold text-[#111827]">Smart Category Health</div>
              <div className="divide-y divide-[#e5e7eb]">
                {categoryStats.map((category) => (
                  <button
                    key={category.name}
                    type="button"
                    onClick={() => setSelectedCategory(category.name)}
                    className={`block w-full px-4 py-4 text-left transition ${
                      activeCategory?.name === category.name ? 'bg-[#f9fafb]' : 'bg-white hover:bg-[#f9fafb]'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-[#111827]">{category.name}</p>
                        <p className="mt-1 text-sm text-[#6b7280]">
                          {category.total} tasks / {category.active} active / {category.owners.join(', ')}
                        </p>
                      </div>
                      <span className="rounded-[6px] border border-[#e5e7eb] bg-white px-3 py-2 text-sm font-semibold text-[#374151]">
                        Health {category.healthScore}%
                      </span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e5e7eb]">
                      <div className="h-full rounded-full bg-[#111827]" style={{ width: `${Math.min(category.healthScore, 100)}%` }} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[8px] border border-[#e5e7eb] bg-[#f9fafb] p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-[#6b7280]">
                <FiTarget />
                Selected Category
              </div>
              <h2 className="mt-3 text-2xl font-semibold text-[#111827]">{activeCategory?.name || 'No category'}</h2>
              <p className="mt-2 text-sm leading-7 text-[#6b7280]">
                {activeCategory?.risk
                  ? `${activeCategory.risk} tasks need attention. Review high-risk work before adding more tasks here.`
                  : 'This category is stable. Keep progressing active tasks and maintain the current pace.'}
              </p>
              <div className="mt-5 space-y-3">
                {activeCategory?.tasks.slice(0, 4).map((task) => (
                  <div key={task.id} className="rounded-[8px] border border-[#e5e7eb] bg-white p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold text-[#111827]">{task.title}</p>
                      <span className="text-sm font-semibold text-[#374151]">{task.priority}</span>
                    </div>
                    <p className="mt-1 text-sm text-[#6b7280]">{task.status} / Due {task.dueDate}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[8px] border border-[#e5e7eb] bg-white p-4 sm:p-6">
          <div>
            <TaskStatusTable
              rows={statusRows}
              onAdd={handleOpenCreateStatus}
              onEdit={handleOpenEditStatus}
              onDelete={handleDeleteStatus}
            />
          </div>

          <div className="mt-8 border-t border-[#e5e7eb] pt-8">
            <TaskPriorityTable
              rows={priorityRows}
              onAdd={handleOpenCreatePriority}
              onEdit={handleOpenEditPriority}
              onDelete={handleDeletePriority}
            />
          </div>
        </section>
      </PageContainer>
      <EditTaskStatusModal
        isOpen={editStatusModal.isOpen}
        onClose={editStatusModal.closeModal}
        onSubmit={handleSubmitStatus}
        initialValue={editingStatus}
        mode={editingStatus ? 'edit' : 'create'}
      />
      <AddTaskPriorityModal
        isOpen={addPriorityModal.isOpen}
        onClose={addPriorityModal.closeModal}
        onSubmit={handleSubmitPriority}
        initialValue={editingPriority}
        mode={editingPriority ? 'edit' : 'create'}
      />
    </AppLayout>
  );
}
