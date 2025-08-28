import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Tabs } from "../components/ui/tabs";
import { FiUsers, FiPlus, FiTrash2 } from "react-icons/fi";
import { jumaaService } from "../services/adminService";

const AdminJumaaPage = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [joumaa, setJoumaa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    language: "English",
    description: "",
    imam: "",
    date: "",
  });

  const tabs = [
    { id: "list", label: "All Jumaa" },
    { id: "create", label: "Add Jumaa" },
  ];

  useEffect(() => {
    loadJoumaa();
  }, []);

  const loadJoumaa = async () => {
    try {
      setLoading(true);
      const { data, error } = await jumaaService.getAll();
      if (error) {
        console.error("Error loading joumaa:", error);
      } else {
        setJoumaa(data || []);
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
      const { error } = await jumaaService.create(formData);
      if (error) {
        console.error("Error creating joumaa:", error);
      } else {
        setFormData({
          title: "",
          link: "",
          language: "English",
          description: "",
          imam: "",
          date: "",
        });
        setActiveTab("list");
        loadJoumaa();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Jumaa entry?")) {
      try {
        const { error } = await jumaaService.delete(id);
        if (error) {
          console.error("Error deleting joumaa:", error);
        } else {
          loadJoumaa();
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
        <h1 className="text-3xl font-bold text-foreground">Manage Jumaa</h1>
        <p className="text-muted-foreground mt-2">
          Manage Friday prayer schedules and announcements.
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
              <p className="text-muted-foreground">Loading Jumaa entries...</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {joumaa.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <FiUsers
                      size={48}
                      className="text-muted-foreground mx-auto mb-4"
                    />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      No Jumaa entries yet
                    </h3>
                    <p className="text-muted-foreground">
                      Start by adding your first Jumaa entry.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                joumaa.map((entry) => (
                  <Card key={entry.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">
                              {entry.title}
                            </h3>
                            <span className="text-sm bg-green-500 text-white px-2 py-1 rounded">
                              {entry.language}
                            </span>
                          </div>
                          <p className="text-muted-foreground mb-2">
                            {entry.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Imam: {entry.imam}</span>
                            <span>
                              Date: {new Date(entry.date).toLocaleDateString()}
                            </span>
                            {entry.link && (
                              <a
                                href={entry.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                              >
                                View Link
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(entry.id)}
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
            <CardTitle>Add New Jumaa Entry</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Imam
                  </label>
                  <input
                    type="text"
                    name="imam"
                    value={formData.imam}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Imam name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Language
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="English">English</option>
                    <option value="Arabic">Arabic</option>
                    <option value="Urdu">Urdu</option>
                    <option value="Bengali">Bengali</option>
                    <option value="Turkish">Turkish</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Link
                </label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="https://example.com/joumaa-link"
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
                  placeholder="Description of the Jumaa"
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex items-center gap-2">
                  <FiPlus size={16} />
                  Add Jumaa Entry
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

export default AdminJumaaPage;
