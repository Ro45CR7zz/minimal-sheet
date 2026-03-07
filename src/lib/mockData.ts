import { SheetDocument } from "@/src/types";

export const MOCK_DOCS: SheetDocument[] = [
  { 
    id: "doc_1", 
    title: "Q4 Financial Report", 
    authorName: "Alex Rivera",
    authorInitials: "AR",
    updatedAt: "2 hours ago", 
    fileSize: "2.4 MB",
    fileType: "XLSX",
    role: "owner" 
  },
  { 
    id: "doc_2", 
    title: "Marketing Plan 2024", 
    authorName: "Sam Chen",
    authorInitials: "SC",
    updatedAt: "Yesterday", 
    fileSize: "1.1 MB",
    fileType: "editor",
    role: "editor" 
  },
  { 
    id: "doc_3", 
    title: "Inventory Sheet", 
    authorName: "Alex Rivera",
    authorInitials: "AR",
    updatedAt: "Oct 12, 2023", 
    fileSize: "840 KB",
    fileType: "XLSX",
    role: "owner" 
  },
  { 
    id: "doc_4", 
    title: "Project Roadmap", 
    authorName: "Jordan Smith",
    authorInitials: "JS",
    updatedAt: "Oct 10, 2023", 
    fileSize: "3.2 MB",
    fileType: "XLSX",
    role: "editor" 
  },
];