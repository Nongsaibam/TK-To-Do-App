function priorityWeight(priority) {
  if (priority === 'Extreme') return 3;
  if (priority === 'High') return 2;
  if (priority === 'Moderate') return 1;
  return 0;
}

function daysUntil(dateString) {
  const today = new Date();
  const date = new Date(dateString);
  const diff = date.getTime() - today.getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

export function buildAIInsights(tasks) {
  const activeTasks = tasks.filter((task) => task.status !== 'Completed');
  const completedTasks = tasks.filter((task) => task.status === 'Completed');

  const focusTask =
    [...activeTasks].sort((left, right) => {
      const priorityDiff = priorityWeight(right.priority) - priorityWeight(left.priority);
      if (priorityDiff !== 0) return priorityDiff;
      return daysUntil(left.dueDate) - daysUntil(right.dueDate);
    })[0] || null;

  const riskTasks = activeTasks.filter((task) => {
    const dueIn = daysUntil(task.dueDate);
    return task.priority === 'Extreme' || task.status === 'Not Started' || dueIn <= 1;
  });

  const workload = activeTasks.reduce((acc, task) => {
    acc[task.assignee] = (acc[task.assignee] || 0) + 1;
    return acc;
  }, {});

  const busiestMember =
    Object.entries(workload).sort((left, right) => right[1] - left[1])[0] || null;

  const suggestions = [
    focusTask
      ? `Prioritize "${focusTask.title}" first because it combines urgency and high impact.`
      : 'You are clear on urgent work right now.',
    riskTasks.length
      ? `${riskTasks.length} task${riskTasks.length > 1 ? 's are' : ' is'} at risk and should be reviewed today.`
      : 'No immediate blockers detected from the current task list.',
    busiestMember
      ? `${busiestMember[0]} currently carries the heaviest active workload with ${busiestMember[1]} tasks.`
      : 'Team workload is evenly distributed.',
  ];

  const standup = `Today you have ${activeTasks.length} active task${
    activeTasks.length !== 1 ? 's' : ''
  }, ${completedTasks.length} completed, and ${
    riskTasks.length
  } needing attention.`;

  return {
    focusTask,
    riskTasks,
    busiestMember,
    standup,
    suggestions,
    automationScore: Math.min(98, 68 + activeTasks.length * 3),
  };
}
