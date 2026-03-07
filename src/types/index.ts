export interface SheetDocument {
  id: string;
  title: string;
  updatedAt: string;
  role: "owner" | "editor" | "viewer";
  authorName: string;
  authorInitials: string;
  fileSize: string;
  fileType: string;
}