import { useState } from 'react';
import { FiImage, FiX } from 'react-icons/fi';

export default function AddTaskModal({ isOpen, onClose, onSubmit }) {
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [imageName, setImageName] = useState('');

  if (!isOpen) return null;

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      setImagePreview('');
      setImageName('');
      return;
    }

    setImageName(file.name);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get('title')?.trim();

    if (!title) {
      setError('Task title is required');
      return;
    }

    try {
      await onSubmit?.({
        title,
        dueDate: formData.get('dueDate'),
        priority: formData.get('priority') || 'Moderate',
        status: 'Not Started',
        description: formData.get('description') || 'New task from dashboard.',
        assignee: formData.get('assignee') || 'Current User',
        category: formData.get('category') || 'General',
        thumbnail: 'meeting',
        imageName,
      });
      setError('');
      setImagePreview('');
      setImageName('');
      onClose?.();
    } catch (requestError) {
      setError(requestError.message || 'Could not create task');
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3 py-4">
      <div className="max-h-[92vh] w-full max-w-[520px] overflow-y-auto rounded-[8px] border border-[#e5e7eb] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.22)]">
        <div className="flex items-start justify-between gap-4 border-b border-[#e5e7eb] px-5 py-4">
          <div>
            <h3 className="text-lg font-semibold text-[#111827]">Add task</h3>
            <p className="mt-1 text-sm text-[#6b7280]">Create a focused task with the essentials.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-[6px] text-[#6b7280] transition hover:bg-[#f3f4f6] hover:text-[#111827]"
            aria-label="Close add task"
          >
            <FiX size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-4 py-4 sm:px-5 sm:py-5">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#374151]">Title</label>
              <input
                name="title"
                placeholder="Task title"
                className="h-11 w-full rounded-[6px] border border-[#d1d5db] bg-white px-3 text-sm outline-none transition placeholder:text-[#9ca3af] focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/10"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#374151]">Due date</label>
                <input
                  name="dueDate"
                  type="date"
                  className="h-11 w-full rounded-[6px] border border-[#d1d5db] bg-white px-3 text-sm outline-none transition focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/10"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#374151]">Priority</label>
                <select
                  name="priority"
                  defaultValue="Moderate"
                  className="h-11 w-full rounded-[6px] border border-[#d1d5db] bg-white px-3 text-sm outline-none transition focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/10"
                >
                  <option value="Extreme">Extreme</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#374151]">Assignee</label>
                <input
                  name="assignee"
                  placeholder="Owner"
                  className="h-11 w-full rounded-[6px] border border-[#d1d5db] bg-white px-3 text-sm outline-none transition placeholder:text-[#9ca3af] focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/10"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#374151]">Category</label>
                <input
                  name="category"
                  placeholder="General"
                  className="h-11 w-full rounded-[6px] border border-[#d1d5db] bg-white px-3 text-sm outline-none transition placeholder:text-[#9ca3af] focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/10"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#374151]">Description</label>
              <textarea
                name="description"
                className="h-24 w-full resize-none rounded-[6px] border border-[#d1d5db] bg-white px-3 py-3 text-sm outline-none transition placeholder:text-[#9ca3af] focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/10"
                placeholder="Short task note"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#374151]">Image</label>
              <label className="flex cursor-pointer items-center gap-3 rounded-[6px] border border-dashed border-[#d1d5db] bg-[#f9fafb] p-3 transition hover:border-[#9ca3af]">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[6px] border border-[#e5e7eb] bg-white text-[#6b7280]">
                  {imagePreview ? (
                    <img className="h-full w-full object-cover" src={imagePreview} alt="" />
                  ) : (
                    <FiImage size={20} />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-[#111827]">
                    {imageName || 'Upload task image'}
                  </span>
                  <span className="mt-1 block text-xs text-[#6b7280]">PNG, JPG, or SVG preview</span>
                </span>
                <span className="rounded-[6px] border border-[#d1d5db] bg-white px-3 py-2 text-xs font-semibold text-[#374151]">
                  Browse
                </span>
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            {error ? (
              <p className="rounded-[6px] border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                {error}
              </p>
            ) : null}
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-[#e5e7eb] pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-[6px] border border-[#d1d5db] px-4 py-2 text-sm font-medium text-[#374151] transition hover:bg-[#f3f4f6]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-[6px] bg-[#111827] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#374151]"
            >
              Add task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
