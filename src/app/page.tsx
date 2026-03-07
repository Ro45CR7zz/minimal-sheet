import Link from "next/link";
import { Button } from "@/src/components/common/Button";
import { Logo } from "@/src/components/common/Logo";
import { 
  ArrowPathIcon, 
  ShieldCheckIcon, 
  CodeBracketIcon 
} from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/20/solid";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* 1. Navbar */}
      <header className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <Logo />
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="#features" className="hover:text-slate-900 transition-colors">Product</Link>
          <Link href="#features" className="hover:text-slate-900 transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</Link>
          <Link href="/login" className="hover:text-slate-900 transition-colors">Login</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/signup">
            <Button variant="primary">Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center">
        {/* 2. Hero Section */}
        <section className="w-full max-w-5xl px-6 pt-24 pb-16 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            New: v2.0 is now live
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 max-w-4xl">
            Real-time collaboration <br className="hidden md:block" /> for modern teams.
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl">
            Experience a faster, cleaner way to manage data with your team. MinimalSheet simplifies complex workflows with intuitive, lightning-fast design.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto">Get Started</Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white">View Demo</Button>
            </Link>
          </div>
        </section>

        {/* 3. App Mockup / Graphic */}
        <section className="w-full max-w-6xl px-6 pb-24">
          <div className="relative w-full aspect-video bg-white rounded-2xl shadow-xl border border-slate-200 flex flex-col overflow-hidden">
            {/* Fake Mac Window Controls */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <div className="mx-auto text-xs font-medium text-slate-400">Project_Financials_2024.msheet</div>
            </div>
            {/* Fake Grid */}
            <div className="flex-1 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-slate-400 font-medium">App Interface Mockup Goes Here</p>
            </div>
          </div>
        </section>

        {/* 4. Features Section */}
        <section id="features" className="w-full bg-slate-100 py-24">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                <ArrowPathIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Real-time Sync</h3>
              <p className="text-slate-500 leading-relaxed">Changes reflect instantly across all devices. No more "conflicting copy" errors or manual refreshes.</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                <ShieldCheckIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Advanced Permissions</h3>
              <p className="text-slate-500 leading-relaxed">Control who can view, edit, or comment with granular roles. Secure your sensitive data effortlessly.</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                <CodeBracketIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">API First</h3>
              <p className="text-slate-500 leading-relaxed">Connect your spreadsheet data to your favorite tools and automate workflows with our robust API.</p>
            </div>
          </div>
        </section>

        {/* 5. Pricing Section */}
        <section id="pricing" className="w-full max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-slate-500">Choose the plan that's right for your team.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col">
              <h3 className="text-sm font-bold tracking-wider text-slate-500 uppercase mb-4">Free</h3>
              <div className="mb-6"><span className="text-5xl font-bold text-slate-900">$0</span><span className="text-slate-500">/mo</span></div>
              <p className="text-slate-500 mb-8 text-sm">For individuals getting started.</p>
              <Button variant="outline" className="w-full mb-8">Get Started</Button>
              <ul className="flex flex-col gap-4 text-sm text-slate-600 flex-1">
                <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-500" /> Unlimited sheets</li>
                <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-500" /> 3 collaborators</li>
                <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-500" /> Basic history</li>
              </ul>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-2xl border-2 border-blue-500 p-8 shadow-md relative flex flex-col">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                Most Popular
              </div>
              <h3 className="text-sm font-bold tracking-wider text-blue-600 uppercase mb-4">Pro</h3>
              <div className="mb-6"><span className="text-5xl font-bold text-slate-900">$12</span><span className="text-slate-500">/mo</span></div>
              <p className="text-slate-500 mb-8 text-sm">For small teams that need power.</p>
              <Button variant="primary" className="w-full mb-8">Try Pro Free</Button>
              <ul className="flex flex-col gap-4 text-sm text-slate-600 flex-1">
                <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-blue-500" /> Everything in Free</li>
                <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-blue-500" /> Unlimited collaborators</li>
                <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-blue-500" /> Advanced automation</li>
              </ul>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col">
              <h3 className="text-sm font-bold tracking-wider text-slate-500 uppercase mb-4">Enterprise</h3>
              <div className="mb-6"><span className="text-5xl font-bold text-slate-900">$49</span><span className="text-slate-500">/mo</span></div>
              <p className="text-slate-500 mb-8 text-sm">For large-scale organizations.</p>
              <Button variant="outline" className="w-full mb-8 bg-slate-50">Contact Sales</Button>
              <ul className="flex flex-col gap-4 text-sm text-slate-600 flex-1">
                <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-500" /> Everything in Pro</li>
                <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-500" /> SSO & SAML</li>
                <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-500" /> Dedicated support</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 6. Bottom CTA */}
        <section className="w-full max-w-5xl mx-auto px-6 pb-24">
          <div className="bg-blue-500 rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Ready to simplify your workflow?</h2>
            <p className="text-blue-100 mb-8 text-lg">Join thousands of teams using MinimalSheet to stay organized and collaborative.</p>
            <Link href="/signup">
              <Button variant="outline" size="lg" className="bg-white text-blue-600 border-none hover:bg-slate-50">
                Get Started for Free
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* 7. Footer */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo className="scale-90" />
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link href="#" className="hover:text-slate-900">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-900">Terms of Service</Link>
            <Link href="#" className="hover:text-slate-900">Cookie Policy</Link>
            <Link href="#" className="hover:text-slate-900">Contact</Link>
          </div>
          <p className="text-sm text-slate-400">© 2024 MinimalSheet. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}