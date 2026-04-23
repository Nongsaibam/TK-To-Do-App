import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiArrowLeft,
  FiBell,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiSearch,
  FiX,
} from 'react-icons/fi';
import { TaskContext } from '../../context/TaskContext';
import routePaths from '../../routes/routePaths';

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseTaskDate(value) {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function daysBetween(left, right) {
  return Math.round((startOfDay(left).getTime() - startOfDay(right).getTime()) / 86400000);
}

function buildNotifications(tasks, today) {
  const priorityWeight = { Extreme: 3, High: 2, Moderate: 1, Low: 0 };

  return tasks
    .filter((task) => task.status !== 'Completed')
    .map((task) => {
      const dueDate = parseTaskDate(task.dueDate);
      const diff = dueDate ? daysBetween(dueDate, today) : 999;
      let label = 'No due date';
      let tone = 'text-[#6b7280]';

      if (diff < 0) {
        label = `${Math.abs(diff)} day${Math.abs(diff) === 1 ? '' : 's'} overdue`;
        tone = 'text-[#991b1b]';
      } else if (diff === 0) {
        label = 'Due today';
        tone = 'text-[#111827]';
      } else if (diff === 1) {
        label = 'Due tomorrow';
      } else if (diff < 7) {
        label = `Due in ${diff} days`;
      } else if (dueDate) {
        label = dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }

      return {
        ...task,
        diff,
        label,
        tone,
        weight: priorityWeight[task.priority] ?? 0,
      };
    })
    .sort((left, right) => left.diff - right.diff || right.weight - left.weight)
    .slice(0, 8);
}

function buildCalendarDays(monthDate) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const mondayOffset = (firstDay.getDay() + 6) % 7;
  const days = [];

  for (let index = 0; index < mondayOffset; index += 1) {
    days.push(null);
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    days.push(new Date(year, month, day));
  }

  while (days.length % 7 !== 0) {
    days.push(null);
  }

  return days;
}

