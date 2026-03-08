"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp } from "@/src/lib/auth-client";
import { Button } from "@/src/components/common/Button";
import { Input } from "@/src/components/common/Input";
import { EnvelopeIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";

export default function SignupPage() {
  const router = useRouter();
  
  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // UI State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Call Better Auth's signup method
    const { data, error: signUpError } = await signUp.email({
      email,
      password,
      name,
    });

    if (signUpError) {
      setError(signUpError.message || "Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    // If successful, redirect to the dashboard!
    if (data) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
      {/* Tab Switcher */}
      <div className="flex p-1 bg-slate-50 rounded-lg mb-8 border border-slate-200">
        <Link 
          href="/login" 
          className="flex-1 text-center py-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          Login
        </Link>
        <div className="flex-1 text-center py-2 text-sm font-medium bg-white rounded-md shadow-sm text-blue-600 cursor-default">
          Signup
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSignup} className="flex flex-col gap-5">
        {/* Error Message Display */}
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
            {error}
          </div>
        )}

        <Input
          id="name"
          type="text"
          label="Full Name"
          placeholder="Jane Doe"
          icon={<UserIcon className="w-5 h-5" />}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
        />

        <Input
          id="email"
          type="email"
          label="Email Address"
          placeholder="name@company.com"
          icon={<EnvelopeIcon className="w-5 h-5" />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium text-slate-700">Password</label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            icon={<LockClosedIcon className="w-5 h-5" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            disabled={loading}
          />
          <span className="text-xs text-slate-500 mt-1">Must be at least 8 characters.</span>
        </div>

        <Button 
          type="submit" 
          variant="primary" 
          size="lg" 
          className="mt-2 w-full"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      
    </div>
  );
}