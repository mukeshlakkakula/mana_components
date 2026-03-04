"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  databases,
  storage,
  DATABASE_ID,
  COLLECTION_ID,
  BUCKET_ID,
} from "@/lib/appwrite";
import { ArrowLeft, Upload, X } from "lucide-react";
import Image from "next/image";

export default function EditComponent() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    code: "",
    instructions: "",
    category: "header",
  });

  useEffect(() => {
    fetchComponent();
  }, []);

  const fetchComponent = async () => {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        COLLECTION_ID,
        params.id as string,
      );
      setFormData({
        title: response.title,
        slug: response.slug,
        code: response.code,
        instructions: response.instructions,
        category: response.category,
      });
      setImages(response.images || []);
      setPreviewImage(response.previewImage || "");
    } catch (error) {
      console.error("Error fetching component:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const response = await storage.createFile(BUCKET_ID, "unique()", file);
        // getFileView returns a URL string directly
        const fileUrl = storage.getFileView(BUCKET_ID, response.$id);
        setImages((prev) => [...prev, fileUrl]);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        params.id as string,
        {
          ...formData,
          images,
          previewImage: previewImage || images[0] || "",
        },
      );

      router.push("/admin");
    } catch (error) {
      console.error("Error updating component:", error);
      setIsLoading(false);
    }
  };

  const removeImage = async (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  if (isFetching) {
    return <div className="container-custom py-12 text-center">Loading...</div>;
  }

  return (
    <div className="container-custom py-12 max-w-4xl">
      <div className="mb-8">
        <Link
          href="/admin"
          className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      <div className="bg-card p-8 rounded-lg border border-border shadow-soft">
        <h1 className="text-2xl font-display font-bold mb-6">Edit Component</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Slug</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="header">Header</option>
              <option value="button">Button</option>
              <option value="card">Card</option>
              <option value="form">Form</option>
              <option value="navigation">Navigation</option>
              <option value="input">Input</option>
              <option value="checkbox">Checkbox</option>
              <option value="radio">Radio Button</option>
              <option value="select">Select Dropdown</option>
              <option value="textarea">Textarea</option>
              <option value="toggle">Toggle/Switch</option>
              <option value="slider">Slider</option>
              <option value="modal">Modal/Dialog</option>
              <option value="tooltip">Tooltip</option>
              <option value="popover">Popover</option>
              <option value="dropdown">Dropdown Menu</option>
              <option value="tabs">Tabs</option>
              <option value="accordion">Accordion</option>
              <option value="table">Table</option>
              <option value="list">List</option>
              <option value="badge">Badge</option>
              <option value="avatar">Avatar</option>
              <option value="alert">Alert/Notification</option>
              <option value="progress">Progress Bar</option>
              <option value="spinner">Spinner/Loader</option>
              <option value="pagination">Pagination</option>
              <option value="breadcrumb">Breadcrumb</option>
              <option value="sidebar">Sidebar</option>
              <option value="footer">Footer</option>
              <option value="hero">Hero Section</option>
              <option value="carousel">Carousel/Slider</option>
              <option value="chart">Chart/Graph</option>
              <option value="icon">Icon</option>
              <option value="image">Image</option>
              <option value="video">Video Player</option>
              <option value="audio">Audio Player</option>
              <option value="datepicker">Date Picker</option>
              <option value="timepicker">Time Picker</option>
              <option value="colorpicker">Color Picker</option>
              <option value="fileupload">File Upload</option>
              <option value="rating">Rating/Stars</option>
              <option value="tag">Tags/Chips</option>
              <option value="timeline">Timeline</option>
              <option value="comment">Comment Section</option>
              <option value="profile">Profile Card</option>
              <option value="pricing">Pricing Card</option>
              <option value="testimonial">Testimonial</option>
              <option value="faq">FAQ Section</option>
              <option value="contact">Contact Form</option>
              <option value="login">Login Form</option>
              <option value="signup">Signup Form</option>
              <option value="search">Search Bar</option>
              <option value="filter">Filter Component</option>
              <option value="sort">Sort Component</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Instructions
            </label>
            <textarea
              value={formData.instructions}
              onChange={(e) =>
                setFormData({ ...formData, instructions: e.target.value })
              }
              rows={5}
              className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Code</label>
            <textarea
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
              rows={10}
              className="w-full px-3 py-2 font-mono text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Reference Images
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-6">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">
                  Click to upload images
                </span>
              </label>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden border border-border group"
                  >
                    <Image
                      src={image}
                      alt={`Upload ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewImage(image)}
                      className={`absolute bottom-1 left-1 px-2 py-1 text-xs rounded ${
                        previewImage === image
                          ? "bg-primary text-primary-foreground"
                          : "bg-card text-foreground"
                      }`}
                    >
                      Preview
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Update Component"}
            </button>
            <Link
              href="/admin"
              className="flex-1 bg-card border border-border text-center py-2 rounded-lg hover:bg-secondary transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
