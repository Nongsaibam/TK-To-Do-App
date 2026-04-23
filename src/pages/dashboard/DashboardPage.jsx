import { useContext } from 'react';
import { FiCheckSquare, FiClipboard, FiClock, FiPlus } from 'react-icons/fi';
import AppLayout from '../../components/layout/AppLayout';
import PageContainer from '../../components/layout/PageContainer';
import TaskCard from '../../components/dashboard/TaskCard';
import CompletedTaskCard from '../../components/dashboard/CompletedTaskCard';
import TaskStatusChart from '../../components/dashboard/TaskStatusChart';
import TeamInviteBar from '../../components/dashboard/TeamInviteBar';
import AIAssistantPanel from '../../components/dashboard/AIAssistantPanel';
import SmartFeatureGrid from '../../components/dashboard/SmartFeatureGrid';
import useModal from '../../hooks/useModal';
import AddTaskModal from '../../components/modals/AddTaskModal';
import InviteMemberModal from '../../components/modals/InviteMemberModal';
import { TaskContext } from '../../context/TaskContext';

function DashboardSectionHeading({ icon: Icon, title, subtitle, action }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-3">
          <Icon className="text-lg text-[#6b7280]" />
          <h2 className="text-lg font-semibold text-[#111827]">{title}</h2>
        </div>
        {subtitle ? <div className="mt-2 text-sm text-[#6b7280]">{subtitle}</div> : null}
      </div>
      {action}
    </div>
  );
}

export default function DashboardPage() {
  const { addTask, analytics, tasks } = useContext(TaskContext);
  const inviteModal = useModal();
  const addTaskModal = useModal();

  const completedTasks = tasks.filter((task) => task.status === 'Completed');
  const activeTasks = tasks.filter((task) => task.status !== 'Completed');

  return (
    <AppLayout>
      <PageContainer className="space-y-5">
        <TeamInviteBar onInvite={inviteModal.openModal} />
        <AIAssistantPanel tasks={tasks} />
        <SmartFeatureGrid />

        <div className="grid gap-5 xl:grid-cols-[1.06fr_0.94fr]">
          <section className="rounded-[8px] border border-[#e5e7eb] bg-white p-4 sm:p-6">
            <DashboardSectionHeading
              icon={FiClipboard}
              title="To-Do"
              subtitle={
                <span className="inline-flex items-center gap-3">
                  <span className="inline-flex items-center gap-2">
                    <FiClock className="text-[#9aa3b2]" />
                    20 June
                  </span>
                  <span className="inline-flex items-center gap-2 text-[#aab1be]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c8cdd8]" />
                    Today
                  </span>
                </span>
              }
              action={
                <button
                  type="button"
                  onClick={addTaskModal.openModal}
                  className="inline-flex items-center gap-2 rounded-[6px] border border-[#d1d5db] px-3 py-2 text-sm font-medium text-[#374151] transition hover:bg-[#f3f4f6]"
                >
                  <FiPlus />
                  Add task
                </button>
              }
            />

            <div className="grid gap-4">
              {activeTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </section>

          <div className="space-y-5">
            <TaskStatusChart analytics={analytics} />
            <section className="rounded-[8px] border border-[#e5e7eb] bg-white p-4 sm:p-6">
              <DashboardSectionHeading icon={FiCheckSquare} title="Completed Task" />
              <div className="space-y-4">
                {completedTasks.map((task) => (
                  <CompletedTaskCard key={task.id} task={task} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </PageContainer>
      <AddTaskModal isOpen={addTaskModal.isOpen} onClose={addTaskModal.closeModal} onSubmit={addTask} />
      <InviteMemberModal isOpen={inviteModal.isOpen} onClose={inviteModal.closeModal} />
    </AppLayout>
  );
}
