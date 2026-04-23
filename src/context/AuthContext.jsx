import { createContext, useMemo, useState } from 'react';
import user from '../data/user';
import { authApi, clearAuthSession, loadAuthSession } from '../services/api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const savedSession = loadAuthSession();
  const [currentUser, setCurrentUser] = useState(savedSession?.user || user);
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(savedSession?.token));
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated,
      isLoading,
      authError,
      login: async (payload) => {
        setIsLoading(true);
        setAuthError('');
        try {
          const data = await authApi.login(payload);
          setCurrentUser(data.user);
          setIsAuthenticated(true);
          return data;
        } catch (error) {
          setAuthError(error.message);
          throw error;
        } finally {
          setIsLoading(false);
        }
      },
      logout: () => {
        clearAuthSession();
        setIsAuthenticated(false);
      },
      register: async (payload) => {
        setIsLoading(true);
        setAuthError('');
        try {
          const data = await authApi.register(payload);
          setCurrentUser(data.user);
          setIsAuthenticated(true);
          return data;
        } catch (error) {
          setAuthError(error.message);
          throw error;
        } finally {
          setIsLoading(false);
        }
      },
      socialLogin: async (provider) => {
        setIsLoading(true);
        setAuthError('');
        try {
          const data = await authApi.socialLogin(provider);
          setCurrentUser(data.user);
          setIsAuthenticated(true);
          return data;
        } catch (error) {
          setAuthError(error.message);
          throw error;
        } finally {
          setIsLoading(false);
        }
      },
      updateProfile: async (payload) => {
        const data = await authApi.updateProfile({ id: currentUser.id, ...payload });
        setCurrentUser(data.user);
        return data;
      },
      changePassword: async (payload) => {
        return authApi.changePassword({ email: currentUser.email, ...payload });
      },
      setCurrentUser: (payload) => {
        setCurrentUser((prev) => ({ ...prev, ...payload }));
        setIsAuthenticated(true);
      },
    }),
    [authError, currentUser, isAuthenticated, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
