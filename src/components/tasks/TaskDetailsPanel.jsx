import { FiCheck, FiCheckCircle, FiClock, FiEdit2, FiTrash2 } from 'react-icons/fi';

function thumbnailStyles(type) {
  const styles = {
    dog: 'from-[#d39b57] via-[#8d4d23] to-[#3c2b24]',
    care: 'from-[#cfd7e6] via-[#8ea5c7] to-[#eaeef5]',
    meeting: 'from-[#d7b491] via-[#8e5b40] to-[#283147]',
  };

  return styles[type] || 'from-[#f5a35c] to-[#1f2b45]';
}

export default function TaskDetailsPanel({ task, onStatusChange, onToggleChecklist, onDelete, onEdit }) {
  const items = task.checklist || [];
  const progress = items.length ? Math.round(((task.completedChecklist?.length || 0) / items.length) * 100) : 0;
  const completedChecklist = task.completedChecklist || [];

  return (
    <section className="flex max-h-none min-h-0 flex-col overflow-hidden rounded-[8px] border border-[#e5e7eb] bg-white xl:sticky xl:top-4 xl:max-h-[720px] xl:min-h-[520px]">
      <div className="border-b border-[#e5e7eb] bg-[#f9fafb] p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase text-[#6b7280]">Selected Vital Task</p>
            <h3 className="mt-2 text-xl font-semibold leading-7 text-[#111827]">{task.title}</h3>
          </div>
          <span className="rounded-[6px] bg-[#111827] px-2.5 py-1 text-xs font-semibold text-white">
            {progress}% done
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-b border-[#e5e7eb] p-4 sm:flex-row sm:items-start sm:p-5">
        <div className={`h-20 w-20 shrink-0 rounded-[8px] bg-gradient-to-br ${thumbnailStyles(task.thumbnail)}`} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-[6px] border border-[#e5e7eb] bg-[#f9fafb] px-2 py-1 text-[#374151]">
              Priority: <span className="font-semibold">{task.priority}</span>
            </span>
            <span className="rounded-[6px] border border-[#e5e7eb] bg-[#f9fafb] px-2 py-1 text-[#374151]">
              Status: <span className="font-semibold">{task.status}</span>
            </span>
            <span className="rounded-[6px] border border-[#e5e7eb] bg-[#f9fafb] px-2 py-1 text-[#6b7280]">
              {task.createdAt?.split('-').reverse().join('/')}
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-[#6b7280]">{task.description}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-[#e5e7eb] p-5">
        <button
          type="button"
          onClick={() => onStatusChange?.(task, 'In Progress')}
          disabled={task.status === 'In Progress'}
          className="inline-flex h-9 items-center gap-2 rounded-[6px] border border-[#e5e7eb] bg-white px-3 text-sm font-medium text-[#374151] transition hover:border-[#111827] disabled:cursor-not-allowed disabled:opacity-45"
        >
          <FiClock size={14} />
          In Progress
        </button>
        <button
          type="button"
          onClick={() => onStatusChange?.(task, 'Completed')}
          disabled={task.status === 'Completed'}
          className="inline-flex h-9 items-center gap-2 rounded-[6px] bg-[#111827] px-3 text-sm font-semibold text-white transition hover:bg-[#1f2937] disabled:cursor-not-allowed disabled:opacity-45"
        >
          <FiCheck size={14} />
          Complete
        </button>
      </div>

      <div className="flex-1 overflow-y-visible p-4 xl:overflow-y-auto xl:p-5">
        <div className="rounded-[8px] border border-[#e5e7eb] bg-[#f9fafb] p-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-[#111827]">Checklist Progress</p>
            <span className="text-sm font-semibold text-[#374151]">{progress}%</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e5e7eb]">
            <div className="h-full rounded-full bg-[#111827]" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="mt-4 space-y-4 text-sm leading-7 text-[#6b7280]">
          <p>{task.details}</p>

          {items.length ? (
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => onToggleChecklist?.(task, item)}
                    className={`flex w-full items-start gap-3 rounded-[8px] border px-3 py-2 text-left transition ${
                      completedChecklist.includes(item)
                        ? 'border-[#bbf7d0] bg-[#f0fdf4] text-[#166534]'
                        : 'border-[#e5e7eb] bg-white text-[#6b7280] hover:border-[#111827]'
                    }`}
                  >
                    {completedChecklist.includes(item) ? (
                      <FiCheckCircle className="mt-1 shrink-0" />
                    ) : (
                      <span className="mt-1.5 h-3 w-3 shrink-0 rounded-full border border-[#9ca3af]" />
                    )}
                    <span>{item}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t border-[#e5e7eb] p-4">
        <button
          type="button"
          onClick={() => onDelete?.(task)}
          className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-[#fee2e2] bg-[#fef2f2] text-[#b91c1c]"
          title="Delete task"
        >
          <FiTrash2 size={14} />
        </button>
        <button
          type="button"
          onClick={() => onEdit?.(task)}
          className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-[#111827] text-white"
          title="Edit task"
        >
          <FiEdit2 size={14} />
        </button>
      </div>
    </section>
  );
}
