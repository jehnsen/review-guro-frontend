"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  AuthUser,
  authApi,
  getAccessToken,
  getStoredUser,
  removeAccessToken,
  ApiError,
} from "@/lib/api";

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = getAccessToken();
      const storedUser = getStoredUser();

      if (token && storedUser) {
        // Verify token is still valid
        try {
          const response = await authApi.getProfile();
          if (response.success) {
            setUser(response.data);
          } else {
            // Token invalid, clear storage
            removeAccessToken();
            setUser(null);
          }
        } catch {
          // Token expired or invalid
          removeAccessToken();
          setUser(null);
        }
      }

      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const response = await authApi.login(email, password);

    if (response.success) {
      setUser(response.data.user);
    } else {
      throw new Error(response.message);
    }
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    const response = await authApi.register(email, password);

    if (response.success) {
      setUser(response.data.user);
    } else {
      throw new Error(response.message);
    }
  }, []);

  const logout = useCallback(() => {
    authApi.logout();
    setUser(null);
    router.push("/sign-in");
  }, [router]);

  const refreshUser = useCallback(async () => {
    try {
      const response = await authApi.getProfile();
      if (response.success) {
        setUser(response.data);
      }
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        logout();
      }
    }
  }, [logout]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    // Return safe defaults during SSR
    return {
      user: null,
      isLoading: true,
      isAuthenticated: false,
      login: async () => {},
      register: async () => {},
      logout: () => {},
      refreshUser: async () => {},
    };
  }

  return context;
}

// HOC for protecting routes
export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function ProtectedRoute(props: P) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push("/sign-in");
      }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
