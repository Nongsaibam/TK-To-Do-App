import { buildAIInsights } from './aiInsights';

export function buildCopilotReply(tasks, prompt) {
  const text = prompt.toLowerCase();
  const insights = buildAIInsights(tasks);
  const urgentTasks = tasks.filter((task) => task.priority === 'Extreme');
  const completed = tasks.filter((task) => task.status === 'Completed').length;
  const activeTasks = tasks.filter((task) => task.status !== 'Completed');
  const planTasks = [...activeTasks]
    .sort((left, right) => {
      const priorityRank = { Extreme: 3, High: 2, Moderate: 1, Low: 0 };
      const priorityDiff = (priorityRank[right.priority] || 0) - (priorityRank[left.priority] || 0);
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(left.dueDate).getTime() - new Date(right.dueDate).getTime();
    })
    .slice(0, 3);

  if (text.includes('summary') || text.includes('standup')) {
    return `${insights.standup} Top focus: ${insights.focusTask?.title || 'no urgent task'}. Completion rate is trending better with ${completed} completed tasks.`;
  }

  if (text.includes('plan my day') || text.includes('daily plan')) {
    const plan = planTasks
      .map((task, index) => `${index + 1}. ${task.title} (${task.priority}, ${task.status})`)
      .join(' ');
    return plan
      ? `Here is your day plan: ${plan} Finish with a quick review of blocked or not-started work before adding new tasks.`
      : 'Your day is clear. Use this time for planning, cleanup, or reviewing completed work.';
  }

  if (text.startsWith('focus on')) {
    const requestedTitle = text.replace('focus on', '').trim();
    const task = tasks.find((item) => item.title.toLowerCase().includes(requestedTitle));
    if (task) {
      return `Focus plan for ${task.title}: first confirm the exact outcome, then complete the smallest next step, then update status from ${task.status}. Priority is ${task.priority}, due date is ${task.dueDate}, and owner is ${task.assignee}.`;
    }
  }

  if (text.includes('priority') || text.includes('urgent')) {
    const titles = urgentTasks.slice(0, 3).map((task) => task.title).join(', ');
    return titles
      ? `Your highest-priority items are ${titles}. Start with ${insights.focusTask?.title || urgentTasks[0].title} and move any blocked items into immediate review.`
      : 'You do not have any Extreme priority items right now. Focus on due dates and unblock not-started work.';
  }

  if (text.includes('risk') || text.includes('delay')) {
    return insights.riskTasks.length
      ? `Risk radar detected ${insights.riskTasks.length} tasks that may slip soon: ${insights.riskTasks.slice(0, 4).map((task) => `${task.title} (${task.priority})`).join(', ')}. Review these before starting lower-priority work.`
      : 'Risk radar is clear right now. Maintain momentum on your in-progress items.';
  }

  if (text.includes('team') || text.includes('workload')) {
    return insights.busiestMember
      ? `${insights.busiestMember[0]} currently has the heaviest active workload. Consider redistributing smaller tasks or bundling related items.`
      : 'Workload looks balanced across the team at the moment.';
  }

  if (text.includes('automation') || text.includes('workflow')) {
    return `Suggested automation: auto-create reminders one day before due dates, flag not-started Extreme tasks after noon, and send a morning standup digest to your dashboard.`;
  }

  return `AI Copilot recommends focusing on ${insights.focusTask?.title || 'your next due task'} next. ${insights.suggestions[1]} ${insights.suggestions[2]}`;
}

export function buildQuickActions(tasks) {
  const insights = buildAIInsights(tasks);

  return [
    'Generate standup summary',
    'Show risk tasks',
    'Plan my day',
    `Focus on ${insights.focusTask?.title || 'urgent work'}`,
  ];
}
