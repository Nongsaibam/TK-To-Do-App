import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import seedTasks from '../data/tasks';
import { taskApi } from '../services/api';

export const TaskContext = createContext(null);
const STORAGE_KEY = 'modern-taskflow-tasks';

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : seedTasks;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [taskError, setTaskError] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const refreshTasks = useCallback(async () => {
    setIsLoading(true);
    setTaskError('');
    try {
      const data = await taskApi.list();
      setTasks(data.items);
    } catch (error) {
      setTaskError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]);

  const analytics = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.status === 'Completed').length;
    const inProgress = tasks.filter((task) => task.status === 'In Progress').length;
    const notStarted = tasks.filter((task) => task.status === 'Not Started').length;
    const urgent = tasks.filter((task) => task.priority === 'Extreme').length;

    return {
      total,
      completed,
      inProgress,
      notStarted,
      urgent,
      completionRate: total ? Math.round((completed / total) * 100) : 0,
    };
  }, [tasks]);

  const value = useMemo(
    () => ({
      tasks,
      analytics,
      isLoading,
      taskError,
      refreshTasks,
      addTask: async (task) => {
        const data = await taskApi.create(task);
        setTasks((current) => [data.item, ...current]);
        return data.item;
      },
      updateTask: async (id, updates) => {
        try {
          const data = await taskApi.update(id, updates);
          setTasks((current) =>
            current.map((task) => (task.id === id ? data.item : task))
          );
          return data.item;
        } catch {
          const fallbackItem = tasks.find((task) => task.id === id);
          const updatedItem = fallbackItem ? { ...fallbackItem, ...updates } : null;
          setTasks((current) =>
            current.map((task) => (task.id === id ? { ...task, ...updates } : task))
          );
          return updatedItem;
        }
      },
      removeTask: async (id) => {
        try {
          await taskApi.remove(id);
        } catch {
          // Keep the page usable when the backend is not running.
        }
        setTasks((current) => current.filter((task) => task.id !== id));
      },
      resetTasks: () => setTasks(seedTasks),
    }),
    [analytics, isLoading, refreshTasks, taskError, tasks]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
