import {
  FiGrid,
  FiAlertCircle,
  FiCheckSquare,
  FiList,
  FiSettings,
  FiCpu,
} from 'react-icons/fi';
import routePaths from '../routes/routePaths';

const sidebarLinks = [
  { label: 'Dashboard', path: routePaths.dashboard, icon: FiGrid },
  { label: 'Vital Task', path: routePaths.vitalTasks, icon: FiAlertCircle },
  { label: 'My Task', path: routePaths.myTasks, icon: FiCheckSquare },
  { label: 'Task Categories', path: routePaths.taskCategories, icon: FiList },
  { label: 'AI Workspace', path: routePaths.aiWorkspace, icon: FiCpu },
  { label: 'Settings', path: routePaths.accountInfo, icon: FiSettings },
];

export default sidebarLinks;
