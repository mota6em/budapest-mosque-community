import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../lib/supabase";

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if admin is already logged in on app load
  useEffect(() => {
    checkUser();

    // Listen for auth changes
    const {
      data: { subscription },
    } = auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        setIsAuthenticated(true);
        setAdminUser({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.name || session.user.email,
          role: session.user.user_metadata?.role || "admin",
        });
      } else if (event === "SIGNED_OUT") {
        setIsAuthenticated(false);
        setAdminUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUser = async () => {
    try {
      const { user } = await auth.getCurrentUser();
      if (user) {
        setIsAuthenticated(true);
        setAdminUser({
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name || user.email,
          role: user.user_metadata?.role || "admin",
        });
      }
    } catch (error) {
      console.error("Error checking user:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      // For now, we'll use email/password from the form
      // You can modify this to use username if needed
      const { data, error } = await auth.signIn(
        credentials.email,
        credentials.password
      );

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        // Check if user has admin role (you can customize this logic)
        const userRole = data.user.user_metadata?.role || "admin";
        if (userRole === "admin") {
          return { success: true };
        } else {
          // Sign out if not admin
          await auth.signOut();
          return {
            success: false,
            error: "Access denied. Admin privileges required.",
          };
        }
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: "An error occurred during login" };
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setIsAuthenticated(false);
      setAdminUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const value = {
    isAuthenticated,
    adminUser,
    loading,
    login,
    logout,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
