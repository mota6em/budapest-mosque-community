import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Tabs } from "../components/ui/tabs";
import { FiDollarSign, FiPlus, FiTrash2 } from "react-icons/fi";
import { donationsService } from "../services/adminService";

const AdminDonationsPage = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    amount: "",
    name: "",
    contact: "",
    description: "",
    type: "General",
  });

  const tabs = [
    { id: "list", label: "All Donations" },
    { id: "create", label: "Add Donation" },
  ];

  useEffect(() => {
    loadDonations();
  }, []);

  const loadDonations = async () => {
    try {
      setLoading(true);
      const { data, error } = await donationsService.getAll();
      if (error) {
        console.error("Error loading donations:", error);
      } else {
        setDonations(data || []);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await donationsService.create(formData);
      if (error) {
        console.error("Error creating donation:", error);
      } else {
        setFormData({
          amount: "",
          name: "",
          contact: "",
          description: "",
          type: "General",
        });
        setActiveTab("list");
        loadDonations();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this donation?")) {
      try {
        const { error } = await donationsService.delete(id);
        if (error) {
          console.error("Error deleting donation:", error);
        } else {
          loadDonations();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manage Donations</h1>
        <p className="text-muted-foreground mt-2">
          Create and manage donations for your community.
        </p>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* List Tab */}
      {activeTab === "list" && (
        <div>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading donations...</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {donations.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <FiDollarSign
                      size={48}
                      className="text-muted-foreground mx-auto mb-4"
                    />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      No donations yet
                    </h3>
                    <p className="text-muted-foreground">
                      Start by adding your first donation.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                donations.map((donation) => (
                  <Card key={donation.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">
                              {donation.name}
                            </h3>
                            <span className="text-sm bg-primary text-white px-2 py-1 rounded">
                              ${donation.amount}
                            </span>
                          </div>
                          <p className="text-muted-foreground mb-2">
                            {donation.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Contact: {donation.contact}</span>
                            <span>Type: {donation.type}</span>
                            <span>
                              Date:{" "}
                              {new Date(
                                donation.created_at
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(donation.id)}
                          >
                            <FiTrash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* Create Tab */}
      {activeTab === "create" && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Donation</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Amount ($)
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Contact
                </label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Email or phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Description of the donation"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="General">General</option>
                  <option value="Monthly">Monthly</option>
                  <option value="One-time">One-time</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex items-center gap-2">
                  <FiPlus size={16} />
                  Add Donation
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveTab("list")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminDonationsPage;
