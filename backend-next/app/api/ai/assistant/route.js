import { badRequest, ok, options } from '../../../../lib/response.js';
import { listTasks } from '../../../../lib/store.js';

export const OPTIONS = options;

function buildReply(prompt, tasks) {
  const text = prompt.toLowerCase();
  const urgent = tasks.filter((task) => task.priority === 'Extreme');
  const nextTask = urgent[0] || tasks[0];

  if (text.includes('summary')) {
    return `You have ${tasks.length} tasks in the system. Focus next on ${nextTask.title}.`;
  }

  if (text.includes('voice')) {
    return 'Voice workflow suggestion: capture speech, convert to command intent, then update tasks or return AI guidance.';
  }

  if (text.includes('automation')) {
    return 'Automation suggestion: combine reminders, risk detection, and standup generation into one morning AI pipeline.';
  }

  return `AI backend suggests prioritizing ${nextTask.title} and watching overdue or not-started items.`;
}

export async function POST(request) {
  const body = await request.json();
  const { prompt } = body;

  if (!prompt) {
    return badRequest('Prompt is required');
  }

  return ok({
    prompt,
    answer: buildReply(prompt, await listTasks()),
    model: 'mock-next-ai-engine',
  });
}
