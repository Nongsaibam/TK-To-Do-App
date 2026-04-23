import { FiCheck, FiClock } from 'react-icons/fi';

const statusColors = {
  Completed: '#15803d',
  'Not Started': '#b91c1c',
  'In Progress': '#1d4ed8',
};

export default function VitalTaskList({ tasks, selectedTaskId, onSelectTask, onStatusChange }) {
  return (
    <section className="overflow-hidden rounded-[8px] border border-[#e5e7eb] bg-white">
      <div className="border-b border-[#e5e7eb] px-4 py-3">
        <h2 className="text-base font-semibold text-[#111827]">Priority Queue</h2>
        <p className="mt-0.5 text-xs text-[#6b7280]">{tasks.length} vital tasks</p>
      </div>

      <div className="max-h-none overflow-visible xl:max-h-[620px] xl:overflow-y-auto">
        {tasks.map((task) => {
          const tone =
            task.status === 'Completed'
              ? 'text-[#15803d]'
              : task.status === 'Not Started'
                ? 'text-[#b91c1c]'
                : 'text-[#1d4ed8]';
          const isSelected = selectedTaskId === task.id;

          return (
            <div
              key={task.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelectTask?.(task.id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onSelectTask?.(task.id);
                }
              }}
              className={`border-b border-[#f3f4f6] px-4 py-3 transition last:border-0 ${
                isSelected ? 'bg-[#f9fafb]' : 'bg-white hover:bg-[#f9fafb]'
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className="mt-1.5 h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: statusColors[task.status] || '#6b7280' }}
                />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-[#111827]">{task.title}</h3>
                  <p className="mt-1 truncate text-xs text-[#6b7280]">{task.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-[6px] border border-[#e5e7eb] bg-white px-2 py-1 font-semibold text-[#374151]">
                      {task.priority}
                    </span>
                    <span className={`rounded-[6px] bg-[#f9fafb] px-2 py-1 font-semibold ${tone}`}>
                      {task.status}
                    </span>
                    <span className="px-1 py-1 text-[#9ca3af]">
                      {task.createdAt?.split('-').reverse().join('/')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                {task.status !== 'In Progress' ? (
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onStatusChange?.(task, 'In Progress');
                    }}
                    className="inline-flex h-8 items-center gap-1.5 rounded-[6px] border border-[#e5e7eb] bg-white px-2.5 text-xs font-medium text-[#374151] hover:border-[#111827]"
                  >
                    <FiClock size={13} />
                    Start
                  </button>
                ) : null}
                {task.status !== 'Completed' ? (
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onStatusChange?.(task, 'Completed');
                    }}
                    className="inline-flex h-8 items-center gap-1.5 rounded-[6px] bg-[#111827] px-2.5 text-xs font-semibold text-white hover:bg-[#1f2937]"
                  >
                    <FiCheck size={13} />
                    Done
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
