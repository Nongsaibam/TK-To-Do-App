import { FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';

function ActionButtons({ row, onEdit, onDelete }) {
  return (
    <div className="flex flex-wrap justify-end gap-2">
      <button
        type="button"
        onClick={() => onEdit?.(row)}
        className="inline-flex h-9 items-center justify-center gap-2 rounded-[6px] border border-[#e5e7eb] bg-white px-3 text-sm font-medium text-[#374151] transition hover:border-[#111827] hover:text-[#111827]"
      >
        <FiEdit2 size={15} />
        Edit
      </button>
      <button
        type="button"
        onClick={() => onDelete?.(row)}
        className="inline-flex h-9 items-center justify-center gap-2 rounded-[6px] border border-[#fee2e2] bg-[#fef2f2] px-3 text-sm font-medium text-[#b91c1c] transition hover:border-[#b91c1c]"
      >
        <FiTrash2 size={15} />
        Delete
      </button>
    </div>
  );
}

export default function TaskPriorityTable({ rows, onAdd, onEdit, onDelete }) {
  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-[#111827]">Task Priority</h3>
          <p className="mt-1 text-sm text-[#6b7280]">Manage urgency levels available for tasks.</p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex h-10 items-center gap-2 rounded-[6px] bg-[#111827] px-4 text-sm font-semibold text-white transition hover:bg-[#1f2937]"
        >
          <FiPlus />
          Add New Priority
        </button>
      </div>

      <div className="responsive-table rounded-[8px] border border-[#e5e7eb] bg-white">
        <table className="min-w-full border-collapse text-left text-sm text-[#111827]">
          <thead className="bg-[#f9fafb] text-xs font-semibold uppercase text-[#6b7280]">
            <tr className="border-b border-[#e5e7eb]">
              <th className="w-20 px-4 py-3">SN</th>
              <th className="px-4 py-3">Task Priority</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row} className="border-b border-[#f3f4f6] last:border-0">
                <td className="px-4 py-4 text-[#6b7280]">{index + 1}</td>
                <td className="px-4 py-4">
                  <span className="inline-flex rounded-[6px] border border-[#e5e7eb] bg-[#f9fafb] px-3 py-1.5 font-semibold text-[#374151]">
                    {row}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <ActionButtons row={row} onEdit={onEdit} onDelete={onDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
