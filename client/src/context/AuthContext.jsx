import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../services/api.js';
import { KEYS, safeGet, safeSet, clearAll } from '../utils/storage.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(() => safeGet(KEYS.USER));
  const [token, setToken]     = useState(() => localStorage.getItem(KEYS.TOKEN));
  const [loading, setLoading] = useState(true);

  // On mount, verify token with server
  useEffect(() => {
    const verify = async () => {
      if (!token) { setLoading(false); return; }
      try {
        const res = await authAPI.getMe();
        const u = res.data.data.user;
        setUser(u);
        safeSet(KEYS.USER, u);
      } catch {
        // Token invalid / expired — clear
        logout();
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, []); // eslint-disable-line

  const login = useCallback(async (email, password) => {
    const res = await authAPI.login({ email, password });
    const { user: u, token: t } = res.data.data;
    localStorage.setItem(KEYS.TOKEN, t);
    safeSet(KEYS.USER, u);
    // Restore any persisted profile/progress to user object
    if (u.profile?.skills?.length) safeSet(KEYS.PROFILE, u.profile);
    if (u.selectedCareer)          safeSet(KEYS.SELECTED_CAREER, u.selectedCareer);
    if (u.skillProgress)           safeSet(KEYS.PROGRESS, u.skillProgress);
    if (u.assessmentResults)       safeSet(KEYS.RESULTS, u.assessmentResults);
    setToken(t);
    setUser(u);
    return u;
  }, []);

  const register = useCallback(async (name, email, password) => {
    const res = await authAPI.register({ name, email, password });
    const { user: u, token: t } = res.data.data;
    localStorage.setItem(KEYS.TOKEN, t);
    safeSet(KEYS.USER, u);
    setToken(t);
    setUser(u);
    return u;
  }, []);

  const logout = useCallback(() => {
    clearAll();
    setToken(null);
    setUser(null);
  }, []);

  // Update local user state after profile/progress changes
  const refreshUser = useCallback(async () => {
    try {
      const res = await authAPI.getMe();
      const u = res.data.data.user;
      setUser(u);
      safeSet(KEYS.USER, u);
      return u;
    } catch { /* ignore */ }
  }, []);

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token && !!user,
    login,
    register,
    logout,
    refreshUser,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
