import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { Grid } from "@/src/components/editor/Grid";
import { Button } from "@/src/components/common/Button";
import { Logo } from "@/src/components/common/Logo";
import { FormulaBar } from "@/src/components/editor/FormulaBar";
import { Toolbar } from "@/src/components/editor/Toolbar";
import { TitleInput } from "@/src/components/editor/TitleInput";
import { Presence } from "@/src/components/editor/Presence";
import { 
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  Bars3Icon,
  ShareIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline";

export default async function DocumentEditorPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  // 1. Fetch the active session securely on the server
  const session = await auth.api.getSession({
    headers: await headers(), 
  });
  const user = session?.user;

  // 2. Extract initials
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2)
    : "??";

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
          
          <TitleInput currentId={id} />
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
          
          {/* OVERLAPPING AVATARS GO HERE */}
          <Presence documentId={id} />

          {/* NEW SAVE BUTTON */}
          <Button variant="primary" size="sm" className="gap-2 rounded-full px-6 h-8 font-medium">
            Save
          </Button>
          
          <div className="w-px h-6 bg-slate-200 mx-1 hidden sm:block" /> {/* Divider */}

          <div 
            className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 text-sm font-bold border border-slate-200 shadow-sm cursor-pointer hover:ring-2 ring-blue-500 ring-offset-2 transition-all"
            title={user?.email} 
          >
            {initials}
          </div>
        </div>
      </header>

      {/* 2. FORMATTING TOOLBAR */}
      <Toolbar />

      {/* 3. FORMULA BAR */}
      <FormulaBar />

      {/* 4. SPREADSHEET GRID (Placeholder) */}
      <Grid />

    </div>
  );
}