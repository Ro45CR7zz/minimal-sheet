"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/src/lib/auth-client";
import { Button } from "@/src/components/common/Button";
import { Input } from "@/src/components/common/Input";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  const router = useRouter();
  
  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // UI State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Call Better Auth's signin method
    const { data, error: signInError } = await signIn.email({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message || "Invalid email or password.");
      setLoading(false);
      return;
    }

    // If successful, route them to their workspace!
    if (data) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
      {/* Tab Switcher */}
      <div className="flex p-1 bg-slate-50 rounded-lg mb-8 border border-slate-200">
        <div className="flex-1 text-center py-2 text-sm font-medium bg-white rounded-md shadow-sm text-blue-600 cursor-default">
          Login
        </div>
        <Link 
          href="/signup" 
          className="flex-1 text-center py-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          Signup
        </Link>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        {/* Error Message Display */}
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
            {error}
          </div>
        )}

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
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="text-sm font-medium text-slate-700">Password</label>
            <Link href="/forgot-password" className="text-xs font-medium text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            icon={<LockClosedIcon className="w-5 h-5" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <Button 
          type="submit" 
          variant="primary" 
          size="lg" 
          className="mt-2 w-full"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

    </div>
  );
}