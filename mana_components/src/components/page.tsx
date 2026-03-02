import {
  databases,
  DATABASE_ID,
  COLLECTION_ID,
  Query,
  Component,
} from "@/lib/appwrite";
import ComponentCard from "./ComponentCard";

export default async function ComponentsPage() {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc("createdAt"),
    ]);

    const components = response.documents as unknown as Component[];

    return (
      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-display font-bold mb-4">
            UI Components
          </h1>
          <p className="text-lg text-muted-foreground">
            Browse our collection of reusable UI components. Each component
            includes instructions, reference images, and copyable code.
          </p>
        </div>

        {components.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No components found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {components.map((component) => (
              <ComponentCard key={component.$id} component={component} />
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching components:", error);
    return (
      <div className="container-custom py-12">
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          Error loading components. Please try again later.
        </div>
      </div>
    );
  }
}
