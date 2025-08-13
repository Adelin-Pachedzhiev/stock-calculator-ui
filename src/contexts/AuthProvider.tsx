import { useState, useEffect, type ReactNode } from 'react';
import { isTokenExpired, getUserRole, getUserEmail } from '../utils/jwt';
import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshAuth = () => {
    setIsLoading(true);
    const storedToken = localStorage.getItem('jwtToken');
    
    if (storedToken && !isTokenExpired(storedToken)) {
      const role = getUserRole(storedToken);
      const email = getUserEmail(storedToken);
      
      setToken(storedToken);
      setIsLoggedIn(true);
      setUserRole(role);
      setUserEmail(email);
    } else {
      setToken(null);
      setIsLoggedIn(false);
      setUserRole(null);
      setUserEmail(null);
      if (storedToken) {
        localStorage.removeItem('jwtToken');
      }
    }
    setIsLoading(false);
  };

  const login = (newToken: string) => {
    localStorage.setItem('jwtToken', newToken);
    setToken(newToken);
    
    const role = getUserRole(newToken);
    const email = getUserEmail(newToken);
    
    setIsLoggedIn(true);
    setUserRole(role);
    setUserEmail(email);
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setToken(null);
    setIsLoggedIn(false);
    setUserRole(null);
    setUserEmail(null);
  };

  useEffect(() => {
    refreshAuth();
    
    // Listen for storage changes (in case token is updated in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'jwtToken') {
        refreshAuth();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Run only once on mount

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      userRole, 
      userEmail, 
      token, 
      isLoading,
      login, 
      logout, 
      refreshAuth 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
