"use client";

import { useEffect, useState } from "react";

interface ActiveUser {
  userId: string;
  userName: string;
  userInitials: string;
  color: string;
}

export function Presence({ documentId }: { documentId: string }) {
  const [users, setUsers] = useState<ActiveUser[]>([]);

  useEffect(() => {
    const pingPresence = async () => {
      try {
        const res = await fetch('/api/presence', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // <--- This tells Next.js how to read the body
          },
          body: JSON.stringify({ documentId })
        });
        if (res.ok) {
          const activeUsers = await res.json();
          setUsers(activeUsers);
        }
      } catch (error) {
        console.error("Presence ping failed", error);
      }
    };

    pingPresence(); // Ping immediately on load
    const interval = setInterval(pingPresence, 5000); // Then ping every 5 seconds

    return () => clearInterval(interval); // Cleanup when user leaves the page
  }, [documentId]);

  if (users.length === 0) return null;

  return (
    <div className="flex items-center mr-4">
      {users.map((user, i) => (
        <div
          key={user.userId}
          title={`${user.userName} is editing`}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-sm transition-all hover:-translate-y-1 cursor-pointer"
          style={{ 
            backgroundColor: user.color, 
            zIndex: 10 - i, 
            marginLeft: i > 0 ? '-10px' : '0' // Overlap the avatars
          }}
        >
          {user.userInitials}
        </div>
      ))}
    </div>
  );
}