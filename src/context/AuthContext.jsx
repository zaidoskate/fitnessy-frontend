import { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext(null);

const TOKEN_KEY = 'fitnessy_token';
const USER_KEY = 'fitnessy_user';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || null);
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    apiService
      .getMe(token)
      .then((res) => {
        if (res?.user) {
          setUser(res.user);
          localStorage.setItem(USER_KEY, JSON.stringify(res.user));
        }
      })
      .catch(() => {
        // Si el backend no está levantado o expiro, se conserva el usuario local si es que existe
      });
  }, [token]);

  const saveSession = (jwtToken, userData) => {
    setToken(jwtToken);
    setUser(userData);
    localStorage.setItem(TOKEN_KEY, jwtToken);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
  };

  const login = async (correo, password) => {
    setLoading(true);
    try {
      const data = await apiService.login({ correo, password });
      saveSession(data.token, data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const data = await apiService.register(payload);
      saveSession(data.token, data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: Boolean(token && user),
        isAdmin: user?.rol === 'admin',
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return ctx;
}

