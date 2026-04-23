import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f6f7f9] text-[#111827]">
      <Topbar />
      <div className="flex flex-col lg:flex-row">
        <Sidebar />
        <main className="min-w-0 flex-1 px-3 py-4 sm:px-5 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
