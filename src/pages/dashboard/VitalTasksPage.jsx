import { useContext, useMemo, useState } from 'react';
import { FiAlertTriangle, FiCheckCircle, FiClock } from 'react-icons/fi';
import AppLayout from '../../components/layout/AppLayout';
import PageContainer from '../../components/layout/PageContainer';
import VitalTaskList from '../../components/tasks/VitalTaskList';
import TaskDetailsPanel from '../../components/tasks/TaskDetailsPanel';
import { TaskContext } from '../../context/TaskContext';

export default function VitalTasksPage() {
  const { tasks, updateTask, removeTask } = useContext(TaskContext);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const vitalTasks = useMemo(
    () => tasks.filter((task) => task.priority === 'Extreme' || task.title === 'Take grandma to hospital'),
    [tasks]
  );
  const featuredTask = vitalTasks.find((task) => task.id === selectedTaskId) || vitalTasks[0] || tasks[0];
  const openVital = vitalTasks.filter((task) => task.status !== 'Completed').length;
  const extremeCount = vitalTasks.filter((task) => task.priority === 'Extreme').length;
  const completedVital = vitalTasks.filter((task) => task.status === 'Completed').length;

  async function handleStatusChange(task, status) {
    await updateTask(task.id, { status });
  }

  async function handleToggleChecklist(task, item) {
    const completed = task.completedChecklist || [];
    const nextCompleted = completed.includes(item)
      ? completed.filter((entry) => entry !== item)
      : [...completed, item];
    await updateTask(task.id, { completedChecklist: nextCompleted });
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
      details: formData.get('details'),
      priority: formData.get('priority'),
      status: formData.get('status'),
      dueDate: formData.get('dueDate'),
    });
    setEditingTask(null);
  }

  return (
    <AppLayout>
      <PageContainer className="space-y-4 pt-2">
        <section className="rounded-[8px] border border-[#e5e7eb] bg-white p-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-[#111827]">Vital Tasks</h1>
              <p className="mt-1 text-sm text-[#6b7280]">Focus on urgent and high-impact work first.</p>
            </div>
            <div className="grid w-full grid-cols-1 gap-2 text-sm sm:w-auto sm:grid-cols-3">
              <div className="rounded-[8px] border border-[#e5e7eb] px-3 py-2">
                <div className="flex items-center gap-2 text-[#6b7280]"><FiClock /> Open</div>
                <p className="mt-1 text-lg font-semibold text-[#111827]">{openVital}</p>
              </div>
              <div className="rounded-[8px] border border-[#e5e7eb] px-3 py-2">
                <div className="flex items-center gap-2 text-[#6b7280]"><FiAlertTriangle /> Extreme</div>
                <p className="mt-1 text-lg font-semibold text-[#111827]">{extremeCount}</p>
              </div>
              <div className="rounded-[8px] border border-[#e5e7eb] px-3 py-2">
                <div className="flex items-center gap-2 text-[#6b7280]"><FiCheckCircle /> Done</div>
                <p className="mt-1 text-lg font-semibold text-[#111827]">{completedVital}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
          <VitalTaskList
            tasks={vitalTasks}
            selectedTaskId={featuredTask?.id}
            onSelectTask={setSelectedTaskId}
            onStatusChange={handleStatusChange}
          />
          <TaskDetailsPanel
            task={featuredTask}
            onStatusChange={handleStatusChange}
            onToggleChecklist={handleToggleChecklist}
            onDelete={handleDeleteTask}
            onEdit={handleOpenEdit}
          />
        </div>
      </PageContainer>

      {editingTask ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-3 py-4">
          <form
            onSubmit={handleSubmitEdit}
            className="max-h-[92vh] w-full max-w-[560px] overflow-y-auto rounded-[8px] border border-[#e5e7eb] bg-white p-4 shadow-[0_24px_60px_rgba(15,23,42,0.25)] sm:p-5"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-[#111827]">Edit Vital Task</h2>
                <p className="mt-1 text-sm text-[#6b7280]">Update the selected priority task.</p>
              </div>
              <button type="button" onClick={() => setEditingTask(null)} className="text-sm font-semibold text-[#374151] underline underline-offset-4">
                Close
              </button>
            </div>

            <div className="space-y-3">
              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-[#374151]">Title</span>
                <input name="title" defaultValue={editingTask.title} className="h-10 w-full rounded-[6px] border border-[#d1d5db] px-3 text-sm outline-none focus:border-[#111827]" />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-[#374151]">Short Description</span>
                <textarea name="description" defaultValue={editingTask.description} rows={2} className="w-full rounded-[6px] border border-[#d1d5db] px-3 py-2 text-sm outline-none focus:border-[#111827]" />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-[#374151]">Details</span>
                <textarea name="details" defaultValue={editingTask.details} rows={3} className="w-full rounded-[6px] border border-[#d1d5db] px-3 py-2 text-sm outline-none focus:border-[#111827]" />
              </label>
              <div className="grid gap-3 sm:grid-cols-3">
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
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-[#374151]">Due Date</span>
                  <input name="dueDate" type="date" defaultValue={editingTask.dueDate} className="h-10 w-full rounded-[6px] border border-[#d1d5db] px-3 text-sm outline-none focus:border-[#111827]" />
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
