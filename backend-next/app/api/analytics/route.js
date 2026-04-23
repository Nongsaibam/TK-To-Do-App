import { ok, options } from '../../../lib/response.js';
import { listTasks } from '../../../lib/store.js';

export const OPTIONS = options;

export async function GET() {
  const tasks = await listTasks();
  const total = tasks.length;
  const completed = tasks.filter((task) => task.status === 'Completed').length;
  const inProgress = tasks.filter((task) => task.status === 'In Progress').length;
  const notStarted = tasks.filter((task) => task.status === 'Not Started').length;
  const urgent = tasks.filter((task) => task.priority === 'Extreme').length;

  return ok({
    total,
    completed,
    inProgress,
    notStarted,
    urgent,
    completionRate: total ? Math.round((completed / total) * 100) : 0,
    insights: [
      'Extreme priority tasks should trigger early reminders.',
      'Voice command workflows can speed up task updates.',
      'Use AI summaries for daily standups and reviews.',
    ],
  });
}
