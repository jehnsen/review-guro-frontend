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
  getStoredUser,
  setStoredUser,
  removeAccessToken,
  ApiError,
} from "@/server/api";

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

  // AUTO-REFRESH: Refresh access token before it expires
  // Access token expires in 15 minutes, refresh at 14 minutes
  const REFRESH_INTERVAL = 14 * 60 * 1000; // 14 minutes in milliseconds

  // Check for existing session on mount
  useEffect(() => {
    let isMounted = true;
    let hasInitialized = false;

    const initAuth = async () => {
      // Prevent duplicate calls (React StrictMode protection)
      if (hasInitialized) return;
      hasInitialized = true;

      // SECURITY FIX: Since tokens are now in httpOnly cookies, we can't check for their existence
      // Instead, we try to get the user profile which will use the cookie automatically
      const storedUser = getStoredUser();

      if (storedUser) {
        // Use stored user data immediately for faster initial render
        if (isMounted) {
          setUser(storedUser);
          setIsLoading(false);
        }

        // Verify token/cookie is still valid in the background
        const userAge = Date.now() - (storedUser.createdAt ? new Date(storedUser.createdAt).getTime() : 0);
        const fiveMinutes = 5 * 60 * 1000;

        if (userAge > fiveMinutes) {
          try {
            const response = await authApi.getProfile();
            if (isMounted) {
              if (response.success) {
                setUser(response.data);
              } else {
                // Cookie invalid, clear storage
                removeAccessToken();
                setUser(null);
              }
            }
          } catch (error) {
            // Cookie expired or invalid - try to refresh
            if (error instanceof ApiError && error.status === 401) {
              try {
                const refreshResponse = await fetch('/api/auth/refresh', {
                  method: 'POST',
                  credentials: 'include',
                });

                if (refreshResponse.ok) {
                  const refreshData = await refreshResponse.json();
                  if (refreshData.success && refreshData.data?.user) {
                    if (isMounted) {
                      setUser(refreshData.data.user);
                      setStoredUser(refreshData.data.user);
                    }
                    return;
                  }
                }
              } catch {
                // Refresh also failed
              }
            }

            // Truly expired or invalid
            if (isMounted) {
              removeAccessToken();
              setUser(null);
            }
          }
        }
      } else {
        // No stored user, try to fetch profile (cookie might exist)
        try {
          const response = await authApi.getProfile();
          if (isMounted) {
            if (response.success) {
              setUser(response.data);
              setStoredUser(response.data);
            }
            setIsLoading(false);
          }
        } catch (error) {
          // If 401, try to refresh token first
          if (error instanceof ApiError && error.status === 401) {
            try {
              const refreshResponse = await fetch('/api/auth/refresh', {
                method: 'POST',
                credentials: 'include',
              });

              if (refreshResponse.ok) {
                const refreshData = await refreshResponse.json();
                if (refreshData.success && refreshData.data?.user) {
                  if (isMounted) {
                    setUser(refreshData.data.user);
                    setStoredUser(refreshData.data.user);
                    setIsLoading(false);
                  }
                  return;
                }
              }
            } catch {
              // Refresh also failed, no valid session
            }
          }

          // No valid session
          if (isMounted) {
            setIsLoading(false);
          }
        }
      }
    };

    initAuth();

    return () => {
      isMounted = false;
    };
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

  const logout = useCallback(async () => {
    try {
      // SECURITY FIX: Call logout endpoint to clear httpOnly cookie
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API call failed:', error);
    }

    // Clear all auth data
    authApi.logout();
    setUser(null);

    // Clear any session-related data
    if (typeof window !== "undefined") {
      sessionStorage.clear();
    }

    // Use replace to prevent going back to authenticated pages
    router.replace("/sign-in");
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

  // AUTO-REFRESH: Automatically refresh access token before it expires
  const refreshAccessToken = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data.user) {
          setUser(data.data.user);
          setStoredUser(data.data.user);
          return true;
        }
      }

      // Refresh failed, logout user
      await logout();
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      await logout();
      return false;
    }
  }, [logout]);

  // AUTO-REFRESH: Set up automatic token refresh interval
  useEffect(() => {
    if (!user) return;

    // Refresh token every 14 minutes (access token expires in 15 minutes)
    const refreshInterval = setInterval(() => {
      refreshAccessToken();
    }, REFRESH_INTERVAL);

    // Also refresh on window focus (in case user returns after being away)
    const handleFocus = () => {
      refreshAccessToken();
    };
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(refreshInterval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [user, refreshAccessToken, REFRESH_INTERVAL]);

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
        router.replace("/sign-in");
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

// Auth Guard Component for protecting routes
export function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Check auth status immediately and on every render
    if (!isLoading && !isAuthenticated) {
      router.replace("/sign-in");
    }
  }, [isAuthenticated, isLoading, router]);

  // Also check on popstate (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      // SECURITY FIX: Can't check cookie directly, rely on isAuthenticated state
      if (!isAuthenticated) {
        router.replace("/sign-in");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [router, isAuthenticated]);

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

  return <>{children}</>;
}

// Guest Guard Component for public-only routes (sign-in, sign-up)
export function GuestGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  // Also check on popstate (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      // SECURITY FIX: Can't check cookie directly, rely on isAuthenticated state
      if (isAuthenticated) {
        router.replace("/dashboard");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [router, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