function NotificationPanel({ notifications, onClose }) {
  return (
    <div className="absolute left-3 right-3 top-full z-40 mt-2 overflow-hidden rounded-[8px] border border-[#e5e7eb] bg-white shadow-[0_20px_50px_rgba(15,23,42,0.16)] sm:left-auto sm:right-16 sm:w-[390px]">
      <div className="flex items-start justify-between px-4 pb-3 pt-4 sm:px-6 sm:pt-5">
        <div>
          <h3 className="text-xl font-semibold text-[#111827]">Notifications</h3>
          <p className="mt-1 text-sm text-[#6b7280]">Open task alerts</p>
        </div>
        <button type="button" onClick={onClose} className="text-[#6b7280] hover:text-[#111827]">
          <FiArrowLeft size={24} />
        </button>
      </div>

      <div className="max-h-[70vh] overflow-y-auto bg-[#f9fafb] px-4 py-4 sm:max-h-[420px] sm:px-6">
        {notifications.length ? (
          <div className="space-y-3">
            {notifications.map((item) => (
              <article key={item.id} className="rounded-[6px] border border-[#e5e7eb] bg-white p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#111827]">{item.title}</p>
                    <p className="mt-1 text-xs leading-5 text-[#6b7280]">
                      {item.status} / {item.assignee || 'Unassigned'}
                    </p>
                  </div>
                  <span className={`shrink-0 text-xs font-semibold ${item.tone}`}>{item.label}</span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-[#f3f4f6] pt-3 text-xs text-[#6b7280]">
                  <span>Priority: <span className="font-medium text-[#111827]">{item.priority}</span></span>
                  <span>{item.dueDate || 'No date'}</span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[6px] border border-[#e5e7eb] bg-white p-5 text-sm text-[#6b7280]">
            No open task alerts right now.
          </div>
        )}
      </div>
    </div>
  );
}

function CalendarPanel({ monthDate, selectedDate, tasks, onClose, onMonthChange, onSelectDate }) {
  const days = useMemo(() => buildCalendarDays(monthDate), [monthDate]);
  const taskDateCounts = useMemo(() => {
    return tasks.reduce((counts, task) => {
      if (!task.dueDate) return counts;
      counts[task.dueDate] = (counts[task.dueDate] || 0) + 1;
      return counts;
    }, {});
  }, [tasks]);
  const selectedKey = formatDateKey(selectedDate);
  const selectedTasks = tasks.filter((task) => task.dueDate === selectedKey);

  return (
    <div className="absolute left-3 right-3 top-full z-40 mt-2 rounded-[8px] border border-[#e5e7eb] bg-white px-4 pb-5 pt-4 shadow-[0_20px_50px_rgba(15,23,42,0.16)] sm:left-auto sm:right-0 sm:w-[400px] sm:px-6 sm:pb-6 sm:pt-5">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-[#111827]">Calendar</h3>
          <p className="mt-1 text-sm text-[#6b7280]">
            {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <button type="button" onClick={onClose} className="text-[#6b7280] hover:text-[#111827]">
          <FiArrowLeft size={24} />
        </button>
      </div>

      <div className="mb-4 flex items-center justify-between rounded-[6px] border border-[#d1d5db] px-4 py-3 text-sm font-medium text-[#111827]">
        <span>{monthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
        <button type="button" onClick={onClose} className="text-[#9ca3af] hover:text-[#111827]">
          <FiX size={16} />
        </button>
      </div>

      <div className="mb-5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onMonthChange(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-[6px] border border-[#d1d5db] text-[#111827] hover:bg-[#f3f4f6]"
        >
          <FiChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => {
            const today = new Date();
            onSelectDate(today);
            onMonthChange(0, today);
          }}
          className="rounded-[6px] border border-[#d1d5db] px-3 py-2 text-sm font-medium text-[#374151] hover:bg-[#f3f4f6]"
        >
          Today
        </button>
        <button
          type="button"
          onClick={() => onMonthChange(1)}
          className="flex h-10 w-10 items-center justify-center rounded-[6px] border border-[#d1d5db] text-[#111827] hover:bg-[#f3f4f6]"
        >
          <FiChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-2 text-center text-xs text-[#6b7280]">
        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
          <span key={day} className="pb-2 font-semibold">
            {day}
          </span>
        ))}
        {days.map((day, index) => {
          const key = day ? formatDateKey(day) : `empty-${index}`;
          const isSelected = day && key === selectedKey;
          const hasTasks = day && taskDateCounts[key];

          return (
            <div key={key} className="flex justify-center">
              {day ? (
                <button
                  type="button"
                  onClick={() => onSelectDate(day)}
                  className={`relative flex h-9 w-9 items-center justify-center rounded-[6px] text-sm transition ${
                    isSelected ? 'bg-[#111827] text-white' : 'text-[#111827] hover:bg-[#f3f4f6]'
                  }`}
                >
                  {day.getDate()}
                  {hasTasks ? (
                    <span className={`absolute bottom-1 h-1 w-1 rounded-full ${isSelected ? 'bg-white' : 'bg-[#111827]'}`} />
                  ) : null}
                </button>
              ) : (
                <span className="h-9 w-9" />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-5 border-t border-[#e5e7eb] pt-4">
        <p className="text-sm font-semibold text-[#111827]">Tasks on this date</p>
        <div className="mt-3 space-y-2">
          {selectedTasks.length ? (
            selectedTasks.map((task) => (
              <div key={task.id} className="rounded-[6px] border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2">
                <p className="truncate text-sm font-medium text-[#111827]">{task.title}</p>
                <p className="mt-1 text-xs text-[#6b7280]">{task.status} / {task.priority}</p>
              </div>
            ))
          ) : (
            <p className="rounded-[6px] border border-[#e5e7eb] bg-[#f9fafb] px-3 py-3 text-sm text-[#6b7280]">
              No tasks scheduled.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Topbar() {
  const { tasks } = useContext(TaskContext);
  const navigate = useNavigate();
  const today = new Date();
  const [activePanel, setActivePanel] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(today);
  const [monthDate, setMonthDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const panelRef = useRef(null);
  const notifications = useMemo(() => buildNotifications(tasks, today), [tasks]);
  const searchResults = useMemo(() => {
    const value = searchQuery.trim().toLowerCase();
    if (!value) return [];

    return tasks
      .filter((task) => {
        const haystack = `${task.title} ${task.description} ${task.category} ${task.priority} ${task.status} ${task.assignee}`.toLowerCase();
        return haystack.includes(value);
      })
      .slice(0, 6);
  }, [searchQuery, tasks]);

  function handleMonthChange(offset, nextDate) {
    if (nextDate) {
      setMonthDate(new Date(nextDate.getFullYear(), nextDate.getMonth(), 1));
      return;
    }

    setMonthDate((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    const value = searchQuery.trim();
    if (!value) return;
    setActivePanel(null);
    navigate(`${routePaths.myTasks}?search=${encodeURIComponent(value)}`);
  }

  function handleOpenTask(task) {
    setSearchQuery('');
    setActivePanel(null);
    navigate(`${routePaths.myTasks}?search=${encodeURIComponent(task.title)}&task=${task.id}`);
  }

  useEffect(() => {
    function handleOutsideClick(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setActivePanel(null);
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setActivePanel(null);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-[#e5e7eb] bg-white">
      <div
        ref={panelRef}
        className="relative flex flex-col gap-3 px-3 py-3 sm:px-5 lg:flex-row lg:items-center lg:justify-between lg:px-8"
      >
        <div className="flex items-center justify-between gap-3 lg:min-w-[220px]">
          <h1 className="text-xl font-semibold leading-none text-[#111827] sm:text-2xl">Dashboard</h1>
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setActivePanel((current) => (current === 'notifications' ? null : 'notifications'))}
              className="relative flex h-9 w-9 items-center justify-center rounded-[6px] border border-[#d1d5db] bg-white text-[#374151]"
              aria-label="Open notifications"
            >
              <FiBell size={16} />
              {notifications.length ? (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#111827] px-1 text-[9px] font-semibold text-white">
                  {notifications.length}
                </span>
              ) : null}
            </button>
            <button
              type="button"
              onClick={() => setActivePanel((current) => (current === 'calendar' ? null : 'calendar'))}
              className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-[#d1d5db] bg-white text-[#374151]"
              aria-label="Open calendar"
            >
              <FiCalendar size={16} />
            </button>
          </div>
        </div>

        <form className="relative w-full lg:max-w-[700px]" onSubmit={handleSearchSubmit}>
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="h-10 w-full rounded-[6px] border border-[#d1d5db] bg-white px-3 pr-11 text-sm text-[#111827] outline-none placeholder:text-[#9ca3af] focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/10 sm:h-11 sm:px-4 sm:pr-12"
            placeholder="Search your task here..."
          />
          <button type="submit" className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-[6px] bg-[#111827] text-white sm:h-9 sm:w-9">
            <FiSearch size={18} />
          </button>

          {searchQuery.trim() ? (
            <div className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-[8px] border border-[#e5e7eb] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.14)]">
              {searchResults.length ? (
                <div className="max-h-[320px] overflow-y-auto py-2">
                  {searchResults.map((task) => (
                    <button
                      key={task.id}
                      type="button"
                      onClick={() => handleOpenTask(task)}
                      className="block w-full px-4 py-3 text-left transition hover:bg-[#f9fafb]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-[#111827]">{task.title}</p>
                          <p className="mt-1 truncate text-xs text-[#6b7280]">{task.description}</p>
                        </div>
                        <span className="shrink-0 rounded-[6px] border border-[#e5e7eb] px-2 py-1 text-xs font-semibold text-[#374151]">
                          {task.status}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-sm text-[#6b7280]">No matching tasks found.</div>
              )}
            </div>
          ) : null}
        </form>

        <div className="hidden items-center gap-4 self-end lg:flex lg:self-auto">
          <button
            type="button"
            onClick={() => setActivePanel((current) => (current === 'notifications' ? null : 'notifications'))}
            className="relative flex h-10 w-10 items-center justify-center rounded-[6px] border border-[#d1d5db] bg-white text-[#374151] hover:bg-[#f3f4f6]"
            aria-label="Open notifications"
          >
            <FiBell size={17} />
            {notifications.length ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#111827] px-1 text-[10px] font-semibold text-white">
                {notifications.length}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            onClick={() => setActivePanel((current) => (current === 'calendar' ? null : 'calendar'))}
            className="flex h-10 w-10 items-center justify-center rounded-[6px] border border-[#d1d5db] bg-white text-[#374151] hover:bg-[#f3f4f6]"
            aria-label="Open calendar"
          >
            <FiCalendar size={17} />
          </button>
          <div className="text-right leading-tight">
            <p className="text-sm font-medium text-[#111827]">
              {today.toLocaleDateString('en-US', { weekday: 'long' })}
            </p>
            <p className="mt-1 text-sm text-[#6b7280]">{today.toLocaleDateString('en-GB')}</p>
          </div>
        </div>

        {activePanel === 'notifications' ? (
          <NotificationPanel notifications={notifications} onClose={() => setActivePanel(null)} />
        ) : null}
        {activePanel === 'calendar' ? (
          <CalendarPanel
            monthDate={monthDate}
            selectedDate={selectedDate}
            tasks={tasks}
            onClose={() => setActivePanel(null)}
            onMonthChange={handleMonthChange}
            onSelectDate={setSelectedDate}
          />
        ) : null}
      </div>
    </header>
  );
}
