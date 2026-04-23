import { useContext } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import PageContainer from '../../components/layout/PageContainer';
import AIWorkspaceHero from '../../components/ai/AIWorkspaceHero';
import AIQuickActions from '../../components/ai/AIQuickActions';
import AIChatPanel from '../../components/ai/AIChatPanel';
import AIMissionControl from '../../components/ai/AIMissionControl';
import { TaskContext } from '../../context/TaskContext';
import { buildAIInsights } from '../../utils/aiInsights';
import { buildQuickActions } from '../../utils/aiCopilot';

export default function AIWorkspacePage() {
  const { tasks } = useContext(TaskContext);
  const insights = buildAIInsights(tasks);
  const actions = buildQuickActions(tasks);

  return (
    <AppLayout>
      <PageContainer className="space-y-5">
        <AIWorkspaceHero automationScore={insights.automationScore} />
        <AIMissionControl tasks={tasks} />
        <AIQuickActions actions={actions} tasks={tasks} />
        <AIChatPanel tasks={tasks} />
      </PageContainer>
    </AppLayout>
  );
}
