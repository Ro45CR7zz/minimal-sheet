import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import { SignOutButton } from "@/src/components/common/SignOutButton";
import { Logo } from "@/src/components/common/Logo";
import { Button } from "@/src/components/common/Button";
import clientPromise from "@/src/lib/mongodb";
import Link from "next/link";
import { DocumentMenu } from "@/src/components/dashboard/DocumentMenu";
import { 
  ClockIcon, 
  StarIcon, 
  TrashIcon,
  MagnifyingGlassIcon,
  BellIcon,
  ListBulletIcon,
  Squares2X2Icon,
  EllipsisVerticalIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TableCellsIcon
} from "@heroicons/react/24/outline";

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {

  // 1. Await params and headers
  const { tab = "recent" } = await searchParams;
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2)
    : "??";

  // 2. Build the database filter based on the current tab
  const client = await clientPromise;
  const db = client.db();
  
  let dbFilter: any = { authorId: user?.id };
  
  if (tab === "trash") {
    dbFilter.isTrashed = true;
  } else if (tab === "starred") {
    dbFilter.isStarred = true;
    dbFilter.isTrashed = { $ne: true };
  } else {
    dbFilter.isTrashed = { $ne: true };
  }

  // 3. Fetch data
  const totalDocs = await db.collection("documents").countDocuments(dbFilter);

  const rawDocs = await db.collection("documents")
    .find(dbFilter)
    .sort({ updatedAt: -1 })
    .limit(5)
    .toArray();

  const REAL_DOCS = rawDocs.map(doc => ({
    id: doc.id,
    title: doc.title,
    updatedAt: doc.updatedAt,
    authorName: doc.authorName,
    authorInitials: doc.authorInitials,
    isStarred: doc.isStarred || false,
    isTrashed: doc.isTrashed || false,
    fileSize: "12 KB",
    fileType: "Sheet",
  }));

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900">
      
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-transparent">
          <Link href="/">
            <Logo className="scale-90 origin-left" />
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
          <Link href="/dashboard?tab=recent" className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${tab === 'recent' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
            <ClockIcon className="w-5 h-5" /> Recent
          </Link>

          <Link href="/dashboard?tab=starred" className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${tab === 'starred' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
            <StarIcon className="w-5 h-5" /> Starred
          </Link>

          <Link href="/dashboard?tab=trash" className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${tab === 'trash' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
            <TrashIcon className="w-5 h-5" /> Trash
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* TOP HEADER */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search spreadsheets..." 
                className="w-full bg-slate-100 text-sm rounded-lg pl-10 pr-4 py-2 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 ml-4">
            <Link href="/document/new">
              <Button variant="primary" size="sm" className="hidden sm:flex gap-1.5">
                <span className="text-lg leading-none mb-0.5">+</span> New Document
              </Button>
            </Link>

            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <BellIcon className="w-6 h-6" />
            </button>

            <div className="w-px h-6 bg-slate-200 mx-1" />

            <button 
              className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 font-bold text-xs flex items-center justify-center hover:ring-2 ring-blue-500 ring-offset-2 transition-all"
              title={user?.email}
            >
              {initials}
            </button>

            <SignOutButton />
          </div>
        </header>

        {/* MAIN SCROLLABLE AREA */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          
          <div className="max-w-5xl mx-auto">

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Recent Spreadsheets</h1>
                <p className="text-sm text-slate-500 mt-1">Access and manage your active document library</p>
              </div>

              <div className="flex bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-900 rounded-md text-sm font-medium shadow-sm">
                  <ListBulletIcon className="w-4 h-4" /> List
                </button>

                <button className="flex items-center gap-2 px-3 py-1.5 text-slate-500 hover:text-slate-900 rounded-md text-sm font-medium transition-colors">
                  <Squares2X2Icon className="w-4 h-4" /> Grid
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              
              <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-100 bg-slate-50/50 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <div className="col-span-12 sm:col-span-6">Document Title</div>
                <div className="hidden sm:block col-span-3">Author</div>
                <div className="hidden sm:block col-span-2">Last Modified</div>
                <div className="col-span-1 text-right">Actions</div>
              </div>

              {/* Table Body */}
              <div className="flex flex-col divide-y divide-slate-100">
                {REAL_DOCS.map((doc) => (
                  <div key={doc.id} className="relative grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50 transition-colors group cursor-pointer">
                    
                    {/* The Clickable Overlay */}
                    <Link href={`/document/${doc.id}`} className="absolute inset-0 z-0" />

                    {/* Title & Icon */}
                    <div className="col-span-11 sm:col-span-6 flex items-center gap-4 relative z-10 pointer-events-none">
                      <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                        <TableCellsIcon className="w-6 h-6" />
                      </div>
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-semibold text-slate-900 truncate">
                          {doc.title}
                        </span>
                        <span className="text-xs text-slate-400 mt-0.5">
                          {doc.fileType} • {doc.fileSize}
                        </span>
                      </div>
                    </div>

                    {/* Author (Hidden on mobile) */}
                    <div className="hidden sm:flex col-span-3 items-center gap-3 relative z-10 pointer-events-none">
                      <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 font-medium text-[10px] flex items-center justify-center shrink-0">
                        {doc.authorInitials}
                      </div>
                      <span className="text-sm text-slate-600 truncate">{doc.authorName}</span>
                    </div>

                    {/* Date (Hidden on mobile) */}
                    <div className="hidden sm:block col-span-2 text-sm text-slate-500 truncate relative z-10 pointer-events-none">
                      {doc.updatedAt}
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 flex justify-end relative z-10">
                      <DocumentMenu doc={doc} />
                    </div>

                  </div>
                ))}
              </div>

              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  Showing {REAL_DOCS.length} of {totalDocs} documents
                </span>

                <div className="flex gap-2">
                  <button className="p-1 border border-slate-200 bg-white rounded-md text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-colors disabled:opacity-50">
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>

                  <button className="p-1 border border-slate-200 bg-white rounded-md text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-colors">
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}