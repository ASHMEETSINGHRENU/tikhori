import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('tikhori_user_data');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('tikhori_user_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const savedToken = localStorage.getItem('tikhori_user_token');
      if (savedToken) {
        try {
          const res = await api.get('/auth/user-me', {
            headers: { Authorization: `Bearer ${savedToken}` }
          });
          if (res.data?.success && res.data?.data) {
            setUser(res.data.data);
            localStorage.setItem('tikhori_user_data', JSON.stringify(res.data.data));
          }
        } catch (err) {
          console.warn('User session invalid or expired:', err.message);
          if (err.response?.status === 401 || err.response?.status === 403) {
            logout();
          }
        }
      }
      setLoading(false);
    };

    verifyUser();
  }, []);

  const login = async (identifier, password) => {
    const res = await api.post('/auth/user-login', {
      email: identifier,
      username: identifier,
      password
    });
    if (res.data?.success) {
      const { token: newToken, ...userData } = res.data.data;
      localStorage.setItem('tikhori_user_token', newToken);
      localStorage.setItem('tikhori_user_data', JSON.stringify(userData));
      setToken(newToken);
      setUser(userData);
      return res.data;
    }
    throw new Error(res.data?.message || 'Login failed');
  };

  const register = async ({ username, email, password, name, phone, companyOrStore, city }) => {
    const res = await api.post('/auth/register', {
      username,
      email,
      password,
      name,
      phone,
      companyOrStore,
      city
    });
    if (res.data?.success) {
      const { token: newToken, ...userData } = res.data.data;
      localStorage.setItem('tikhori_user_token', newToken);
      localStorage.setItem('tikhori_user_data', JSON.stringify(userData));
      setToken(newToken);
      setUser(userData);
      return res.data;
    }
    throw new Error(res.data?.message || 'Registration failed');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('tikhori_user_token');
    localStorage.removeItem('tikhori_user_data');
  };

  return (
    <UserAuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        register,
        logout
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error('useUserAuth must be used within a UserAuthProvider');
  }
  return context;
};

export default UserAuthContext;
