import { db } from "../lib/supabase";

// Donations Management
export const donationsService = {
  // Get all donations
  getAll: async () => {
    return await db.query("donation", {
      orderBy: { column: "created_at", ascending: false },
    });
  },

  // Get donation by ID
  getById: async (id) => {
    return await db.query("donation", {
      where: { id },
    });
  },

  // Create new donation
  create: async (donationData) => {
    return await db.insert("donation", donationData);
  },

  // Update donation
  update: async (id, donationData) => {
    return await db.update("donation", donationData, { id });
  },

  // Delete donation
  delete: async (id) => {
    return await db.delete("donation", { id });
  },

  // Get donation statistics
  getStats: async () => {
    const { data, error } = await db.query("donation", {
      select: "amount",
    });

    if (error) return { error };

    const totalAmount = data.reduce(
      (acc, donation) => acc + parseFloat(donation.amount || 0),
      0
    );

    return {
      data: {
        totalRaised: totalAmount,
        totalGoal: 0,
        progress: 0,
      },
    };
  },
};

// Events Management
export const eventsService = {
  // Get all events
  getAll: async () => {
    return await db.query("event", {
      orderBy: { column: "date", ascending: true },
    });
  },

  // Get event by ID
  getById: async (id) => {
    return await db.query("event", {
      where: { id },
    });
  },

  // Create new event
  create: async (eventData) => {
    return await db.insert("event", eventData);
  },

  // Update event
  update: async (id, eventData) => {
    return await db.update("event", eventData, { id });
  },

  // Delete event
  delete: async (id) => {
    return await db.delete("event", { id });
  },

  // Get upcoming events
  getUpcoming: async () => {
    const today = new Date().toISOString().split("T")[0];
    return await db.query("event", {
      where: { date: today },
      orderBy: { column: "date", ascending: true },
    });
  },
};

// Jumaa Management
export const jumaaService = {
  // Get all jumaa entries
  getAll: async () => {
    return await db.query("joumaa", {
      orderBy: { column: "date", ascending: false },
    });
  },

  // Get jumaa by ID
  getById: async (id) => {
    return await db.query("joumaa", {
      where: { id },
    });
  },

  // Create new jumaa entry
  create: async (jumaaData) => {
    return await db.insert("joumaa", jumaaData);
  },

  // Update jumaa entry
  update: async (id, jumaaData) => {
    return await db.update("joumaa", jumaaData, { id });
  },

  // Delete jumaa entry
  delete: async (id) => {
    return await db.delete("joumaa", { id });
  },

  // Get next jumaa
  getNext: async () => {
    const today = new Date().toISOString().split("T")[0];
    return await db.query("joumaa", {
      where: { date: today },
      orderBy: { column: "date", ascending: true },
      limit: 1,
    });
  },
};

// Dashboard Statistics
export const dashboardService = {
  // Get dashboard overview
  getOverview: async () => {
    try {
      // Get donations stats
      const donationsStats = await donationsService.getStats();

      // Get upcoming events count
      const upcomingEvents = await eventsService.getUpcoming();

      // Get next jumaa
      const nextJumaa = await jumaaService.getNext();

      return {
        data: {
          totalDonations: donationsStats.data?.totalRaised || 0,
          totalGoal: donationsStats.data?.totalGoal || 0,
          progress: donationsStats.data?.progress || 0,
          upcomingEvents: upcomingEvents.data?.length || 0,
          nextJumaa: nextJumaa.data?.[0] || null,
        },
      };
    } catch (error) {
      return { error };
    }
  },

  // Get recent activity
  getRecentActivity: async () => {
    try {
      // Get recent donations
      const recentDonations = await db.query("donation", {
        orderBy: { column: "created_at", ascending: false },
        limit: 5,
      });

      // Get recent events
      const recentEvents = await db.query("event", {
        orderBy: { column: "created_at", ascending: false },
        limit: 5,
      });

      // Combine and sort by date
      const activities = [
        ...(recentDonations.data || []).map((item) => ({
          ...item,
          type: "donation",
          activity: `New donation campaign: ${item.title}`,
        })),
        ...(recentEvents.data || []).map((item) => ({
          ...item,
          type: "event",
          activity: `New event scheduled: ${item.title}`,
        })),
      ]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 10);

      return { data: activities };
    } catch (error) {
      return { error };
    }
  },
};
