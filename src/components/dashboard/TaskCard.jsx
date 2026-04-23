import { FiCircle, FiMoreHorizontal } from 'react-icons/fi';

export default function TaskCard({ task }) {
  const tone = task.status === 'Not Started' ? 'text-[#991b1b]' : 'text-[#1f2937]';

  return (
    <article className="rounded-[8px] border border-[#e5e7eb] bg-white p-4 transition hover:border-[#d1d5db] sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <FiCircle size={15} className={`mt-1 ${tone}`} />
          <h3 className="text-wrap-safe text-sm font-semibold leading-6 text-[#111827] sm:text-base sm:leading-7">{task.title}</h3>
        </div>
        <FiMoreHorizontal className="mt-0.5 text-[#9ca3af]" />
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <p className="text-sm leading-6 text-[#6b7280]">{task.description}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#f3f4f6] pt-4 text-xs">
        <span className="text-[#6d7380]">
          Priority: <span className="font-medium text-[#111827]">{task.priority}</span>
        </span>
        <span className="text-[#6d7380]">
          Status: <span className={`font-medium ${tone}`}>{task.status}</span>
        </span>
        <span className="text-[#6b7280]">Created: {task.createdAt?.split('-').reverse().join('/')}</span>
      </div>
    </article>
  );
}
