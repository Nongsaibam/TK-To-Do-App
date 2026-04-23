import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import VitalTasksPage from '../pages/dashboard/VitalTasksPage';
import MyTasksPage from '../pages/dashboard/MyTasksPage';
import TaskCategoriesPage from '../pages/dashboard/TaskCategoriesPage';
import AIWorkspacePage from '../pages/dashboard/AIWorkspacePage';
import AccountInfoPage from '../pages/dashboard/AccountInfoPage';
import ChangePasswordPage from '../pages/dashboard/ChangePasswordPage';
import CreateCategoriesPage from '../pages/dashboard/CreateCategoriesPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProtectedRoute from './ProtectedRoute';
import routePaths from './routePaths';

export default function AppRouter() {
  return (
    <Routes>
      <Route path={routePaths.login} element={<LoginPage />} />
      <Route path={routePaths.register} element={<RegisterPage />} />
      <Route
        path={routePaths.dashboard}
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={routePaths.vitalTasks}
        element={
          <ProtectedRoute>
            <VitalTasksPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={routePaths.myTasks}
        element={
          <ProtectedRoute>
            <MyTasksPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={routePaths.taskCategories}
        element={
          <ProtectedRoute>
            <TaskCategoriesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={routePaths.aiWorkspace}
        element={
          <ProtectedRoute>
            <AIWorkspacePage />
          </ProtectedRoute>
        }
      />
      <Route
        path={routePaths.accountInfo}
        element={
          <ProtectedRoute>
            <AccountInfoPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={routePaths.changePassword}
        element={
          <ProtectedRoute>
            <ChangePasswordPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={routePaths.createCategories}
        element={
          <ProtectedRoute>
            <CreateCategoriesPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
