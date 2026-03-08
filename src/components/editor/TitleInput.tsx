"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function TitleInput({ currentId }: { currentId: string }) {
  // If we are at /document/new, default to Untitled
  const isNew = currentId === "new";
  const [title, setTitle] = useState(isNew ? "Untitled Document" : currentId);
  const router = useRouter();

  const handleSave = async () => {
    if (!title.trim() || title === currentId) return;

    // Convert "My Sheet" to "my-sheet" for a cleaner URL endpoint
    const newId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // Save to our new backend API
    await fetch('/api/save', {
      method: 'POST',
      body: JSON.stringify({ id: newId, title: title })
    });

    // If the ID changed (e.g., from 'new' to 'hello1'), update the URL!
    if (currentId !== newId) {
      router.push(`/document/${newId}`);
    }
  };

  return (
    <input 
      type="text" 
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      onBlur={handleSave}
      onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
      className="font-medium text-slate-900 text-base px-2 py-1 mt-0.5 border border-transparent hover:border-slate-300 focus:border-blue-500 rounded-md outline-none transition-colors w-full max-w-[220px]"
    />
  );
}