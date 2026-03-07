import { MOCK_DOCS } from "@/src/lib/mockData";
import { Logo } from "@/src/components/common/Logo";
import { Button } from "@/src/components/common/Button";
import Link from "next/link";
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

export default function DashboardPage() {
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
          {/* Active State */}
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium text-sm transition-colors">
            <ClockIcon className="w-5 h-5" />
            Recent
          </Link>
          {/* Inactive States */}
          <Link href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg font-medium text-sm transition-colors">
            <StarIcon className="w-5 h-5" />
            Starred
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg font-medium text-sm transition-colors">
            <TrashIcon className="w-5 h-5" />
            Trash
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* TOP HEADER */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          {/* Search Bar */}
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

          {/* Right Actions */}
          <div className="flex items-center gap-4 ml-4">
            <Link href="/document/new">
              <Button variant="primary" size="sm" className="hidden sm:flex gap-1.5">
                <span className="text-lg leading-none mb-0.5">+</span> New Document
              </Button>
            </Link>
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <BellIcon className="w-6 h-6" />
            </button>
            <button className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 font-bold text-xs flex items-center justify-center hover:ring-2 ring-blue-500 ring-offset-2 transition-all">
              HK
            </button>
          </div>
        </header>

        {/* MAIN SCROLLABLE AREA */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          
          <div className="max-w-5xl mx-auto">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Recent Spreadsheets</h1>
                <p className="text-sm text-slate-500 mt-1">Access and manage your active document library</p>
              </div>

              {/* View Toggle */}
              <div className="flex bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-900 rounded-md text-sm font-medium shadow-sm">
                  <ListBulletIcon className="w-4 h-4" /> List
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 text-slate-500 hover:text-slate-900 rounded-md text-sm font-medium transition-colors">
                  <Squares2X2Icon className="w-4 h-4" /> Grid
                </button>
              </div>
            </div>

            {/* Document List Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-100 bg-slate-50/50 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <div className="col-span-12 sm:col-span-6">Document Title</div>
                <div className="hidden sm:block col-span-3">Author</div>
                <div className="hidden sm:block col-span-2">Last Modified</div>
                <div className="col-span-1 text-right">Actions</div>
              </div>

              {/* Table Body */}
              <div className="flex flex-col divide-y divide-slate-100">
                {MOCK_DOCS.map((doc) => (
                  <div key={doc.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50 transition-colors group cursor-pointer">
                    
                    {/* Title & Icon */}
                    <div className="col-span-11 sm:col-span-6 flex items-center gap-4">
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
                    <div className="hidden sm:flex col-span-3 items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 font-medium text-[10px] flex items-center justify-center shrink-0">
                        {doc.authorInitials}
                      </div>
                      <span className="text-sm text-slate-600 truncate">{doc.authorName}</span>
                    </div>

                    {/* Date (Hidden on mobile) */}
                    <div className="hidden sm:block col-span-2 text-sm text-slate-500 truncate">
                      {doc.updatedAt}
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 flex justify-end">
                      <button className="p-1.5 rounded-md text-slate-400 hover:bg-slate-200 hover:text-slate-900 transition-colors">
                        <EllipsisVerticalIcon className="w-5 h-5" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>

              {/* Pagination Footer */}
              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  Showing 4 of 24 documents
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