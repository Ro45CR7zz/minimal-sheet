import Link from "next/link";
import { Grid } from "@/src/components/editor/Grid";
import { Button } from "@/src/components/common/Button";
import { Logo } from "@/src/components/common/Logo";
import { 
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  Bars3Icon,
  ShareIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline";

export default function DocumentEditorPage({ params }: { params: { id: string } }) {
  // In a real app, we would fetch the document title using params.id
  const docTitle = "Q4 Financial Report";

  return (
    <div className="flex flex-col h-screen bg-white text-slate-900 overflow-hidden">
      
      {/* 1. TOP HEADER */}
      <header className="flex items-center justify-between px-4 py-2 border-b border-slate-200 bg-white shrink-0 relative">
        
        {/* Left: Logo & Title */}
        <div className="flex items-center gap-3 w-1/3">
          <Link href="/dashboard" className="hover:opacity-80 transition-opacity">
            {/* Using our custom Logo component again, scaled down to fit the header */}
            <Logo className="scale-75 origin-left" /> 
          </Link>
          
          <div className="w-px h-6 bg-slate-300 hidden sm:block" />
          
          <input 
            type="text" 
            defaultValue={docTitle}
            // Added mt-0.5 to nudge it down slightly, made it a bit wider
            className="font-medium text-slate-900 text-base px-2 py-1 mt-0.5 border border-transparent hover:border-slate-300 focus:border-blue-500 rounded-md outline-none transition-colors w-full max-w-[220px]"
          />
        </div>

        {/* Center: Menubar */}
        <div className="hidden md:flex flex-1 justify-center items-center">
          <div className="flex gap-1 text-sm text-slate-600 font-medium">
            <button className="hover:bg-slate-100 px-3 py-1.5 rounded-md transition-colors">File</button>
            <button className="hover:bg-slate-100 px-3 py-1.5 rounded-md transition-colors">Edit</button>
            <button className="hover:bg-slate-100 px-3 py-1.5 rounded-md transition-colors">View</button>
            <button className="hover:bg-slate-100 px-3 py-1.5 rounded-md transition-colors">Insert</button>
          </div>
        </div>

        {/* Right: Status & Actions */}
        <div className="flex items-center justify-end gap-3 w-1/3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-200">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            All changes saved
          </div>
          <Button variant="primary" size="sm" className="gap-2 rounded-full px-4 h-8">
            Share
          </Button>
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 text-sm font-bold border border-slate-200 shadow-sm cursor-pointer hover:ring-2 ring-blue-500 ring-offset-2 transition-all">
            HK
          </div>
        </div>
      </header>

      {/* 2. FORMATTING TOOLBAR */}
      <div className="flex items-center gap-1 px-4 py-1.5 border-b border-slate-200 bg-slate-50 shrink-0 overflow-x-auto no-scrollbar">
        <button className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-md transition-colors"><ArrowUturnLeftIcon className="w-4 h-4" /></button>
        <button className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-md transition-colors"><ArrowUturnRightIcon className="w-4 h-4" /></button>
        
        <div className="w-px h-5 bg-slate-300 mx-2" />
        
        <button className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-md transition-colors font-serif font-bold text-sm">B</button>
        <button className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-md transition-colors font-serif italic text-sm">I</button>
        <button className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-md transition-colors font-serif underline text-sm">U</button>
        
        <div className="w-px h-5 bg-slate-300 mx-2" />
        
        {/* Placeholder for text alignment and other tools */}
        <div className="text-xs text-slate-400 italic px-2">More tools...</div>
      </div>

      {/* 3. FORMULA BAR */}
      <div className="flex items-center border-b border-slate-200 bg-white shrink-0">
        <div className="w-10 flex justify-center py-1.5 border-r border-slate-200 bg-slate-50 shrink-0">
          <span className="text-slate-400 font-serif italic text-sm">fx</span>
        </div>
        <input 
          type="text" 
          placeholder="Enter value or formula..."
          className="flex-1 px-3 py-1.5 text-sm outline-none font-mono text-slate-800"
        />
      </div>

      {/* 4. SPREADSHEET GRID (Placeholder) */}
      <Grid />

    </div>
  );
}