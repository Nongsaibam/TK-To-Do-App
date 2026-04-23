import { notFound, ok, options } from '../../../../lib/response.js';
import { deleteTask, updateTask } from '../../../../lib/store.js';

export const OPTIONS = options;

export async function PATCH(request, { params }) {
  const { id } = await params;
  const updates = await request.json();
  const task = await updateTask(id, updates);

  if (!task) {
    return notFound('Task not found');
  }

  return ok({ item: task, message: 'Task updated' });
}

export async function DELETE(_request, { params }) {
  const { id } = await params;
  const removed = await deleteTask(id);

  if (!removed) {
    return notFound('Task not found');
  }

  return ok({ item: removed, message: 'Task deleted' });
}
