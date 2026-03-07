import { cn } from "@/src/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* CSS-drawn version of the MinimalSheet icon */}
      <div className="flex flex-wrap w-8 h-8 gap-0.5 bg-blue-600 p-1 rounded-lg shadow-sm">
        <div className="w-[46%] h-[46%] bg-white rounded-[2px]" />
        <div className="w-[46%] h-[46%] bg-white rounded-[2px]" />
        <div className="w-[46%] h-[46%] bg-blue-400 rounded-[2px]" />
        <div className="w-[46%] h-[46%] bg-white rounded-[2px]" />
      </div>
      <span className="text-xl font-bold tracking-tight text-slate-900">
        MinimalSheet
      </span>
    </div>
  );
}