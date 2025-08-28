import React, { useState } from "react";
import { useAdmin } from "../contexts/AdminContext";
import AdminSidebar from "./AdminSidebar";
import { FiMenu } from "react-icons/fi";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { adminUser } = useAdmin();

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <div className="lg:hidden bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md hover:bg-muted"
          >
            <FiMenu size={20} className="text-foreground" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Admin Panel</h1>
          <div className="w-8"></div> {/* Spacer for centering */}
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Main content */}
        <div className="flex-1 lg:ml-0">
          {/* Desktop header */}
          <div className="hidden lg:block bg-card border-b border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Welcome back, {adminUser?.name || "Administrator"}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">
                    {adminUser?.name || "Administrator"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {adminUser?.role || "Admin"}
                  </div>
                </div>
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {adminUser?.name?.charAt(0) || "A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Page content */}
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
