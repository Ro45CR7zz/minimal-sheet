import { Logo } from "@/src/components/common/Logo";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 selection:bg-blue-100">
      <div className="mb-8 text-center flex flex-col items-center">
        <Link href="/" className="mb-6 hover:opacity-90 transition-opacity">
          <Logo />
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h1>
        <p className="text-slate-500">Manage your data with ease and clarity</p>
      </div>

      {children}

      <p className="mt-8 text-sm text-slate-500 max-w-sm text-center">
        By continuing, you agree to our{" "}
        <a href="#" className="font-medium text-slate-900 hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="font-medium text-slate-900 hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}