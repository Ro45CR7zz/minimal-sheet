# 📊 MinimalSheet

MinimalSheet is a full-stack, real-time collaborative spreadsheet application built with Next.js. It features a custom formula parser, infinite scrolling, cell formatting, and live presence tracking, all backed by a secure MongoDB database.

## ✨ Major Features

* **Smart Spreadsheet Core:** A custom-built formula parser that handles mathematical operations and functions (e.g., `=SUM(A1:B5)`), complete with circular reference protection.
* **Rich Cell Formatting:** Apply Bold, Italic, and custom text colors on a per-cell basis.
* **Dynamic Grid Layout:** Drag-and-drop column reordering and smooth mouse-based row/column resizing.
* **Real-time Presence:** "Heartbeat" polling surfaces active collaborators in the same document with sticky, color-coded avatars.
* **Cloud Sync & Auto-save:** Edits are automatically saved to MongoDB. 
* **Document Management:** A dedicated dashboard to view, create, star, and move spreadsheets to the trash.
* **Secure Authentication:** Full user login and signup flows protected by Next.js Middleware and `better-auth`.

## 🛠️ Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **State Management:** Zustand
* **Database:** MongoDB Atlas
* **Authentication:** better-auth
* **Icons:** Heroicons

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### 1. Clone the repository
```bash
git clone [https://github.com/your-username/minimal-sheet.git](https://github.com/your-username/minimal-sheet.git)
cd minimal-sheet
