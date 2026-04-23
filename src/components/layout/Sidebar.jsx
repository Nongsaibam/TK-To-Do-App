import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import sidebarLinks from '../../data/sidebarLinks';
import { cn } from '../../utils/helpers';
import useAuth from '../../hooks/useAuth';
import routePaths from '../../routes/routePaths';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate(routePaths.login);
  }

  return (
    <aside className="w-full shrink-0 border-b border-[#e5e7eb] bg-white p-3 lg:max-w-[292px] lg:border-b-0 lg:border-r lg:p-4">
      <div className="flex h-full flex-col lg:min-h-[calc(100vh-6rem)]">
        <div className="hidden rounded-[8px] border border-[#e5e7eb] bg-[#f9fafb] p-4 sm:flex sm:items-center sm:gap-3 lg:block">
          <div className="flex h-12 w-12 items-center justify-center rounded-[6px] bg-[#111827] text-lg font-semibold text-white">
            {currentUser?.name?.[0] ?? 'S'}
          </div>
          <div className="min-w-0 lg:mt-3">
            <p className="truncate text-sm font-semibold text-[#111827]">{currentUser?.name ?? 'Sundar Gurung'}</p>
            <p className="mt-1 truncate text-xs text-[#6b7280]">{currentUser?.email ?? 'sundargurung360@gmail.com'}</p>
          </div>
        </div>

        <nav className="flex gap-2 overflow-x-auto pb-1 lg:mt-6 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
          {sidebarLinks.map(({ label, path, icon: Icon }) => (
            <NavLink key={path} to={path} className="shrink-0 lg:block">
              {({ isActive }) => {
                const isGroupedTaskCategory =
                  path === routePaths.taskCategories &&
                  (location.pathname === routePaths.createCategories ||
                    location.pathname === routePaths.taskCategories);

                const active = isActive || isGroupedTaskCategory;

                return (
                  <span
                    className={cn(
                      'flex min-w-[64px] flex-col items-center gap-1 rounded-[6px] px-2 py-2 text-xs font-medium transition sm:min-w-0 sm:flex-row sm:gap-2 sm:px-3 sm:py-2.5 sm:text-sm lg:gap-3 lg:py-3',
                      active
                        ? 'bg-[#111827] text-white'
                        : 'text-[#4b5563] hover:bg-[#f3f4f6] hover:text-[#111827]'
                    )}
                  >
                    <Icon size={18} />
                    <span className="max-w-[72px] truncate text-center sm:max-w-none sm:text-left">{label}</span>
                  </span>
                );
              }}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-3 hidden items-center gap-3 rounded-[6px] px-3 py-3 text-left text-sm font-medium text-[#4b5563] transition hover:bg-[#f3f4f6] hover:text-[#111827] lg:mt-auto lg:flex"
        >
          <FiLogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
