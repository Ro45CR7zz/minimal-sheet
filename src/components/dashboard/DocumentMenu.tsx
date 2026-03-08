"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  EllipsisVerticalIcon, 
  StarIcon, 
  TrashIcon, 
  ArrowUturnLeftIcon 
} from "@heroicons/react/24/outline";

export function DocumentMenu({ doc }: { doc: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the dropdown if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateStatus = async (updates: any) => {
    setIsOpen(false);
    await fetch('/api/document/update', {
      method: 'PATCH',
      body: JSON.stringify({ id: doc.id, ...updates })
    });
    router.refresh(); // Tell Next.js to re-fetch the server component!
  };

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={(e) => {
          e.preventDefault(); // Prevent triggering the row click
          setIsOpen(!isOpen);
        }} 
        className="p-1.5 rounded-md text-slate-400 hover:bg-slate-200 hover:text-slate-900 transition-colors"
      >
        <EllipsisVerticalIcon className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-50 py-1">
          {!doc.isTrashed && (
            <button 
              onClick={(e) => { e.preventDefault(); updateStatus({ isStarred: !doc.isStarred }); }} 
              className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
            >
              <StarIcon className={`w-4 h-4 ${doc.isStarred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
              {doc.isStarred ? 'Unstar' : 'Star'}
            </button>
          )}

          {doc.isTrashed ? (
             <button 
                onClick={(e) => { e.preventDefault(); updateStatus({ isTrashed: false }); }} 
                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
               <ArrowUturnLeftIcon className="w-4 h-4" /> Restore
             </button>
          ) : (
            <button 
              onClick={(e) => { e.preventDefault(); updateStatus({ isTrashed: true, isStarred: false }); }} 
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <TrashIcon className="w-4 h-4" /> Move to Trash
            </button>
          )}
        </div>
      )}
    </div>
  );
}