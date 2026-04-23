import { badRequest, ok, options } from '../../../lib/response.js';
import { createTask, listTasks } from '../../../lib/store.js';

export const OPTIONS = options;

export async function GET() {
  const tasks = await listTasks();
  return ok({ items: tasks, total: tasks.length });
}

export async function POST(request) {
  const body = await request.json();

  if (!body.title) {
    return badRequest('Task title is required');
  }

  const task = await createTask(body);

  return ok({ item: task, message: 'Task created' });
}
