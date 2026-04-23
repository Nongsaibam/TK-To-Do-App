import { useContext, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiAlertTriangle, FiCheckCircle, FiClock, FiSearch } from 'react-icons/fi';
import AppLayout from '../../components/layout/AppLayout';
import PageContainer from '../../components/layout/PageContainer';
import MyTaskList from '../../components/tasks/MyTaskList';
import MyTaskDetailsPanel from '../../components/tasks/MyTaskDetailsPanel';
import { TaskContext } from '../../context/TaskContext';

export default function MyTasksPage() {
  const { tasks, updateTask, removeTask } = useContext(TaskContext);
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [selectedTaskId, setSelectedTaskId] = useState(() => Number(searchParams.get('task')) || null);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const nextSearch = searchParams.get('search') || '';
    const nextTask = Number(searchParams.get('task')) || null;
    setQuery(nextSearch);
    if (nextTask) setSelectedTaskId(nextTask);
  }, [searchParams]);

  const myTasks = useMemo(
    () =>
      tasks.filter((task) => {
        const searchText = `${task.title} ${task.description} ${task.category} ${task.priority} ${task.status}`.toLowerCase();
        const matchesQuery = searchText.includes(query.toLowerCase());
        const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
        const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
        return matchesQuery && matchesStatus && matchesPriority;
      }),
    [priorityFilter, query, statusFilter, tasks]
  );

  const selectedTask = myTasks.find((task) => task.id === selectedTaskId) || myTasks[0] || tasks[0];
  const activeCount = tasks.filter((task) => task.status !== 'Completed').length;
  const completedCount = tasks.filter((task) => task.status === 'Completed').length;
  const urgentCount = tasks.filter((task) => task.priority === 'Extreme').length;

  async function handleStatusChange(task, status) {
    await updateTask(task.id, { status });
  }

  async function handleDeleteTask(task) {
    await removeTask(task.id);
    setSelectedTaskId((current) => (current === task.id ? null : current));
  }

  function handleOpenEdit(task) {
    setEditingTask(task);
  }

  async function handleSubmitEdit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await updateTask(editingTask.id, {
      title: formData.get('title'),
      description: formData.get('description'),
      priority: formData.get('priority'),
      status: formData.get('status'),
      dueDate: formData.get('dueDate'),
      category: formData.get('category'),
    });
    setEditingTask(null);
  }

  return (
    <AppLayout>
      <PageContainer className="space-y-4 pt-2">
        <section className="rounded-[8px] border border-[#e5e7eb] bg-white p-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-[#111827]">My Tasks</h1>
              <p className="mt-1 text-sm text-[#6b7280]">Review, filter, and update your current work.</p>
            </div>
            <div className="grid w-full grid-cols-1 gap-2 text-sm sm:w-auto sm:grid-cols-3">
              <div className="rounded-[8px] border border-[#e5e7eb] px-3 py-2">
                <div className="flex items-center gap-2 text-[#6b7280]"><FiClock /> Active</div>
                <p className="mt-1 text-lg font-semibold text-[#111827]">{activeCount}</p>
              </div>
              <div className="rounded-[8px] border border-[#e5e7eb] px-3 py-2">
                <div className="flex items-center gap-2 text-[#6b7280]"><FiCheckCircle /> Done</div>
                <p className="mt-1 text-lg font-semibold text-[#111827]">{completedCount}</p>
              </div>
              <div className="rounded-[8px] border border-[#e5e7eb] px-3 py-2">
                <div className="flex items-center gap-2 text-[#6b7280]"><FiAlertTriangle /> Urgent</div>
                <p className="mt-1 text-lg font-semibold text-[#111827]">{urgentCount}</p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_170px_170px]">
            <label className="relative block">
              <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search tasks, category, priority..."
                className="h-11 w-full rounded-[6px] border border-[#d1d5db] bg-white pl-10 pr-3 text-sm outline-none transition focus:border-[#111827]"
              />
            </label>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="h-11 rounded-[6px] border border-[#d1d5db] bg-white px-3 text-sm outline-none transition focus:border-[#111827]"
            >
              <option>All</option>
              <option>Completed</option>
              <option>In Progress</option>
              <option>Not Started</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(event) => setPriorityFilter(event.target.value)}
              className="h-11 rounded-[6px] border border-[#d1d5db] bg-white px-3 text-sm outline-none transition focus:border-[#111827]"
            >
              <option>All</option>
              <option>Extreme</option>
              <option>Moderate</option>
              <option>Low</option>
            </select>
          </div>
        </section>

        <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <MyTaskList
            tasks={myTasks}
            selectedTaskId={selectedTask?.id}
            onSelectTask={setSelectedTaskId}
            onStatusChange={handleStatusChange}
          />
          <MyTaskDetailsPanel
            task={selectedTask}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
            onEdit={handleOpenEdit}
          />
        </div>
      </PageContainer>

      {editingTask ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-3 py-4">
          <form
            onSubmit={handleSubmitEdit}
            className="max-h-[92vh] w-full max-w-[520px] overflow-y-auto rounded-[8px] border border-[#e5e7eb] bg-white p-4 shadow-[0_24px_60px_rgba(15,23,42,0.25)] sm:p-5"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-[#111827]">Edit Task</h2>
                <p className="mt-1 text-sm text-[#6b7280]">Update the selected task details.</p>
              </div>
              <button
                type="button"
                onClick={() => setEditingTask(null)}
                className="text-sm font-semibold text-[#374151] underline underline-offset-4"
              >
                Close
              </button>
            </div>

            <div className="space-y-3">
              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-[#374151]">Title</span>
                <input name="title" defaultValue={editingTask.title} className="h-10 w-full rounded-[6px] border border-[#d1d5db] px-3 text-sm outline-none focus:border-[#111827]" />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-[#374151]">Description</span>
                <textarea name="description" defaultValue={editingTask.description} rows={3} className="w-full rounded-[6px] border border-[#d1d5db] px-3 py-2 text-sm outline-none focus:border-[#111827]" />
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-[#374151]">Priority</span>
                  <select name="priority" defaultValue={editingTask.priority} className="h-10 w-full rounded-[6px] border border-[#d1d5db] px-3 text-sm outline-none focus:border-[#111827]">
                    <option>Extreme</option>
                    <option>Moderate</option>
                    <option>Low</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-[#374151]">Status</span>
                  <select name="status" defaultValue={editingTask.status} className="h-10 w-full rounded-[6px] border border-[#d1d5db] px-3 text-sm outline-none focus:border-[#111827]">
                    <option>Not Started</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </label>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-[#374151]">Due Date</span>
                  <input name="dueDate" type="date" defaultValue={editingTask.dueDate} className="h-10 w-full rounded-[6px] border border-[#d1d5db] px-3 text-sm outline-none focus:border-[#111827]" />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-[#374151]">Category</span>
                  <input name="category" defaultValue={editingTask.category} className="h-10 w-full rounded-[6px] border border-[#d1d5db] px-3 text-sm outline-none focus:border-[#111827]" />
                </label>
              </div>
            </div>

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setEditingTask(null)} className="h-10 rounded-[6px] border border-[#e5e7eb] px-4 text-sm font-semibold text-[#374151]">Cancel</button>
              <button type="submit" className="h-10 rounded-[6px] bg-[#111827] px-4 text-sm font-semibold text-white">Save Changes</button>
            </div>
          </form>
        </div>
      ) : null}
    </AppLayout>
  );
}
