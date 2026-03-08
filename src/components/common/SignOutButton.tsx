"use client";

import { signOut } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <button 
      onClick={handleSignOut}
      className="text-slate-400 hover:text-red-600 transition-colors"
      title="Sign Out"
    >
      <ArrowRightOnRectangleIcon className="w-6 h-6" />
    </button>
  );
}