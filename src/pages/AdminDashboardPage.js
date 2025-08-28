import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  FiDollarSign,
  FiUsers,
  FiCalendar,
  FiTrendingUp,
  FiPlus,
  FiEye,
} from "react-icons/fi";
import { dashboardService } from "../services/adminService";

const AdminDashboardPage = () => {
  const [stats, setStats] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load overview stats
      const overview = await dashboardService.getOverview();
      const activities = await dashboardService.getRecentActivity();
      
      if (overview.data) {
        const dashboardStats = [
          {
            title: "Total Donations",
            value: `$${overview.data.totalDonations.toLocaleString()}`,
            change: "+12.5%",
            changeType: "positive",
            icon: FiDollarSign,
            color: "bg-green-500",
          },
          {
            title: "Active Campaigns",
            value: "8",
            change: "+2",
            changeType: "positive",
            icon: FiTrendingUp,
            color: "bg-blue-500",
          },
          {
            title: "Total Donors",
            value: "1,234",
            change: "+8.2%",
            changeType: "positive",
            icon: FiUsers,
            color: "bg-purple-500",
          },
          {
            title: "Upcoming Events",
            value: overview.data.upcomingEvents.toString(),
            change: "-1",
            changeType: "negative",
            icon: FiCalendar,
            color: "bg-orange-500",
          },
        ];
        setStats(dashboardStats);
      }
      
      if (activities.data) {
        const formattedActivities = activities.data.map((activity, index) => ({
          id: index + 1,
          type: activity.type,
          message: activity.activity,
          time: new Date(activity.created_at).toLocaleDateString(),
        }));
        setRecentActivities(formattedActivities);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // Fallback to mock data if Supabase is not configured
      setStats([
        {
          title: "Total Donations",
          value: "$45,230",
          change: "+12.5%",
          changeType: "positive",
          icon: FiDollarSign,
          color: "bg-green-500",
        },
        {
          title: "Active Campaigns",
          value: "8",
          change: "+2",
          changeType: "positive",
          icon: FiTrendingUp,
          color: "bg-blue-500",
        },
        {
          title: "Total Donors",
          value: "1,234",
          change: "+8.2%",
          changeType: "positive",
          icon: FiUsers,
          color: "bg-purple-500",
        },
        {
          title: "Upcoming Events",
          value: "5",
          change: "-1",
          changeType: "negative",
          icon: FiCalendar,
          color: "bg-orange-500",
        },
      ]);
      setRecentActivities([
        {
          id: 1,
          type: "donation",
          message: "New donation of $500 received for Ramadan Food Drive",
          time: "2 hours ago",
        },
        {
          id: 2,
          type: "event",
          message: "Friday Prayer event scheduled for this week",
          time: "4 hours ago",
        },
        {
          id: 3,
          type: "campaign",
          message: 'New donation campaign "Clean Water Project" created',
          time: "1 day ago",
        },
        {
          id: 4,
          type: "donor",
          message: "New donor registered: Ahmed Hassan",
          time: "2 days ago",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: "Create Donation Campaign",
      description: "Start a new fundraising campaign",
      icon: FiPlus,
      path: "/admin/donations",
      color: "bg-green-500",
    },
    {
      title: "Schedule Event",
      description: "Plan a community event",
      icon: FiCalendar,
      path: "/admin/events",
      color: "bg-blue-500",
    },
    {
      title: "View Reports",
      description: "Check donation analytics",
      icon: FiEye,
      path: "/admin/donations",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to your admin dashboard. Here's an overview of your community
          platform.
        </p>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      )}

      {/* Stats Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground mt-1">
                      {stat.value}
                    </p>
                    <p
                      className={`text-sm mt-1 ${
                        stat.changeType === "positive"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {stat.change} from last month
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
                  >
                    <Icon size={24} className="text-white" />
                  </div>
                </div>
              </CardContent>
                         </Card>
           );
         })}
         </div>
       )}

      {/* Quick Actions and Recent Activity */}
      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start h-auto p-4"
                  onClick={() => (window.location.href = action.path)}
                >
                  <div
                    className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mr-4`}
                  >
                    <Icon size={20} className="text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-foreground">
                      {action.title}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {action.description}
                    </div>
                  </div>
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">
                      {activity.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>)}

      {/* Welcome Message */}
      {!loading && (
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Welcome to the Admin Panel
              </h3>
              <p className="text-muted-foreground mb-4">
                Use the sidebar navigation to manage different sections of your
                community platform.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  onClick={() => (window.location.href = "/admin/donations")}
                >
                  Manage Donations
                </Button>
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/admin/events")}
                >
                  Manage Events
                </Button>
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/admin/jumaa")}
                >
                  Manage Jumaa
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminDashboardPage;
