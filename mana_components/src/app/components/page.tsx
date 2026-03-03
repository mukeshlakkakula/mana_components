"use client";

import { useState, useEffect } from "react";
import { databases, DATABASE_ID, COLLECTION_ID, Query } from "@/lib/appwrite";
import ComponentCard from "@/components/ComponentCard";
import { Search, X } from "lucide-react";

interface Component {
  $id: string;
  title: string;
  slug: string;
  code: string;
  instructions: string;
  images: string[];
  previewImage?: string;
  category: string;
  createdAt: string;
}

export default function ComponentsPage() {
  const [components, setComponents] = useState<Component[]>([]);
  const [filteredComponents, setFilteredComponents] = useState<Component[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState("");

  // Fetch components on mount
  useEffect(() => {
    fetchComponents();
  }, []);

  // Apply filters whenever searchTerm or selectedCategory changes
  useEffect(() => {
    filterComponents();
  }, [searchTerm, selectedCategory, components]);

  const fetchComponents = async () => {
    try {
      setIsLoading(true);
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.orderDesc("createdAt")],
      );

      const fetchedComponents = response.documents as unknown as Component[];
      setComponents(fetchedComponents);
      setFilteredComponents(fetchedComponents);

      // Extract unique categories
      const uniqueCategories = [
        ...new Set(fetchedComponents.map((c) => c.category)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching components:", error);
      setError("Failed to load components. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const filterComponents = () => {
    let filtered = [...components];

    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (component) =>
          component.title.toLowerCase().includes(term) ||
          component.category.toLowerCase().includes(term) ||
          (component.instructions &&
            component.instructions.toLowerCase().includes(term)),
      );
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (component) => component.category === selectedCategory,
      );
    }

    setFilteredComponents(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
  };

  if (isLoading) {
    return (
      <div className="container-custom py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-custom py-12">
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-display font-bold mb-4">UI Components</h1>
        <p className="text-lg text-muted-foreground">
          Browse our collection of reusable UI components. Each component
          includes instructions, reference images, and copyable code.
        </p>
      </div>

      {/* Search and Filters - THESE WILL NOW SHOW UP */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Search components by title, category, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-card"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Filter by:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-input rounded-sm focus:outline-none focus:ring-2 focus:ring-ring bg-card"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Results count and clear filters */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              {filteredComponents.length}{" "}
              {filteredComponents.length === 1 ? "component" : "components"}{" "}
              found
            </span>
            {(searchTerm || selectedCategory !== "all") && (
              <button
                onClick={clearFilters}
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Components Grid */}
      {filteredComponents.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-lg border border-border">
          <p className="text-muted-foreground mb-4">
            No components found matching your criteria.
          </p>
          <button
            onClick={clearFilters}
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComponents.map((component) => (
            <ComponentCard key={component.$id} component={component} />
          ))}
        </div>
      )}
    </div>
  );
}
