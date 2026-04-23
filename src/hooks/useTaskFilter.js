import { useMemo, useState } from 'react';

export default function useTaskFilter(tasks, initialStatus = 'All') {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(initialStatus);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesQuery = task.title.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === 'All' || task.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status, tasks]);

  return { query, setQuery, status, setStatus, filteredTasks };
}
