import { databases, DATABASE_ID, COLLECTION_ID, Query } from "@/lib/appwrite";
import CodeBlock from "../CodeBlock";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ComponentPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("slug", slug),
    ]);

    if (response.documents.length === 0) {
      notFound();
    }

    const component = response.documents[0];

    return (
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-display font-bold mb-2">
            {component.title}
          </h1>
          <p className="text-muted-foreground mb-8 capitalize">
            Category: {component.category}
          </p>

          <CodeBlock
            title={component.title}
            code={component.code}
            images={component.images}
            instructions={component.instructions}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching component:", error);
    return (
      <div className="container-custom py-12">
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          Error loading component. Please try again later.
        </div>
      </div>
    );
  }
}
