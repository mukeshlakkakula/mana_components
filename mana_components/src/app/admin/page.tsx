"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  account,
  databases,
  DATABASE_ID,
  COLLECTION_ID,
  Query,
  Component,
} from "@/lib/appwrite";
import { Plus, Edit, Trash2, LogOut } from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [components, setComponents] = useState<Component[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    checkSession();
    if (isAuthenticated) {
      fetchComponents();
    }
  }, [isAuthenticated]);

  const checkSession = async () => {
    try {
      await account.get();
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchComponents = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.orderDesc("createdAt")],
      );
      setComponents(response.documents as unknown as Component[]);
    } catch (error) {
      console.error("Error fetching components:", error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await account.createEmailPasswordSession(email, password);
      setIsAuthenticated(true);
    } catch (error) {
      setError("Invalid credentials");
    }
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this component?")) return;

    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      fetchComponents();
    } catch (error) {
      console.error("Error deleting component:", error);
    }
  };

  if (isLoading) {
    return <div className="container-custom py-12 text-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="container-custom py-12 max-w-md mx-auto">
        <div className="bg-card p-8 rounded-lg border border-border shadow-soft">
          <h1 className="text-2xl font-display font-bold mb-6">Admin Login</h1>

          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
        <div className="flex space-x-4">
          <Link
            href="/admin/create"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Component</span>
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-secondary transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border shadow-soft overflow-hidden">
        <table className="w-full">
          <thead className="bg-secondary/50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Title</th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">Slug</th>
              <th className="px-6 py-3 text-right text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {components.map((component) => (
              <tr key={component.$id} className="hover:bg-secondary/20">
                <td className="px-6 py-4">{component.title}</td>
                <td className="px-6 py-4 capitalize">{component.category}</td>
                <td className="px-6 py-4 text-muted-foreground">
                  {component.slug}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Link
                    href={`/admin/edit/${component.$id}`}
                    className="inline-flex items-center p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(component.$id)}
                    className="inline-flex items-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {components.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No components yet. Create your first one!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
