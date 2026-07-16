import React, { createContext, useState, useContext, useEffect } from 'react';

// Cuentas de prueba simuladas
export const MOCK_USERS = {
  "admin@aduana.cl": {
    id: "mock-admin-001",
    email: "admin@aduana.cl",
    password: "admin123",
    full_name: "Administrador Aduana",
    role: "admin",
  },
  "viajero@test.cl": {
    id: "mock-viajero-001",
    email: "viajero@test.cl",
    password: "viajero123",
    full_name: "Juan Pérez",
    role: "viajero",
  },
};

const STORAGE_KEY = "mock_auth_user";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [appPublicSettings] = useState({});

  useEffect(() => {
    // Restaurar sesión desde sessionStorage
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const savedUser = JSON.parse(saved);
        setUser(savedUser);
        setIsAuthenticated(true);
      } catch {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoadingAuth(false);
    setAuthChecked(true);
  }, []);

  const checkUserAuth = async () => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const savedUser = JSON.parse(saved);
        setUser(savedUser);
        setIsAuthenticated(true);
      } catch {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoadingAuth(false);
    setAuthChecked(true);
  };

  const checkAppState = async () => {
    await checkUserAuth();
  };

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setIsAuthenticated(false);
    window.location.hash = "#/login";
  };

  const navigateToLogin = () => {
    window.location.hash = "#/login";
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      appPublicSettings,
      authChecked,
      logout,
      navigateToLogin,
      checkUserAuth,
      checkAppState,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

const REGISTERED_KEY = "mock_registered_users";

const getRegisteredUsers = () => {
  try { return JSON.parse(localStorage.getItem(REGISTERED_KEY) || "{}"); } catch { return {}; }
};

// Función helper para login simulado (usada en la página Login)
export const mockLogin = (email, password) => {
  // Buscar en cuentas de prueba primero
  const mockUser = MOCK_USERS[email];
  if (mockUser && mockUser.password === password) {
    const { password: _, ...safeUser } = mockUser;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));
    return safeUser;
  }
  // Buscar en usuarios registrados
  const registered = getRegisteredUsers();
  const regUser = registered[email];
  if (regUser && regUser.password === password) {
    const { password: _, ...safeUser } = regUser;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));
    return safeUser;
  }
  throw new Error("Correo o contraseña incorrectos.");
};

export const mockRegister = (email, password, full_name) => {
  const allMock = { ...MOCK_USERS };
  if (allMock[email]) throw new Error("Este correo ya está registrado.");
  const registered = getRegisteredUsers();
  if (registered[email]) throw new Error("Este correo ya está registrado.");
  const newUser = {
    id: `user-${Date.now()}`,
    email,
    password,
    full_name,
    role: "viajero",
  };
  registered[email] = newUser;
  localStorage.setItem(REGISTERED_KEY, JSON.stringify(registered));
  const { password: _, ...safeUser } = newUser;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));
  return safeUser;
};