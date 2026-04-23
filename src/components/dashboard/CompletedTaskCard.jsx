import { FiCircle, FiMoreHorizontal } from 'react-icons/fi';

export default function CompletedTaskCard({ task }) {
  return (
    <article className="rounded-[8px] border border-[#e5e7eb] bg-white p-4 transition hover:border-[#d1d5db]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <FiCircle size={15} className="mt-1 text-[#166534]" />
          <h3 className="text-wrap-safe text-sm font-semibold text-[#111827] sm:text-base">{task.title}</h3>
        </div>
        <FiMoreHorizontal className="mt-0.5 text-[#9ca3af]" />
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <p className="text-sm leading-6 text-[#6b7280]">{task.description}</p>
      </div>

      <div className="mt-4 space-y-2 border-t border-[#f3f4f6] pt-4 text-xs">
        <p className="text-[#6d7380]">
          Status: <span className="font-medium text-[#166534]">Completed</span>
        </p>
        <p className="text-[#6d7380]">Completed 2 days ago.</p>
      </div>
    </article>
  );
}
