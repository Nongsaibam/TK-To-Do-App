import { FiCheck, FiClock, FiEdit2, FiTrash2 } from 'react-icons/fi';

function thumbnailStyles(type) {
  const styles = {
    documents: 'from-[#d9ddd0] via-[#ecefe7] to-[#bcc9d6]',
    assignments: 'from-[#dbe6df] via-[#9eb8b4] to-[#5e7783]',
  };

  return styles[type] || 'from-[#f5a35c] to-[#1f2b45]';
}

export default function MyTaskDetailsPanel({ task, onStatusChange, onDelete, onEdit }) {
  if (!task) {
    return (
      <section className="rounded-[8px] border border-[#e5e7eb] bg-white p-6 text-sm text-[#6b7280]">
        Select a task to view details.
      </section>
    );
  }

  return (
    <section className="flex max-h-none min-h-0 flex-col rounded-[8px] border border-[#e5e7eb] bg-white xl:sticky xl:top-4 xl:max-h-[760px] xl:min-h-[560px]">
      <div className="border-b border-[#e5e7eb] p-5">
        <p className="text-xs font-semibold uppercase text-[#6b7280]">Selected Task</p>
        <h3 className="mt-2 text-xl font-semibold leading-7 text-[#111827]">{task.title}</h3>
      </div>

      <div className="flex flex-col gap-3 border-b border-[#e5e7eb] p-4 sm:flex-row sm:items-start sm:p-5">
        <div className={`relative h-20 w-20 shrink-0 rounded-[8px] bg-gradient-to-br ${thumbnailStyles(task.thumbnail)}`}>
          <span
            className="absolute right-2 top-2 h-4 w-4 rounded-full border-2 border-white"
            style={{ backgroundColor: task.dotColor || '#111827' }}
          />
        </div>
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

      <div className="flex-1 space-y-4 overflow-y-visible p-4 text-sm leading-7 text-[#6b7280] xl:overflow-y-auto xl:p-5">
        <p>
          <span className="block font-semibold text-[#111827]">Task Title</span>
          {task.category === 'Admin' ? 'Document Submission.' : task.title}
        </p>
        {task.objective ? (
          <p>
            <span className="block font-semibold text-[#111827]">Objective</span>
            {task.objective}
          </p>
        ) : null}
        <p>
          <span className="block font-semibold text-[#111827]">Task Description</span>
          {task.details || task.description}
        </p>

        {task.notes?.length ? (
          <div>
            <p className="font-semibold text-[#111827]">Additional Notes:</p>
            <ul className="list-disc space-y-1 pl-6">
              {task.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {task.deadlineNote ? (
          <p>
            <span className="block font-semibold text-[#111827]">Deadline for Submission</span>
            {task.deadlineNote}
          </p>
        ) : null}
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
