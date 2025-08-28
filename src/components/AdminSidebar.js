import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAdmin } from "../contexts/AdminContext";
import {
  FiHome,
  FiDollarSign,
  FiCalendar,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";

const AdminSidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const { logout } = useAdmin();

  const menuItems = [
    {
      path: "/admin/dashboard",
      icon: FiHome,
      label: "Dashboard",
      description: "Overview and statistics",
    },
    {
      path: "/admin/donations",
      icon: FiDollarSign,
      label: "Donations",
      description: "Manage donation campaigns",
    },
    {
      path: "/admin/events",
      icon: FiCalendar,
      label: "Events",
      description: "Manage community events",
    },
    {
      path: "/admin/jumaa",
      icon: FiUsers,
      label: "Jumaa",
      description: "Friday prayer management",
    },
    {
      path: "/admin/settings",
      icon: FiSettings,
      label: "Settings",
      description: "System configuration",
    },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-full bg-card border-r border-border z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
        w-64
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <FiHome size={20} className="text-white" />
            </div>
            <h1 className="text-lg font-bold text-foreground">Admin Panel</h1>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden p-1 rounded-md hover:bg-muted"
          >
            <FiX size={20} className="text-foreground" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                  ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }
                `}
                onClick={() => {
                  // Close mobile sidebar when clicking a link
                  if (window.innerWidth < 1024) {
                    onToggle();
                  }
                }}
              >
                <Icon size={20} />
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs opacity-75">{item.description}</div>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {/* Sidebar */}
        <div
          className={`
    fixed top-0 left-0 h-full bg-card border-r border-border z-50
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0 lg:static lg:z-auto
    w-64 relative
  `}
        >
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-4 py-3 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors"
          >
            <FiLogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
