import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { FiSettings } from "react-icons/fi";

const AdminSettingsPage = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Configure system settings and preferences.
        </p>
      </div>

      {/* Placeholder Content */}
      <Card>
        <CardContent className="p-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <FiSettings size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              System Settings
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              This section will allow you to configure system settings, manage
              user permissions, and customize the platform.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Coming Soon:</strong> User management, system
                configuration, notification settings, and security preferences.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettingsPage;
