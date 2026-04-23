import { useEffect, useState } from 'react';

export default function AddTaskPriorityModal({
  isOpen,
  onClose,
  onSubmit,
  initialValue = '',
  mode = 'create',
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue, isOpen]);

  if (!isOpen) return null;

  const isEdit = mode === 'edit';

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit?.(trimmed);
    onClose?.();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-10">
      <div className="w-full max-w-[460px] rounded-[8px] border border-[#e5e7eb] bg-white p-5 shadow-[0_24px_60px_rgba(15,23,42,0.25)]">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-[#111827]">
              {isEdit ? 'Edit Task Priority' : 'Add Task Priority'}
            </h3>
            <p className="mt-1 text-sm text-[#6b7280]">Create a priority level for your tasks.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-semibold text-[#374151] underline underline-offset-4 hover:text-[#111827]"
          >
            Go Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[8px] border border-[#e5e7eb] bg-[#f9fafb] p-4">
          <label className="mb-2 block text-sm font-semibold text-[#111827]">Task Priority Title</label>
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="High"
            className="h-11 w-full rounded-[6px] border border-[#d1d5db] bg-white px-3 text-sm text-[#111827] outline-none transition focus:border-[#111827]"
          />

          <div className="mt-5 flex flex-wrap justify-end gap-2">
            <button
              type="submit"
              className="h-10 min-w-[104px] rounded-[6px] bg-[#111827] px-4 text-sm font-semibold text-white transition hover:bg-[#1f2937]"
            >
              {isEdit ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="h-10 min-w-[104px] rounded-[6px] border border-[#e5e7eb] bg-white px-4 text-sm font-semibold text-[#374151] transition hover:border-[#111827] hover:text-[#111827]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
