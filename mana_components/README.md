# 🚀 Mana UI Components Platform

Mana Components is a dynamic UI component showcase platform built using Next.js (App Router) and Appwrite.

It allows developers to browse reusable UI components with:

- 📸 Reference Images
- 📝 Step-by-step Instructions
- 💻 Toggleable & Copyable Code Blocks
- 🔐 Admin Panel for Managing Components
- ☁️ Backend powered by Appwrite

---

# 🧱 Tech Stack

## Frontend

- Next.js (App Router)
- React
- Tailwind CSS
- TypeScript

## Backend

- Appwrite
  - Authentication
  - Database
  - Storage
  - Role-based permissions

---

# 📂 Project Structure

app/
components/
[slug]/
page.tsx → Dynamic component page

admin/
page.tsx → Admin dashboard
create/
edit/[id]/

components/
CodeBlock.tsx

lib/
appwrite.ts → Appwrite configuration

---

# ⚙️ Features

## Public Side

- View UI components
- Reference images display
- Instructions section
- Show/Hide code functionality
- Copy code to clipboard

## Admin Panel

- Secure login using Appwrite Auth
- Add new components
- Edit components
- Delete components
- Upload reference images
- Store preview image (future feature)

---

# 🗄️ Database Setup (Appwrite)

## 1️⃣ Create Database

Database Name:
mana_components

Collection Name:
components

## 2️⃣ Document Structure

Each component document should contain:

{
"title": "Mobile Menu",
"slug": "mobile-menu",
"code": "Full component code string...",
"instructions": "Step-by-step guide...",
"images": ["image-url-1", "image-url-2"],
"previewImage": "preview-thumbnail-url",
"category": "header",
"createdAt": "auto"
}

---

# 🔐 Appwrite Setup

## Install Appwrite SDK

npm install appwrite

---

## Create Appwrite Config

Create file:
lib/appwrite.ts

Add:

import { Client, Databases, Account, Storage } from "appwrite";

const client = new Client()
.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const databases = new Databases(client);
export const account = new Account(client);
export const storage = new Storage(client);

---

## Environment Variables

Create `.env.local`

NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_DATABASE_ID=your_database_id
NEXT_PUBLIC_COLLECTION_ID=your_collection_id
NEXT_PUBLIC_BUCKET_ID=your_bucket_id

Restart the development server after adding environment variables.

---

# 🔄 Dynamic Component Page

Create:
app/components/[slug]/page.tsx

Example implementation:

import { databases } from "@/lib/appwrite";
import CodeBlock from "@/components/CodeBlock";

export default async function Page({ params }: any) {
const res = await databases.listDocuments(
process.env.NEXT_PUBLIC_DATABASE_ID!,
process.env.NEXT_PUBLIC_COLLECTION_ID!,
[`equal("slug", "${params.slug}")`]
);

const component = res.documents[0];

return (
<CodeBlock
      code={component.code}
      images={component.images}
      instructions={component.instructions}
    />
);
}

---

# 🖼️ Future Feature: Preview Image System

Each component will support:

previewImage

Planned behavior:

- Display preview image on homepage grid
- Click → Open component detail page
- Used as thumbnail card

Future upgrades:

- Auto-generate preview image
- Live preview iframe
- Theme switch preview
- Code sandbox integration

---

# 🛡️ Admin Panel Security

Recommended:

- Restrict write access to admin users only
- Protect `/admin` route
- Use Appwrite role-based permissions
  - Read: Public
  - Write: Admin only

---

# 🚀 Running the Project

Install dependencies:

npm install

Start development server:

npm run dev

Open:

http://localhost:3000

---

# 🌟 Roadmap

- Component categories
- Tags & search functionality
- Dark/light preview toggle
- Live code sandbox preview
- Like / bookmark system
- User submissions
- YouTube tutorial integration
- Premium components support

---

# 📜 License

MIT License
