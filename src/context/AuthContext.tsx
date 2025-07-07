import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  claims: Claim[];
  empires: Empire[];
}

interface Claim {
  id: string;
  name: string;
  coordinates: {
    x: number;
    y: number;
  };
  status: 'active' | 'inactive' | 'under_attack';
  resources: Resource[];
}

interface Empire {
  id: string;
  name: string;
  members: User[];
  claims: Claim[];
}

interface Resource {
  id: string;
  name: string;
  quantity: number;
  maxQuantity: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading stored user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      // TODO: Implement actual BitCraft API authentication
      // For now, simulate authentication
      const mockUser: User = {
        id: '1',
        username,
        email: `${username}@example.com`,
        claims: [],
        empires: [],
      };

      setUser(mockUser);
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setUser(null);
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string,
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      // TODO: Implement actual BitCraft API registration
      // For now, simulate registration
      const mockUser: User = {
        id: '1',
        username,
        email,
        claims: [],
        empires: [],
      };

      setUser(mockUser);
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUserData = async (): Promise<void> => {
    if (!user) return;

    try {
      // TODO: Implement actual BitCraft API call to refresh user data
      // For now, just simulate a refresh
      console.log('Refreshing user data...');
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
    refreshUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 