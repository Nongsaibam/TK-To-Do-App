import { FiCheck, FiClock } from 'react-icons/fi';

const statusColors = {
  Completed: '#15803d',
  'Not Started': '#b91c1c',
  'In Progress': '#1d4ed8',
};

export default function MyTaskList({ tasks, selectedTaskId, onSelectTask, onStatusChange }) {
  return (
    <section className="overflow-hidden rounded-[8px] border border-[#e5e7eb] bg-white">
      <div className="flex items-center justify-between border-b border-[#e5e7eb] px-4 py-3">
        <div>
          <h2 className="text-base font-semibold text-[#111827]">Tasks</h2>
          <p className="mt-0.5 text-xs text-[#6b7280]">{tasks.length} matching items</p>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_110px_110px_120px] border-b border-[#e5e7eb] bg-[#f9fafb] px-4 py-2 text-xs font-semibold uppercase text-[#6b7280] max-md:hidden">
        <span>Task</span>
        <span>Priority</span>
        <span>Status</span>
        <span className="text-right">Action</span>
      </div>

      <div className="max-h-none overflow-visible xl:max-h-[640px] xl:overflow-y-auto">
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
              className={`grid w-full gap-3 border-b border-[#f3f4f6] px-4 py-3 text-left transition last:border-0 md:grid-cols-[1fr_110px_110px_120px] md:items-center ${
                isSelected ? 'bg-[#f9fafb]' : 'bg-white hover:bg-[#f9fafb]'
              }`}
            >
              <div className="flex min-w-0 items-start gap-3">
                <span
                  className="mt-1.5 h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: task.dotColor || statusColors[task.status] || '#6b7280' }}
                />
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-[#111827]">{task.title}</h3>
                  <p className="mt-1 truncate text-xs text-[#6b7280]">{task.description}</p>
                  <p className="mt-1 text-xs text-[#9ca3af]">Created {task.createdAt?.split('-').reverse().join('/')}</p>
                </div>
              </div>

              <span className="w-fit rounded-[6px] border border-[#e5e7eb] bg-white px-2.5 py-1 text-xs font-semibold text-[#374151]">
                {task.priority}
              </span>

              <span className={`w-fit rounded-[6px] bg-[#f9fafb] px-2.5 py-1 text-xs font-semibold ${tone}`}>
                {task.status}
              </span>

              <div className="flex justify-start gap-2 md:justify-end">
                {task.status !== 'In Progress' ? (
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(event) => {
                      event.stopPropagation();
                      onStatusChange?.(task, 'In Progress');
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        event.stopPropagation();
                        onStatusChange?.(task, 'In Progress');
                      }
                    }}
                    className="inline-flex h-8 items-center gap-1.5 rounded-[6px] border border-[#e5e7eb] bg-white px-2.5 text-xs font-medium text-[#374151] hover:border-[#111827]"
                  >
                    <FiClock size={13} />
                    Start
                  </span>
                ) : null}
                {task.status !== 'Completed' ? (
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(event) => {
                      event.stopPropagation();
                      onStatusChange?.(task, 'Completed');
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        event.stopPropagation();
                        onStatusChange?.(task, 'Completed');
                      }
                    }}
                    className="inline-flex h-8 items-center gap-1.5 rounded-[6px] bg-[#111827] px-2.5 text-xs font-semibold text-white hover:bg-[#1f2937]"
                  >
                    <FiCheck size={13} />
                    Done
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
        {!tasks.length ? (
          <div className="m-4 rounded-[8px] border border-dashed border-[#d1d5db] bg-[#f9fafb] p-8 text-center text-sm text-[#6b7280]">
            No tasks match this filter.
          </div>
        ) : null}
      </div>
    </section>
  );
}
